import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const createNode = (config) => {
  return ({ id, data }) => {
    const {
      title,
      fields = [],
      handles = [],
      width = 250,
      borderColor = '#cbd5e1',
    } = config;

    const [fieldValues, setFieldValues] = useState(
      fields.reduce((acc, field) => {
        acc[field.key] = data?.[field.key] ?? field.defaultValue;
        return acc;
      }, {})
    );

    const handleFieldChange = (key, value) => {
      setFieldValues(prev => ({
        ...prev,
        [key]: value
      }));
    };

    return (
      <div style={{
        width,
        border: `1px solid ${borderColor}`,
        borderRadius: '8px',
        padding: '8px',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        {handles.filter(h => h.type === 'target').map(handle => (
          <Handle
            key={`${id}-${handle.id}`}
            type="target"
            position={handle.position}
            id={`${id}-${handle.id}`}
            style={handle.style}
          />
        ))}

        <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '12px' }}>
          {title}
        </div>

        {fields.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {fields.map(field => (
              <div key={field.key}>
                {field.type === 'text' && (
                  <label style={{ fontSize: '11px', color: '#64748b' }}>
                    {field.label}:
                    <input
                      type="text"
                      value={fieldValues[field.key]}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
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
                )}
                {field.type === 'select' && (
                  <label style={{ fontSize: '11px', color: '#64748b' }}>
                    {field.label}:
                    <select
                      value={fieldValues[field.key]}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
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
                      {field.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </label>
                )}
                {field.type === 'textarea' && (
                  <label style={{ fontSize: '11px', color: '#64748b' }}>
                    {field.label}:
                    <textarea
                      value={fieldValues[field.key]}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      style={{
                        width: '100%',
                        padding: '4px',
                        marginTop: '2px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '4px',
                        fontSize: '12px',
                        boxSizing: 'border-box',
                        fontFamily: 'monospace',
                        resize: 'none',
                        minHeight: '40px',
                      }}
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
        )}

        {handles.filter(h => h.type === 'source').map(handle => (
          <Handle
            key={`${id}-${handle.id}`}
            type="source"
            position={handle.position}
            id={`${id}-${handle.id}`}
            style={handle.style}
          />
        ))}
      </div>
    );
  };
};