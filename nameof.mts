import isFunction from './isFunction.mjs';

export type ValueOf<T> = T[keyof T];
export type PropertySelector<T, V extends T[keyof T]> = (x: T) => V;
export type PropertyTypeSelector<T, V extends T[keyof T]> = ValueOf<{ [K in keyof T]: T[K] extends V ? K : never }>;

export const proxyKeyReturn: unknown = new Proxy({}, {
    get: (target, key) => key
});

export function nameof<T>(name: keyof T): keyof T;
export function nameof<T>(f: PropertySelector<T, T[keyof T]>): keyof T;
export function nameof<T, V extends T[keyof T]>(f: PropertySelector<T, V>): PropertyTypeSelector<T, V>;
export function nameof<T, V extends T[keyof T]>(nameOrNameOfSelector: keyof T | PropertySelector<T, V>) {

    if(!isFunction(nameOrNameOfSelector)) {
        return nameOrNameOfSelector;
    }
    
    return nameOrNameOfSelector(proxyKeyReturn as T);
}
