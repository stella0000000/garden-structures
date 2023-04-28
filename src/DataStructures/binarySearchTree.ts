export class BinarySearchTreeNode {
  val: number
  left: BinarySearchTreeNode | null
  right: BinarySearchTreeNode | null

  constructor(val: number) {
    this.val = val
    this.left = null
    this.right = null
  }

  // return node vals as array
  levelorder(root: BinarySearchTreeNode): (number | undefined)[] {
    if (!root) return []

    const res = []
    const queue = [ root ]

    while (queue.length) {
      let node = queue.shift()
      res.push(node?.val)

      if (node?.left) queue.push(node.left)
      if (node?.right) queue.push(node.right)
    }

    return res
  }

  // return node vals as array
  preorder(root: BinarySearchTreeNode): (number | undefined)[] {
    const res = []

    if (root) {
      res.push(root.val)

      if (root.left) this.preorder(root.left)
      if (root.right) this.preorder(root.right)
    }

    return res
  }

  // return node vals as array
  inorder(root: BinarySearchTreeNode): (number | undefined)[] {
    if (!root) return []


  }

  // return node vals as array
  postorder(root: BinarySearchTreeNode): (number | undefined)[] {
    if (!root) return []

  }

  // return root
  insert(root: BinarySearchTreeNode, num: number): BinarySearchTreeNode | null {

  }

  // return root
  remove(root: BinarySearchTreeNode, num: number): BinarySearchTreeNode | null {

  }
}