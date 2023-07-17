export class BinarySearchTreeNode {
  val: number
  left: BinarySearchTreeNode | null
  right: BinarySearchTreeNode | null

  constructor(val: number) {
    this.val = val
    this.left = null
    this.right = null
  }

  search(root: BinarySearchTreeNode | null, target: number): boolean {
    if (!root) return false

    if (target < root.val) {
      return this.search(root.left, target)
    } else if (target > root.val) {
      return this.search(root.right, target)
    } else if (target === root.val) {
      return true
    } else {
      return false
    }
  }

  // return node vals as array
  levelorder(root: BinarySearchTreeNode | null): (number | undefined)[] {
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
  preorder(root: BinarySearchTreeNode | null): (number | undefined)[] {
    const res = []

    if (root) {
      res.push(root.val)

      if (root.left) this.preorder(root.left)
      if (root.right) this.preorder(root.right)
    }

    return res
  }

  // return node vals as array
  inorder(root: BinarySearchTreeNode | null): (number | undefined)[] {
    if (!root) return []

    const res = []
    const stack = []
    let curr = root

    while (curr || stack.length) {
      // push all left nodes to leaf
      while (curr) {
        stack.push(curr)
        curr = curr.left as BinarySearchTreeNode
      }

      curr = stack.pop() as BinarySearchTreeNode
      res.push(curr.val)
      curr = curr.right as BinarySearchTreeNode
    }

    return res
  }

  // return node vals as array
  postorder(root: BinarySearchTreeNode | null): (number | undefined)[] {
    const res = []

    if (root) {
      res.push(root.val)

      if (root.right) this.preorder(root.right)
      if (root.left) this.preorder(root.left)
    }

    return res
  }

  // return root
  insert(root: BinarySearchTreeNode | null, num: number): BinarySearchTreeNode {
    if (!root) return new BinarySearchTreeNode(num)

    let curr = root

    while (curr) {
      if (num < curr.val) {
        if (!curr.left) {
          curr.left = new BinarySearchTreeNode(num)
          return root
        }
        curr = curr.left
      } else if (num > curr.val) {
        if (!curr.right) {
          curr.right = new BinarySearchTreeNode(num)
          return root
        }
        curr = curr.right
      }
    }

    return root
  }

  // let me tell you a story, about deleting a BST node:
  // delete node where => node.val === key
  // return => the root

  // find the node to remove (not guaranteed)
      // every node is unique
  // delete the node
  // maintain BST ordering
      // 0-child, i.e. leaf node
          // => nullify the node
      // 1-child
          // point parent to grandchild
      // 2-child
          // predecessor
              // move one to the left + get the rightmost node
                  // => move to pos @ deleted node
                  // => assign its children accordingly
                  // point parent to grandchild
                  // point predecessor to children of node it's replacing
          // successor
              // move one to the right + get the leftmost node
                  // => move to pos @ deleted node
                  // => assign its children accordingly
                  // point parent to grandchild
                  // point predecessor to children of node it's replacing
  deleteNode(root: BinarySearchTreeNode | null, num: number): BinarySearchTreeNode | null {
    if (!root) return null

    if (num < root.val) {
      root.left = this.deleteNode(root.left, num)
    } if (num > root.val) {
      root.right = this.deleteNode(root.right, num)
    } else {
      if (!root.left) {
        return root.right
      } else if (!root.right) {
        return root.left
      } else {
        // find min from right subtree, ie. successor
        let successor = this.findSuccessor(root.right)
        // update the subtree where successor is now at currRoot
        // get deleted branch FIRST, before you add
        // subtree without successor
        successor.right = this.deleteNode(root.right, successor.val) // subtree sans successor
        successor.left = root.left
        return successor
      }
    }

    return root
  }

  findSuccessor(root: BinarySearchTreeNode): BinarySearchTreeNode {
    let curr = root
    while (curr && curr.left) curr = curr.left
    return curr
  }
}