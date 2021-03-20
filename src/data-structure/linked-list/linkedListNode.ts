import { IToString } from '../../utils/common'

export class LinkedListNode<T> {
  value: T
  next: LinkedListNode<T> |null
  constructor (value: T, next: LinkedListNode<T>|null = null) {
    this.value = value
    this.next = next
  }

  toString (callback: IToString<T>|null = null): string {
    return (callback != null) ? callback(this.value) : String(this.value)
  }
}
