import { Handle, Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {
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
        id={`${id}-system`}
        style={{ top: '33%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        style={{ top: '66%' }}
      />

      <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '12px' }}>
        LLM
      </div>

      <div style={{ fontSize: '11px', color: '#64748b' }}>
        Large Language Model
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
      />
    </div>
  );
};