export class GraphNode {
  val: number
  neighbors: GraphNode[] | null

  constructor(val: number, neighbors: GraphNode[]) {
    this.val = val
    this.neighbors = neighbors
  }

  // undirected cyclic
  // curr node lights up
  // but keep visited set

  // buildGraph = (edges: [Number, Number][]) => {
  //   const graph = {}
  
  //   for (let edge of edges) {
  //     const [ a, b ] = edge
  //     if (!(a in graph)) graph[a] = []
  //     if (!(b in graph)) graph[b] = []
  //     graph[a].push(b);
  //     graph[b].push(a);
  //   }
    
  //   return graph
  // }

  // dfs = (graph: GraphNode[], src: GraphNode, dst: GraphNode, visited=new Set()) => {
  //   if (src === dst) return true

  //   // for (let neighbor of graph[src]) {
  //   //   if (this.dfs(graph(graph, neighbor, dst))) return true
  //   // }

  //   return false
  // }

  // bfs = (graph: GraphNode[], src: GraphNode, dst: GraphNode) => {

  // }

  // dijkstra = (graph: GraphNode[], src: GraphNode, dst: GraphNode) => {

  // }

  // CRUD
}