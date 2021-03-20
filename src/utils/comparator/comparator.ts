export type ICompareFn<T> = (a: T, b: T) => number

export class Comparator<T> {
  compare: ICompareFn<T>
  /**
   * @param {function(a: *, b: *)} [compareFunction] - It may be custom compare function that, let's
   * say may compare custom objects together.
   */
  constructor (compareFunction: ICompareFn<T>|null = null) {
    this.compare = (compareFunction != null) ? compareFunction : Comparator.defaultCompareFunction
  }

  /**
   * Default comparison function. It just assumes that "a" and "b" are strings or numbers.
   * @param {(string|number)} a
   * @param {(string|number)} b
   * @returns {number}
   */
  static defaultCompareFunction<T>(a: T, b: T): number {
    if (a === b) {
      return 0
    }

    return a < b ? -1 : 1
  }

  /**
   * Checks if two variables are equal.
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  equal (a: T, b: T): boolean {
    return this.compare(a, b) === 0
  }

  /**
   * Checks if variable "a" is less than "b".
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  lessThan (a: T, b: T): boolean {
    return this.compare(a, b) < 0
  }

  /**
   * Checks if variable "a" is greater than "b".
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  greaterThan (a: T, b: T): boolean {
    return this.compare(a, b) > 0
  }

  /**
   * Checks if variable "a" is less than or equal to "b".
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  lessThanOrEqual (a: T, b: T): boolean {
    return this.lessThan(a, b) || this.equal(a, b)
  }

  /**
   * Checks if variable "a" is greater than or equal to "b".
   * @param {*} a
   * @param {*} b
   * @return {boolean}
   */
  greaterThanOrEqual (a: T, b: T): boolean {
    return this.greaterThan(a, b) || this.equal(a, b)
  }

  /**
   * Reverses the comparison order.
   */
  reverse (): void {
    const compareOriginal = this.compare
    this.compare = (a, b) => compareOriginal(b, a)
  }
}
