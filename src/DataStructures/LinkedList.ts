export class LinkedList {
  dummyHead: LinkedListNode;

  constructor() {
    this.dummyHead = new LinkedListNode(-1);
  }

  append(value: number) {
    const newNode = new LinkedListNode(value);
    let current = this.dummyHead;

    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  // get the node at index
  get(index: number) {
    let currentIndex = -1;
    let currentNode: LinkedListNode | null = this.dummyHead;

    while (currentIndex != index && currentNode) {
      currentNode = currentNode.next;
      currentIndex += 1;
    }

    // weve found the node at index
    if (currentIndex === index) {
      return currentNode;
    } else {
      // weve run out of nodes before finding the node at index
      return null;
    }
  }

  insertAtIndex(index: number, value: number) {
    let current = this.dummyHead
    let currentIndex = -1

    while (currentIndex !== index - 1 && current.next) {
      current = current.next
      currentIndex++
    }

    let next = current.next
    current.next = new LinkedListNode(value)
    current.next.next = next
  }

  deleteAtIndex(index: number) {
    let current = this.dummyHead
    let currentIndex = -1

    while (currentIndex !== index - 1 && current.next) {
      current = current.next
      currentIndex++
    }

    current.next = current.next?.next || null
  }

  // non-spliced delete, everything after the node falls off
  // tumbly
  delete(index: number) {
    let current = this.dummyHead;
    let currentIndex = -1;
    while (currentIndex != index - 1 && current.next) {
      current = current.next;
      currentIndex += 1;
    }
    current.next = null;
  }

  // update node at index
  intoArray(): number[] {
    const out = [];
    let current = this.dummyHead.next;
    while (current) {
      out.push(current.value);
      current = current.next;
    }
    return out;
  }
}

export const LinkedListFromArray = (inputArray: number[]): LinkedList => {
  const list = new LinkedList();

  for (let value of inputArray) {
    list.append(value);
  }

  return list;
};

class LinkedListNode {
  value: number;
  next: LinkedListNode | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}
