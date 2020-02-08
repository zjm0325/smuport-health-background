export interface IndexResult<T> {
    err_code?: number;
    msg?: string;
    data?: T;
}