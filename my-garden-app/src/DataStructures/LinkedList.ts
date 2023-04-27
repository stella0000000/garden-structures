export class LinkedListNode {
  value: number;
  next: LinkedListNode | null;

  constructor(value: number) {
    this.value = value;
    this.next = null;
  }

  append(value: number) {
    const newNode = new LinkedListNode(value);
    let current = this as LinkedListNode;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  // get the node at index
  get(index: number) {
    let currentIndex = 0;
    let currentNode = this as LinkedListNode | null;
    while (currentIndex != index && currentNode) {
      currentNode = currentNode.next;
      currentIndex += 1;
    }

    // weve found the node at index
    if (currentIndex == index) {
      return currentNode;
    } else {
      // weve run out of nodes before finding the node at index
      return null;
    }
  }

  // non-spliced delete, everything after the node falls off
  delete(index: number) {
    let current = this as LinkedListNode;
    let currentIndex = 0;
    while (currentIndex != index && current.next) {
      current = current.next;
      currentIndex += 1;
    }
  }

  // update node at index

  intoArray(): number[] {
    const out = [];
    let current = this as LinkedListNode | null;
    while (current) {
      out.push(current.value);
      current = current.next;
    }
    return out;
  }
}
