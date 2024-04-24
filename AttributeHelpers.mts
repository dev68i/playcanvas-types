import type TAttribute from "./AttributeTyped.mjs";
import nameof, { type PropertySelector } from "./nameof.mjs";
import isFunction from "./isFunction.mjs";

export const PUBLIC_PREFIX  = ['$'];
export const PRIVATE_PREFIX = ['_', '#'];

export let lastPrefix = '';

export function hasPrefix(name: string, prefix: string) {
    lastPrefix = prefix;
    return !!name && name.startsWith(prefix);
}

export function nameToTitle(name: string) {

    // Remove private and global name prefixs
    if (PUBLIC_PREFIX.some(prefix => hasPrefix(name, prefix)) ||
        PRIVATE_PREFIX.some(prefix => hasPrefix(name, prefix))) {
        name = name.substring(lastPrefix.length);
    }

    const result = name.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
}

export type TScriptType<T> = ((new(...args: any[]) => T) & typeof pc.ScriptType) | typeof pc.ScriptType;
export type TAttributeName<T> = keyof T | PropertySelector<T, T[keyof T]>;

export function addAttribute<T = any>(type: TScriptType<T>, nameOrNameOfClb: TAttributeName<T>, data: TAttribute): void {

    const name = isFunction(nameOrNameOfClb)
                ? nameof(nameOrNameOfClb)
                : nameOrNameOfClb;

    if (typeof name !== 'string') {
        throw new Error(`Attribute name must be string.`);
    }

    if (type.attributes.has(name)) {
        throw new Error(`Attribute '${name}' already registered.`);
    }

    type.attributes.add(name, {
        title: nameToTitle(name),
        ...data
    });
}
