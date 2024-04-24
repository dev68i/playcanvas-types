let tmp;

const toString = {}.toString;

export function isFunction<T extends Function>(value: T): value is T;
export function isFunction(value: any): value is Function;
export function isFunction(value: any): value is Function {

    return value && (
        (tmp = toString.call(value)) &&
        (tmp === '[object Function]' || tmp === '[object AsyncFunction]')
    );
}

export function isAsyncFunction<T extends (...any: any) => Promise<any>>(value: T): value is T;
export function isAsyncFunction(value: any): value is (...any: any) => Promise<any>;
export function isAsyncFunction(value: any): value is (...any: any) => Promise<any> {

    return value && (
        (tmp = toString.call(value)) &&
        (tmp === '[object AsyncFunction]')
    );
}

export default isFunction;
