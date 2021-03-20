import { LinkedListNode } from '../linkedListNode'
import { LinkedList } from '../linkedList'

describe('LinkedList', () => {
  it('should create empty linked list', () => {
    const linkedList = new LinkedList()
    expect(linkedList.toString()).toBe('')
  })

  it('should append node to linked list', () => {
    const linkedList = new LinkedList()

    expect(linkedList.head).toBeNull()
    expect(linkedList.tail).toBeNull()

    linkedList.append(1)
    linkedList.append(2)

    expect(linkedList.toString()).toBe('1,2')
    if (linkedList.tail != null) {
      expect(linkedList.tail.next).toBeNull()
    }
  })

  it('should prepend node to linked list', () => {
    const linkedList = new LinkedList()

    linkedList.prepend(2)

    expect((linkedList.head as LinkedListNode<number>).toString()).toBe('2')
    expect((linkedList.tail as LinkedListNode<number>).toString()).toBe('2')

    linkedList.append(1)
    linkedList.prepend(3)

    expect(linkedList.toString()).toBe('3,2,1')
  })

  it('should delete node by value from linked list', () => {
    const linkedList = new LinkedList()

    expect(linkedList.delete(5)).toBeNull()

    linkedList.append(1)
    linkedList.append(1)
    linkedList.append(2)
    linkedList.append(3)
    linkedList.append(3)
    linkedList.append(3)
    linkedList.append(4)
    linkedList.append(5)

    expect((linkedList.head as LinkedListNode<number>).toString()).toBe('1')
    expect((linkedList.tail as LinkedListNode<number>).toString()).toBe('5')

    const deletedNode = linkedList.delete(3)
    expect((deletedNode as LinkedListNode<number>).value).toBe(3)
    expect(linkedList.toString()).toBe('1,1,2,4,5')

    linkedList.delete(3)
    expect(linkedList.toString()).toBe('1,1,2,4,5')

    linkedList.delete(1)
    expect(linkedList.toString()).toBe('2,4,5')

    if (linkedList.head != null) {
      expect(linkedList.head.toString()).toBe('2')
    }
    if (linkedList.tail != null) {
      expect(linkedList.tail.toString()).toBe('5')
    }

    linkedList.delete(5)
    expect(linkedList.toString()).toBe('2,4')

    expect((linkedList.head as LinkedListNode<number>).toString()).toBe('2')
    expect((linkedList.tail as LinkedListNode<number>).toString()).toBe('4')

    linkedList.delete(4)
    expect(linkedList.toString()).toBe('2')

    expect((linkedList.head as LinkedListNode<number>).toString()).toBe('2')
    expect((linkedList.tail as LinkedListNode<number>).toString()).toBe('2')

    linkedList.delete(2)
    expect(linkedList.toString()).toBe('')
  })

  it('should delete linked list tail', () => {
    const linkedList = new LinkedList()

    linkedList.append(1)
    linkedList.append(2)
    linkedList.append(3)

    expect((linkedList.head as LinkedListNode<number>).toString()).toBe('1')
    expect((linkedList.tail as LinkedListNode<number>).toString()).toBe('3')

    const deletedNode1 = linkedList.deleteTail()

    expect((deletedNode1 as LinkedListNode<number>).value).toBe(3)
    expect(linkedList.toString()).toBe('1,2')
    expect((linkedList.head as LinkedListNode<number>).toString()).toBe('1')
    expect((linkedList.tail as LinkedListNode<number>).toString()).toBe('2')

    const deletedNode2 = linkedList.deleteTail()

    expect((deletedNode2 as LinkedListNode<number>).value).toBe(2)
    expect(linkedList.toString()).toBe('1')
    expect((linkedList.head as LinkedListNode<number>).toString()).toBe('1')
    expect((linkedList.tail as LinkedListNode<number>).toString()).toBe('1')

    const deletedNode3 = linkedList.deleteTail()

    expect((deletedNode3 as LinkedListNode<number>).value).toBe(1)
    expect(linkedList.toString()).toBe('')
    expect(linkedList.head).toBeNull()
    expect(linkedList.tail).toBeNull()
  })

  it('should delete linked list head', () => {
    const linkedList = new LinkedList()

    expect(linkedList.deleteHead()).toBeNull()

    linkedList.append(1)
    linkedList.append(2)

    expect((linkedList.head as LinkedListNode<number>).toString()).toBe('1')
    expect((linkedList.tail as LinkedListNode<number>).toString()).toBe('2')

    const deletedNode1 = linkedList.deleteHead()

    expect((deletedNode1 as LinkedListNode<number>).value).toBe(1)
    expect(linkedList.toString()).toBe('2')
    expect((linkedList.head as LinkedListNode<number>).toString()).toBe('2')
    expect((linkedList.tail as LinkedListNode<number>).toString()).toBe('2')

    const deletedNode2 = linkedList.deleteHead()

    expect((deletedNode2 as LinkedListNode<number>).value).toBe(2)
    expect(linkedList.toString()).toBe('')
    expect(linkedList.head).toBeNull()
    expect(linkedList.tail).toBeNull()
  })

  it('should be possible to store objects in the list and to print them out', () => {
    const nodeValue1 = { value: 1, key: 'key1' }
    const nodeValue2 = { value: 2, key: 'key2' }

    const linkedList = new LinkedList<typeof nodeValue1>()

    linkedList.append(nodeValue1).prepend(nodeValue2)

    const nodeStringifier = (value: typeof nodeValue1): string => `${value.key}:${value.value}`

    expect(linkedList.toString(nodeStringifier)).toBe('key2:2,key1:1')
  })

  it('should find node by value', () => {
    const linkedList = new LinkedList()

    expect(linkedList.find(5)).toBeNull()

    linkedList.append(1)
    expect(linkedList.find(1)).toBeDefined()

    linkedList.append(2).append(3)

    const node = linkedList.find(2)

    expect((node as LinkedListNode<number>).value).toBe(2)
    expect(linkedList.find(5)).toBeNull()
  })

  it('should find node by callback', () => {
    interface T {
      value: number
      key: string
    }
    const linkedList = new LinkedList<T>()

    linkedList
      .append({ value: 1, key: 'test1' })
      .append({ value: 2, key: 'test2' })
      .append({ value: 3, key: 'test3' })

    const node = linkedList.findWithCallback((value: T): boolean => value.key === 'test2')

    expect(node).toBeDefined()
    expect((node as LinkedListNode<T>).value.value).toBe(2)
    expect((node as LinkedListNode<T>).value.key).toBe('test2')
    expect(
      linkedList.findWithCallback((value: T): boolean => value.key === 'test5')
    ).toBeNull()
  })

  it('should create linked list from array', () => {
    const linkedList = new LinkedList()
    linkedList.fromArray([1, 1, 2, 3, 3, 3, 4, 5])

    expect(linkedList.toString()).toBe('1,1,2,3,3,3,4,5')
  })

  it('should find node by means of custom compare function', () => {
    interface T {
      value: number
      customValue: string
    }
    const comparatorFunction = (a: T, b: T): number => {
      if (a.customValue === b.customValue) {
        return 0
      }

      return a.customValue < b.customValue ? -1 : 1
    }

    const linkedList = new LinkedList(comparatorFunction)

    linkedList
      .append({ value: 1, customValue: 'test1' })
      .append({ value: 2, customValue: 'test2' })
      .append({ value: 3, customValue: 'test3' })

    const node = linkedList.find({ value: 2, customValue: 'test2' })

    expect(node).toBeDefined()
    expect((node as LinkedListNode<T>).value.value).toBe(2)
    expect((node as LinkedListNode<T>).value.customValue).toBe('test2')
    expect(linkedList.find({ value: 2, customValue: 'test5' })).toBeNull()
  })

  it('should find preferring callback over compare function', () => {
    const greaterThan = (value: number, compareTo: number): number => (value > compareTo ? 0 : 1)

    const linkedList = new LinkedList(greaterThan)
    linkedList.fromArray([1, 2, 3, 4, 5])

    let node = linkedList.find(3)
    expect((node as LinkedListNode<number>).value).toBe(4)

    node = linkedList.findWithCallback((value) => value < 3)
    expect((node as LinkedListNode<number>).value).toBe(1)
  })

  it('should convert to array', () => {
    const linkedList = new LinkedList()
    linkedList.append(1)
    linkedList.append(2)
    linkedList.append(3)
    expect(linkedList.toArray().join(',')).toBe('1,2,3')
  })

  it('should reverse linked list', () => {
    const linkedList = new LinkedList()

    // Add test values to linked list.
    linkedList.append(1).append(2).append(3)

    expect(linkedList.toString()).toBe('1,2,3')
    expect((linkedList.head as LinkedListNode<number>).value).toBe(1)
    expect((linkedList.tail as LinkedListNode<number>).value).toBe(3)

    // Reverse linked list.
    linkedList.reverse()
    expect(linkedList.toString()).toBe('3,2,1')
    expect((linkedList.head as LinkedListNode<number>).value).toBe(3)
    expect((linkedList.tail as LinkedListNode<number>).value).toBe(1)

    // Reverse linked list back to initial state.
    linkedList.reverse()
    expect(linkedList.toString()).toBe('1,2,3')
    expect((linkedList.head as LinkedListNode<number>).value).toBe(1)
    expect((linkedList.tail as LinkedListNode<number>).value).toBe(3)
  })
})
