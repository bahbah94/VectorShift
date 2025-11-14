// exampleNodes.js
// USE AI tools to quickly generate the following
import { createNode } from './abstractNode';
import { Position } from 'reactflow';

export const FilterNode = createNode({
  title: 'Filter',
  borderColor: '#ff9900',
  fields: [
    { key: 'field', type: 'text', label: 'Field', defaultValue: '' },
    { key: 'operator', type: 'select', label: 'Operator', options: ['equals', 'contains', 'greater', 'less'], defaultValue: 'equals' },
  ],
  handles: [
    { id: 'input', type: 'target', position: Position.Left },
    { id: 'output', type: 'source', position: Position.Right },
  ]
});

export const JSONParserNode = createNode({
  title: 'JSON Parser',
  borderColor: '#00aa66',
  fields: [
    { key: 'mode', type: 'select', label: 'Mode', options: ['Parse', 'Stringify'], defaultValue: 'Parse' },
    { key: 'path', type: 'text', label: 'Path', defaultValue: '$' },
  ],
  handles: [
    { id: 'input', type: 'target', position: Position.Left },
    { id: 'output', type: 'source', position: Position.Right },
  ]
});

export const APINode = createNode({
  title: 'API Call',
  borderColor: '#0099ff',
  fields: [
    { key: 'url', type: 'text', label: 'URL', defaultValue: '' },
    { key: 'method', type: 'select', label: 'Method', options: ['GET', 'POST', 'PUT'], defaultValue: 'GET' },
  ],
  handles: [
    { id: 'trigger', type: 'target', position: Position.Left },
    { id: 'response', type: 'source', position: Position.Right },
  ]
});

export const TransformNode = createNode({
  title: 'Transform',
  borderColor: '#dd44dd',
  fields: [
    { key: 'type', type: 'select', label: 'Type', options: ['Uppercase', 'Lowercase', 'Reverse'], defaultValue: 'Uppercase' },
  ],
  handles: [
    { id: 'input', type: 'target', position: Position.Left },
    { id: 'output', type: 'source', position: Position.Right },
  ]
});

export const ConditionalNode = createNode({
  title: 'Conditional',
  borderColor: '#ff6666',
  fields: [
    { key: 'condition', type: 'textarea', label: 'Condition', defaultValue: '' },
  ],
  handles: [
    { id: 'input', type: 'target', position: Position.Left },
    { id: 'true', type: 'source', position: Position.Right, style: { top: '30%' } },
    { id: 'false', type: 'source', position: Position.Right, style: { top: '70%' } },
  ]
});