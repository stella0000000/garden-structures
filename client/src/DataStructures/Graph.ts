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

// Fix generating constellation graph
// for visual purposes (dfs, bfs)
// start @ [0, 0] root node
// root.connect(nodeA)
// nodeA.connect(nodeB)
// BUT NOW for clear DFS viz, generate A, B nodes within quadrants + specify layers
// B will ALWAYS have to have higher Math.abs(x, y) than A, and not switching quadrants = or keep X, while Y can flip
// i.e. B is in outer ring of A

/*
    1. where is the root node and/or parent node is
    2. calculate arc range param (cone variance)
    3. calc vector from center of arc range to center of graph
    4. pick random num from 0 to arc range
    5. math to plot that coord on arc (?)
*/

export const buildGraph = (): GraphNode => {
  const root = new GraphNode([0, 0], []);

  const r = 4;
  const arr = [];
  let sum = 0;
  const numNodesLayer1 = 4;
  const numLayers = 5;
  for (let i = 0; i < numLayers; i++) sum += Math.pow(2, i) * numNodesLayer1;
  for (let i = 0; i < sum; i++) arr.push(Math.random() * 2 * Math.PI);
  arr.sort();
  const offset = Math.pow(2, numLayers) - 1;

  for (let i = Math.floor(offset / 2) + 1; i < sum; i += offset) {
    const node = traverse(numLayers, 1, i, arr, r);
    if (node) root.connect(node);
  }

  return root;
};

const traverse = (
  numLayers: number,
  currLayer: number,
  index: number,
  arr: number[],
  r: number
) => {
  if (currLayer > numLayers) return;
  if (index >= arr.length) return;

  const angle = arr[index];

  const x = Math.cos(angle) * currLayer * r;
  const y = Math.sin(angle) * currLayer * r;
  const node = new GraphNode([x, y], []);

  // jump is halved on each level
  const remainingLayers = numLayers - currLayer;
  const jump = Math.pow(2, remainingLayers - 1);

  const left = traverse(numLayers, currLayer + 1, index - jump, arr, r);
  const right = traverse(numLayers, currLayer + 1, index + jump, arr, r);

  if (left) node.connect(left);
  if (right) node.connect(right);

  return node;
};

//  1   *   1   *    *     1   *    *    1
// [ 5, 50, 90, 120, 200, 340, 345, 347, 350 ]

// if (index % 3 === 1) l1
// else l2

// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]

// 4 + 2*4 + 4*4 + 8*4
// 4 + (2*1)*4 + (2*2)*4 + (2*2*2)*4

// 3 + 6 + 12 + 24 = 45
// 4 8 16 = 28

// let sum = 0
// var branches = 4
// for (let i=0; i<3; i++) {
//     sum += Math.pow(2, i) * branches
// }

// 2^power of num layers   - 1
//
/*

      3         10          17
    /  \      /   \       /    \
   1   5    8      12    15     19
 /\    /\   /\     /\    /\     /\
0 2   4 6  7


0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16

          9
         / \
            3
            / \
           5   8  
          /\   /\
         4  6 7  9
*/

// initial number is Math.floor(offset/2)

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
