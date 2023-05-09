"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedListFromArray = exports.DoublyCircularlyLinkedList = void 0;
var DoublyCircularlyLinkedList = /** @class */ (function () {
    function DoublyCircularlyLinkedList() {
        this.dummyHead = new LinkedListNode(-1);
    }
    // 11 <=> 12
    // insert 11.5
    // dummyNode.next = 12
    // dummyNode.prev = null
    // print the contents of circularly linked list
    DoublyCircularlyLinkedList.prototype.toString = function () {
        var curr = this.dummyHead.next;
        var head = curr;
        if (curr) {
            console.log(curr.value);
            curr = curr.next;
        }
        else {
            console.log('This circularly linked list is empty.');
        }
        while (curr !== head && curr) {
            console.log(curr.value);
            curr = curr.next;
        }
    };
    DoublyCircularlyLinkedList.prototype.append = function (value) {
        var newNode = new LinkedListNode(value);
        var current = this.dummyHead.next;
        if (!current) {
            this.dummyHead.next = newNode;
            newNode.prev = newNode;
            newNode.next = newNode;
        }
        else {
            var prev = current.prev;
            prev.next = newNode;
            newNode.prev = prev;
            current.prev = newNode;
            newNode.next = current;
        }
        // keep dummyNode outside the cycle
        // append to "end" => node before entry
    };
    // get the node at index
    DoublyCircularlyLinkedList.prototype.get = function (index) {
        var currentIndex = -1;
        var currentNode = this.dummyHead;
        while (currentIndex != index && currentNode) {
            currentNode = currentNode.next;
            currentIndex += 1;
        }
        // weve found the node at index
        if (currentIndex === index) {
            return currentNode;
        }
        // else {
        //   // weve run out of nodes before finding the node at index
        //   return null
        // }
    };
    return DoublyCircularlyLinkedList;
}());
exports.DoublyCircularlyLinkedList = DoublyCircularlyLinkedList;
var LinkedListFromArray = function (inputArray) {
    var list = new DoublyCircularlyLinkedList();
    for (var i = 0; i < inputArray.length; i++) {
        if (i === 0) {
            list.append(inputArray[i]);
        }
    }
    return list;
};
exports.LinkedListFromArray = LinkedListFromArray;
var LinkedListNode = /** @class */ (function () {
    function LinkedListNode(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
    return LinkedListNode;
}());
