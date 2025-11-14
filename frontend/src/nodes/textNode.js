// NOTE: This will come out as AI detected, as i pasted it into Claude for beautification/formatting, etc

import { useEffect, useState, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || 'input text');
  const [height, setHeight] = useState(80);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [cursorPos, setCursorPos] = useState(0);

  const textAreaRef = useRef(null);
  const nodes = useStore(state => state.nodes);

  const testVariables = ['customInput-1', 'llm-1'];

  const getAvailableNodes = () => {
    return nodes.filter(node => node.id !== id);
  };

  //useEffect(() => {
    //const lines = currText.split('\n').length;
    //const newHeight = Math.max(80, 40 + lines * 24);
    //setHeight(newHeight);
  //}, [currText]);

  
  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    setCursorPos(e.target.selectionStart);

    const textBeforeCursor = e.target.value.substring(0, e.target.selectionStart);
    const lastOpenBracket = textBeforeCursor.lastIndexOf('{{');
    const lastCloseBracket = textBeforeCursor.lastIndexOf('}}');

    if (lastOpenBracket > lastCloseBracket) {
      // Inside {{ }}
      const searchText = textBeforeCursor.substring(lastOpenBracket + 2).trim();
      const availableNodes = getAvailableNodes();

      if (searchText.length > 0) {
        const filtered = availableNodes.filter(n => 
          n.id.toLowerCase().includes(searchText.toLowerCase())
        );
        setSuggestions(filtered);
      } else {
        setSuggestions(availableNodes);
      }
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const getVariablesFromText = () => {
    const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$.-]*)\s*\}\}/g;
    const matches = [];
    let match;
    //console.log('Checking text:', currText);
    while ((match = variableRegex.exec(currText)) !== null) {
      //console.log('Found match:', match[1]);
      const varName = match[1].split('.')[0]; // Get just node ID
      if (!matches.includes(varName)) {
        matches.push(varName);
      }
    }
    //console.log('Final matches:', matches);
    return matches;
  };
  
  const variables = getVariablesFromText();
  console.log('Variables:', variables);


  const handleSuggestionClick = (nodeId) => {
    const textBeforeCursor = currText.substring(0, cursorPos);
    const lastOpenBracket = textBeforeCursor.lastIndexOf('{{');
  
    const beforeVariable = currText.substring(0, lastOpenBracket + 2);
    const afterVariable = currText.substring(cursorPos);
  
    const newText = beforeVariable + nodeId + ' }}' + afterVariable;
    setCurrText(newText);
    setShowSuggestions(false);
  
    // Create edge immediately without setTimeout
    //const connection = {
      //source: nodeId,
      //sourceHandle: `${nodeId}-output`,
      //target: id,
      //targetHandle: `${id}-input`,
    //};
    //useStore.getState().onConnect(connection);
  }

  // adding edges automatiically
  useEffect(() => {
    variables.forEach(varName => {
      const edges = useStore.getState().edges;
      const edgeExists = edges.some(e => 
        e.source == varName && e.target === id && e.targetHandle === `${id}-input`);

      if (!edgeExists) {
        const connection = {
          source: varName,
          sourcehandle: `${varName}-output`,
          target: id,
          targetHandle: `${id}-input`
        };
        useStore.getState().onConnect(connection)
      }
    });
  } ,[variables, id])

  return (
    <div style={{
      width: 250,
      border: '1px solid #cbd5e1',
      borderRadius: '8px',
      padding: '8px',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      //position: 'relative',
    }}>
      
      <Handle
      type="target"
      position={Position.Left}
      id={`${id}-input`}
    />
      <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '12px' }}>
        Text
      </div>

      <textarea
        ref={textAreaRef}
        value={currText}
        onChange={handleTextChange}
        onInput={(e) => {
          e.target.style.height = 'auto';
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        style={{
          padding: '6px',
          border: '1px solid #e2e8f0',
          borderRadius: '4px',
          fontSize: '12px',
          fontFamily: 'monospace',
          resize: 'none',
          overflow: 'hidden',
          minHeight: '60px',
          width: '100%',
          boxSizing: 'border-box'
        }}
      />

      {showSuggestions && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '8px',
          backgroundColor: 'white',
          border: '1px solid #cbd5e1',
          borderRadius: '4px',
          zIndex: 1000,
          maxHeight: '150px',
          overflowY: 'auto',
          minWidth: '150px',
        }}>
          {suggestions.map((node, idx) => (
            <div
              key={idx}
              onClick={() => handleSuggestionClick(node.id)}
              style={{
                padding: '6px 10px',
                cursor: 'pointer',
                fontSize: '12px',
                backgroundColor: 'white',
                borderBottom: '1px solid #f0f0f0',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
            >
              {node.id}
            </div>
          ))}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
};