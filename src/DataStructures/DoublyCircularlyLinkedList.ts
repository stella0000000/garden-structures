export class DoublyCircularlyLinkedList {
  dummyHead: LinkedListNode;

  constructor() {
    this.dummyHead = new LinkedListNode(-1)
  }

  // 11 <=> 12
  // insert 11.5
  // dummyNode.next = 12
  // dummyNode.prev = null

  // print the contents of circularly linked list
  toString() {
    let curr = this.dummyHead.next
    let head = curr

    if (curr) {
      console.log(curr.value)
      curr = curr.next
    } else {
      console.log('This circularly linked list is empty.')
    }

    while (curr !== head && curr) {
      console.log(curr.value)
      curr = curr.next
    }
  }

  append(value: number) {
    const newNode = new LinkedListNode(value)
    let current = this.dummyHead.next

    if (!current) {
      this.dummyHead.next = newNode
      newNode.prev = newNode
      newNode.next = newNode
    } else {
      let prev = current.prev as LinkedListNode
      prev.next = newNode
      newNode.prev = prev
      current.prev = newNode
      newNode.next = current
    }

    // keep dummyNode outside the cycle
    // append to "end" => node before entry
  }

  // get the node at index
  get(index: number) {
    let currentIndex = -1
    let currentNode: LinkedListNode | null = this.dummyHead

    while (currentIndex != index && currentNode) {
      currentNode = currentNode.next
      currentIndex += 1
    }

    // weve found the node at index
    if (currentIndex === index) {
      return currentNode
    }
    // else {
    //   // weve run out of nodes before finding the node at index
    //   return null
    // }
  }

  // // non-spliced delete, everything after the node falls off
  // delete(index: number) {
    
  // }

  // // update node at index
  // intoArray(): number[] {
    
  // }
    
}

export const LinkedListFromArray = (inputArray: number[]): DoublyCircularlyLinkedList => {
  const list = new DoublyCircularlyLinkedList()

  for (let i=0; i<inputArray.length; i++) {
    if (i === 0) {
      list.append(inputArray[i])
    }
  }

  return list
};

class LinkedListNode {
  value: number
  prev: LinkedListNode | null
  next: LinkedListNode | null

  constructor(value: number) {
    this.value = value
    this.prev = null
    this.next = null
  }
}
