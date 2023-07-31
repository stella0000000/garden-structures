export class GraphNode {
  // val represents an x and y coordinate in space
  val: [number, number];
  neighbors: GraphNode[];

  constructor(val: [number, number], neighbors: GraphNode[]) {
    this.val = val;
    this.neighbors = neighbors;
  }

  connect(otherNode: GraphNode): void {
    otherNode.neighbors.push(this);
    this.neighbors.push(otherNode);
  }

  // const root = new GraphNode([0, 0], []);
  // const node1 = new GraphNode([1, 1], []);
  // const node2 = new GraphNode([2, 2], []);
  // const node3 = new GraphNode([3, 3], []);

  // root.connect(node1);
  // node1.connect(node2);
  // root.connect(node3);

  // buildConstellation() {
  // }

  dfs(): GraphNode[] {
    const seen = new Set<GraphNode>();

    const dfsHelper = (currentNode: GraphNode) => {
      if (!seen.has(currentNode)) {
        seen.add(currentNode);
        for (let neighbor of currentNode.neighbors!) {
          dfsHelper(neighbor);
        }
      }
    };
    dfsHelper(this);
    return Array.from(seen);
  }

  bfs(): GraphNode[] {
    const visited = new Set<GraphNode>();
    const queue: GraphNode[] = [this];

    while (queue.length) {
      const node = queue.shift();
      if (node && !visited.has(node)) {
        visited.add(node);
        for (let neighbor of node.neighbors) {
          queue.push(neighbor);
        }
      }
    }
    return Array.from(visited);
  }

  // levelTraverse(): GraphNode[] {
  //     const levels: GraphNode[][] = [];
  //     const queue: GraphNode[] = [this];
  //     const depth = 0;

  //     while (queue.length) {
  //       const node = queue.shift();
  //       if (node && !visited.has(node)) {
  //         visited.add(node);
  //         for (let neighbor of node.neighbors) {
  //           queue.push(neighbor);
  //         }
  //       }
  //     }
  //     return Array.from(visited);
  //   }

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

const root = new GraphNode([0, 0], []);
const node1 = new GraphNode([1, 1], []);
const node2 = new GraphNode([2, 2], []);
const node3 = new GraphNode([3, 3], []);

root.connect(node1);
node1.connect(node2);
root.connect(node3);

console.log(root.dfs());
console.log(root.bfs());
