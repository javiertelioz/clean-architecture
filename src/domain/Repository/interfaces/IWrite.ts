/**
 * @interface IWrite
 */
export interface IWrite<T> {
  /**
   * Create entity
   *
   * @param item
   */
  create(item: T): Promise<T>;

  /**
   * Update entity
   *
   * @param item
   */
  update(item: T): Promise<boolean>;

  /**
   * Remove entity
   *
   * @param id
   */
  remove(id: string | number): Promise<boolean>;
}
