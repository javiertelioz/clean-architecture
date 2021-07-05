import { IBaseSerializer } from './serializers/IBaseSerializer';

export interface IPagination {
  limit: number;
  offset: number;
}

export interface IPaginate {
  currentPage: number;
  totalPages: number;
  total: number;
  records: [];
}

/**
 * Retrive parameters for pagination limit and offset
 *
 * @param page Current page
 * @param limit Limit per page
 * @returns
 */
export function Pagination(page = 1, pageSize = 20): IPagination {
  return {
    limit: pageSize,
    offset: (page - 1) * pageSize
  };
}

/**
 * Make pagination
 *
 * @param data Collection
 * @param serializer Serializer function
 * @param currentPage Page number
 * @param limit Limit per page
 *
 * @returns Pagination response object
 */
export function Paginate(data: any, serializer: IBaseSerializer, currentPage = 1, limit = 20): IPaginate {
  const { count, records } = data;
  const totalPages = Math.ceil(count / limit);

  return {
    currentPage,
    totalPages,
    total: count,
    records: serializer.serialize(records)
  };
}
