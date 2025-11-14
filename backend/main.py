from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import networkx as nx



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def parse_pipeline(request: Request):
    data = await request.json()
    nodes = data['nodes']
    edges = data['edges']

    graph = nx.DiGraph()

    for node in nodes:
        graph.add_node(node['id'])

    for edge in edges:
        graph.add_edge(edge['source'],edge['target'])


    is_dag = nx.is_directed_acyclic_graph(graph) 

    n_nodes = graph.number_of_nodes()
    n_edges = graph.number_of_edges()

    return {
        "status": "processed",
        "nodes": n_nodes,
        "edges": n_edges,
        "is_dag": is_dag
    }   
