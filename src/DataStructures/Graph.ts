export type FlattenedGraph = {
  nodes: {
    value: [number, number];
    uuid: number;
  }[];
  adjacencyMatrix: boolean[][]; // for adjacency matrix
};

export class GraphNode {
  // val represents an x and y coordinate in space
  uuid: number;
  val: [number, number];
  neighbors: GraphNode[];

  // global to GraphNode class.
  // Every member of this class needs access to this var.
  // otherwise each new GraphNode would have uuid = 1
  static idIter = 0;

  constructor(val: [number, number], neighbors: GraphNode[]) {
    this.uuid = GraphNode.idIter++;
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

  flatten(): FlattenedGraph {
    // discrete list, no cycles
    const nodes = this.dfs(); // array
    nodes.sort((a, b) => (a.uuid < b.uuid ? -1 : 1));

    const values = nodes.map((node) => ({ value: node.val, uuid: node.uuid }));
    const length = values.length;
    const adjacencyMatrix = Array.from(Array(length), () =>
      Array(length).fill(false)
    );
    // const adjacencyMatrix = new Array(values.length).fill(new Array(values.length).fill(false))

    for (let i = 0; i < values.length; i++) {
      for (let neighbor of nodes[i].neighbors) {
        const neighborId = neighbor.uuid;
        const neighborIdx = nodes.findIndex((node) => {
          return node.uuid === neighborId;
        });

        adjacencyMatrix[i][neighborIdx] = true;
        adjacencyMatrix[neighborIdx][i] = true;
        //where neighborId = nodesId
      }
    }

    return { nodes: values, adjacencyMatrix };
  }

  static unflatten({ nodes, adjacencyMatrix }: FlattenedGraph): GraphNode {
    // unlinked flat list of nodes, to be connected
    const nodez = nodes.map((node) => new GraphNode(node.value, []));
    const newAdjMatrix = JSON.parse(JSON.stringify(adjacencyMatrix));

    nodez.sort((a, b) => (a.uuid < b.uuid ? -1 : 1));

    for (let i = 0; i < newAdjMatrix.length; i++) {
      for (let j = 0; j < newAdjMatrix[i].length; j++) {
        if (newAdjMatrix[i][j]) {
          // one-way, directed connection
          nodez[i].connect(nodez[j]);
        }
      }
    }

    return nodez[0];
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

// const root = new GraphNode([0, 0], []);
// const node1 = new GraphNode([1, 1], []);
// const node2 = new GraphNode([2, 2], []);
// const node3 = new GraphNode([3, 3], []);

// root.connect(node1);
// node1.connect(node2);
// root.connect(node3);

// console.log(root.dfs());
// console.log(root.bfs());

// console.log(root.flatten())
