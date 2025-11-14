// draggableNode.js
import {GripVertical} from 'lucide-react';
import { useState } from 'react';

export const DraggableNode = ({ type, label, icon: Icon }) => {
    const [isHovered, setIsHovered] = useState(false);
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div 
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '80px', 
          height: '60px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '8px',
          backgroundColor: '#1C2536',
          justifyContent: 'center', 
          flexDirection: 'column',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          backgroundColor: 'white',
          border: isHovered ? '1px solid #818cf8' : '1px solid #cbd5e1',
          borderRadius: '8px',
          cursor: 'grab',
          boxShadow: isHovered ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
          transition: 'all 0.2s',
        }} 
        draggable
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >   <GripVertical size={16} style={{ color: '#94a3b8' }} />
          {Icon && <Icon size={16} style={{ color: '#475569' }} />}
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>{label}</span>     
         </div>
    );
  };
  