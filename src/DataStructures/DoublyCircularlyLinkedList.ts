export class DoublyCircularlyLinkedList {
  dummyHead: LinkedListNode;
  length: number;

  constructor() {
    this.dummyHead = new LinkedListNode(-1);
    this.length = 0;
  }

  // print the contents of circularly linked list
  toString(): string {
    let curr = this.dummyHead.next;
    let head = curr;

    const out: number[] = [];
    if (curr) {
      out.push(curr.value);
      curr = curr.next;
    } else {
      return "This circularly linked list is empty.";
    }

    while (curr !== head && curr) {
      out.push(curr.value);
      curr = curr.next;
    }
    return out.toString();
  }

  append(value: number) {
    const newNode = new LinkedListNode(value);
    let current = this.dummyHead.next;

    if (!current) {
      this.dummyHead.next = newNode;
      newNode.prev = newNode;
      newNode.next = newNode;
    } else {
      let prev = current.prev as LinkedListNode;
      prev.next = newNode;
      newNode.prev = prev;
      current.prev = newNode;
      newNode.next = current;
    }

    this.length++;
    // keep dummyNode outside the cycle
    // append to "end" => node before entry
  }

  // get value of node at index
  getValue(index: number) {
    if (this.length === 0) return null;

    let idx = index % this.length;
    let curr = this.dummyHead.next; // idx 0

    while (idx > 0 && curr) {
      curr = curr.next;
      idx--;
    }

    return curr ? curr.value : null;
  }

  getNode(index: number) {
    if (this.length === 0) return null;

    let idx = index % this.length;
    let curr = this.dummyHead.next; // idx 0

    while (idx > 0 && curr) {
      curr = curr.next;
      idx--;
    }

    return curr ? curr : null;
  }

  // non-spliced delete, everything after the node falls off
  delete(index: number) {
    let nodeToDelete = this.getNode(index);
    if (!nodeToDelete) return null;

    // if we're deleting the head, we need to reassign head
    if (nodeToDelete === this.dummyHead.next) {
      this.dummyHead.next = this.dummyHead.next.next;
    }

    // check if length of list === 1
    if (this.length === 1) {
      this.dummyHead.next = null;
    } else {
      // nodeToDelete.prev's next = nodeToDelete.next
      // nodeToDelete.next's prev = nodeToDelete.prev
      let prev = nodeToDelete.prev as LinkedListNode;
      prev.next = nodeToDelete.next;
      let next = nodeToDelete.next as LinkedListNode;
      next.prev = prev;
    }

    this.length--;
  }

  // update node at index
  intoArray(): number[] {
    let curr = this.dummyHead.next;
    let head = curr;

    const out: number[] = [];

    if (curr) {
      out.push(curr.value);
      curr = curr.next;
    } else {
      return [];
    }

    while (curr !== head && curr) {
      out.push(curr.value);
      curr = curr.next;
    }
    return out;
  }
}

export const CircularlyLinkedListFromArray = (
  inputArray: number[]
): DoublyCircularlyLinkedList => {
  const list = new DoublyCircularlyLinkedList();

  // for (let i = 0; i < inputArray.length; i++) {
  //   if (i === 0) {
  //     list.append(inputArray[i]);
  //   }
  // }

  inputArray.forEach((element) => {
    list.append(element);
  });

  return list;
};

class LinkedListNode {
  value: number;
  prev: LinkedListNode | null;
  next: LinkedListNode | null;

  constructor(value: number) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

// let list = new DoublyCircularlyLinkedList()
// list.append(1)
// list.append(2)
// list.append(3)
// list.append(4)
// list.append(5)
// console.log(list.intoArray())

// list.delete(7) // delete 3
// list.delete(2) // delete 4
// console.log(list.intoArray())

// // 1 2 3 4
