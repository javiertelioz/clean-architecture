export interface Collection {
  count: number;
  records: any[];
}

export interface Pagination {
  offset: number;
  limit: number;
}

export interface IRead<T> {
  /**
   * Retrive item
   *
   * @param id
   */
  get(id: string | number): Promise<T | boolean>;

  /**
   * Retrive items
   *
   * @param item
   */
  find(filters: [], pagination: Pagination): Promise<Collection>;
}
