let tmp;

const toString = {}.toString;

export function isFunction(value: any): value is Function {

    return value && (
        (tmp = toString.call(value)) &&
        (tmp === '[object Function]' || tmp === '[object AsyncFunction]')
    );
}

export default isFunction;
