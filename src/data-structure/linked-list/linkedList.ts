import { LinkedListNode } from './linkedListNode'
import { Comparator, ICompareFn } from '../../utils/comparator/comparator'
import { IToString } from '../../utils/common'

type IFind<T> = (value: T) => boolean

export class LinkedList<T> {
  head: LinkedListNode<T>|null
  tail: LinkedListNode<T>|null
  compare: Comparator<T>
  /**
   * @param {Function} [comparatorFunction]
   */
  constructor (comparatorFunction: ICompareFn<T>|null = null) {
    this.head = null
    this.tail = null
    this.compare = new Comparator(comparatorFunction)
  }

  /**
   * @param {*} value
   * @return {LinkedList}
   */
  prepend (value: T): LinkedList<T> {
    // Make new node to be a head.
    const newNode = new LinkedListNode(value, this.head)
    this.head = newNode

    // If there is no tail yet let's make new node a tail.
    if (this.tail == null) {
      this.tail = newNode
    }

    return this
  }

  /**
   * @param {*} value
   * @return {LinkedList}
   */
  append (value: T): LinkedList<T> {
    const newNode = new LinkedListNode(value)

    // If there is no head yet let's make new node a head.
    if (this.head == null) {
      this.head = newNode
      this.tail = newNode

      return this
    }
    if (this.tail != null) {
    // Attach new node to the end of linked list.
      this.tail.next = newNode
      this.tail = newNode
    }

    return this
  }

  /**
   * @param {*} value
   * @return {LinkedListNode}
   */
  delete (value: T): LinkedListNode<T>|null {
    if (this.head == null) {
      return null
    }

    let deletedNode = null

    // If the head must be deleted then make next node that is differ
    // from the head to be a new head.
    while ((this.head != null) && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head
      this.head = this.head.next
    }

    let currentNode = this.head

    if (currentNode !== null) {
      // If next node must be deleted then make next node to be a next next one.
      while (currentNode.next != null) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next
          currentNode.next = currentNode.next.next
        } else {
          currentNode = currentNode.next
        }
      }
    }

    // Check if tail must be deleted.
    if (this.tail != null) {
      if (this.compare.equal(this.tail.value, value)) {
        this.tail = currentNode
      }
    }

    return deletedNode
  }

  /**
   * @param {Object} findParams
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * @return {LinkedListNode}
   */
  find (value: T): LinkedListNode<T>|null {
    if (this.head == null) {
      return null
    }

    let currentNode: LinkedListNode<T>|null = this.head

    while (currentNode !== null) {
      // If value is specified then try to compare by value..
      if (this.compare.equal(currentNode.value, value)) {
        return currentNode
      }
      currentNode = currentNode.next
    }

    return null
  }

  /**
   *
  * @param {IFind<T>} callback
   */
  findWithCallback (callback: IFind<T>): LinkedListNode<T>|null {
    if (this.head == null) {
      return null
    }

    let currentNode: LinkedListNode<T>|null = this.head

    while (currentNode !== null) {
      // If callback is specified then try to find node by callback.
      if (callback(currentNode.value)) {
        return currentNode
      }
      currentNode = currentNode.next
    }

    return null
  }

  /**
   * @return {LinkedListNode}
   */
  deleteTail (): LinkedListNode<T>|null {
    const deletedTail = this.tail

    if (this.head === this.tail) {
      // There is only one node in linked list.
      this.head = null
      this.tail = null

      return deletedTail
    }

    // If there are many nodes in linked list...

    // Rewind to the last node and delete "next" link for the node before the last one.
    let currentNode = this.head
    if (currentNode != null) {
      while (currentNode.next != null) {
        if (currentNode.next.next == null) {
          currentNode.next = null
        } else {
          currentNode = currentNode.next
        }
      }
    }

    this.tail = currentNode

    return deletedTail
  }

  /**
   * @return {LinkedListNode}
   */
  deleteHead (): LinkedListNode<T>|null {
    if (this.head == null) {
      return null
    }

    const deletedHead = this.head

    if (this.head.next != null) {
      this.head = this.head.next
    } else {
      this.head = null
      this.tail = null
    }

    return deletedHead
  }

  /**
   * @param {*[]} values - Array of values that need to be converted to linked list.
   * @return {LinkedList}
   */
  fromArray (values: T[]): LinkedList<T> {
    values.forEach((value) => this.append(value))

    return this
  }

  /**
   * @return {LinkedListNode[]}
   */
  toArray (): Array<LinkedListNode<T>> {
    const nodes = []

    let currentNode = this.head
    while (currentNode != null) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }

    return nodes
  }

  /**
   * @param {function} [callback]
   * @return {string}
   */
  toString (callback: IToString<T>|null = null): string {
    return this.toArray().map((node) => node.toString(callback)).toString()
  }

  /**
   * Reverse a linked list.
   * @returns {LinkedList}
   */
  reverse (): LinkedList<T> {
    let currNode = this.head
    let prevNode = null
    let nextNode = null

    while (currNode != null) {
      // Store next node.
      nextNode = currNode.next

      // Change next node of the current node so it would link to previous node.
      currNode.next = prevNode

      // Move prevNode and currNode nodes one step forward.
      prevNode = currNode
      currNode = nextNode
    }

    // Reset head and tail.
    this.tail = this.head
    this.head = prevNode

    return this
  }
}
