import { useState } from "react";
import { useStore } from "./store";

export const SubmitButton = () => {
  const nodes = useStore(state => state.nodes);
  const edges = useStore(state => state.edges);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });
      const data = await response.json();
      setResult(data);
      setShowResult(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit pipeline');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <button 
        type="button" 
        onClick={handleSubmit}
        style={{
          padding: '10px 24px',
          backgroundColor: '#4f46e5',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#4338ca'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#4f46e5'}
      >
        Submit Pipeline
      </button>

      {showResult && result && (
        <div style={{
          padding: '16px',
          backgroundColor: result.is_dag ? '#ecfdf5' : '#fef2f2',
          border: `1px solid ${result.is_dag ? '#86efac' : '#fecaca'}`,
          borderRadius: '8px',
          minWidth: '300px',
        }}>
          <h3 style={{ 
            margin: '0 0 12px 0', 
            color: result.is_dag ? '#15803d' : '#991b1b',
            fontSize: '14px',
            fontWeight: '600',
          }}>
            {result.is_dag ? '✓ Valid Pipeline' : '✗ Invalid Pipeline'}
          </h3>
          <div style={{ fontSize: '12px', color: '#475569', lineHeight: '1.6' }}>
            <p style={{ margin: '4px 0' }}>Nodes: {result.nodes}</p>
            <p style={{ margin: '4px 0' }}>Edges: {result.edges}</p>
            <p style={{ margin: '4px 0' }}>DAG: {result.is_dag ? 'Yes' : 'No (has cycles)'}</p>
          </div>
          <button 
            onClick={() => setShowResult(false)}
            style={{
              marginTop: '12px',
              padding: '6px 12px',
              backgroundColor: 'white',
              border: '1px solid #cbd5e1',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f8fafc'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};