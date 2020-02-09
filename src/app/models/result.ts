export interface Result<T> {
    data?: T;
    code?: number;
    message?: string;
}