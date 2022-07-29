export interface PaginateOption {
    limit: number;
    currentPage: number;
    total?: boolean;
}


export interface PaginationResult<T> {
    first: number;
    last: number;
    limit: number;
    total: number;
    data: T[]
}