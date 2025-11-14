// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{
            background: 'linear-gradient(to right, #1e293b, #0f172a)',
            borderBottom: '1px solid #334155',
            padding: '16px 24px',
          }}>
            <h2 style={{ fontSize: '14px', fontWeight: '600', color: '#cbd5e1', marginBottom: '16px' }}>Nodes</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='jsonParser' label='JSON Parser' />
                <DraggableNode type='api' label='API' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='conditional' label='Conditional' />
            </div>
        </div>
    );
};
