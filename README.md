# VectorShift Pipeline Builder

A visual node-based pipeline builder with drag-and-drop interface.

## Features

- **Node Abstraction Factory** - Create new nodes with simple config objects
- **5 Example Nodes** - Filter, JSON Parser, API, Transform, Conditional
- **Dynamic Text Node** - Reference other nodes with `{{ nodeId }}` syntax
- **Auto-connecting Edges** - Edges automatically create when variables are typed
- **DAG Validation** - Backend validates pipeline is acyclic
- **Unified Styling** - Modern, sleek UI matching VectorShift design

## Setup
```bash
# Frontend
cd frontend && npm i && npm start

# Backend
cd backend && uvicorn main:app --reload
```

## Usage

1. Drag nodes from toolbar onto canvas
2. Connect nodes by dragging handles
3. In Text nodes, type `{{ nodeId }}` to reference other nodes
4. Click Submit to validate pipeline

## Architecture

- **Frontend**: React + ReactFlow for visual pipeline building
- **Backend**: FastAPI for DAG validation and pipeline parsing
- **State**: Zustand for global state management

## Files

- `/frontend/src/factory.js` - Node factory abstraction
- `/frontend/src/nodes/` - Individual node components
- `/backend/main.py` - FastAPI backend with DAG validation