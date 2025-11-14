import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <div style={{
      width: 250,
      border: '1px solid #cbd5e1',
      borderRadius: '8px',
      padding: '8px',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-value`}
      />

      <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '12px' }}>
        Output
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '11px', color: '#64748b' }}>
          Name:
          <input 
            type="text" 
            value={currName} 
            onChange={handleNameChange}
            style={{
              width: '100%',
              padding: '4px',
              marginTop: '2px',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '12px',
              boxSizing: 'border-box',
            }}
          />
        </label>
        <label style={{ fontSize: '11px', color: '#64748b' }}>
          Type:
          <select 
            value={outputType} 
            onChange={handleTypeChange}
            style={{
              width: '100%',
              padding: '4px',
              marginTop: '2px',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '12px',
              boxSizing: 'border-box',
            }}
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </div>
  );
};