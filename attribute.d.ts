export type AttributeType = "boolean" | "number" | "string" | "json" | "asset" | "entity" | "rgb" | "rgba" | "vec2" | "vec3" | "vec4" | "curve";

export interface IAttribute {

    /**
     * Type of an attribute value
     */
    type: AttributeType;

    /**
     * Title for Editor's for field UI.
     */
    title?: string;

    /**
     * Description for Editor's for field UI.
     */
    description?: string;
}

export interface IHasDefault<T> {

    /**
     * Default attribute value.
     */
    default?: T;
}

export interface IHasEnum<T> {
    
    /**
     * List of fixed choices for field, defined as array of objects,
     * where key in object is a title of an option.
     */
    enum?: Record<string, T>[];
}

export interface IHasPlaceholder<T = string | string[]> {

    /**
     * Placeholder for Editor's for field UI.
     */
    placeholder?: T;
}

export interface IStringAttributeAbs extends IAttribute {
    type: 'string',
}

export interface IStringAttribute extends IStringAttributeAbs, IHasEnum<string>, IHasDefault<string>, IHasPlaceholder<string> {
    array?: false;
}

export interface IStringArrayAttribute extends IStringAttributeAbs, IHasDefault<string[]>, IHasPlaceholder<string[]> {
    array: true
}

export interface IBooleanAttributeAbs extends IAttribute {
    type: 'boolean';
}

export interface IBooleanAttribute extends IBooleanAttributeAbs, IHasDefault<boolean> {
    array?: false;
}

export interface IBooleanArrayAttribute extends IBooleanAttributeAbs, IHasDefault<boolean> {
    array: true;
}

export interface INumberAttributeBase extends IAttribute {

    type: 'number';

    /**
     * Minimum value
     */
    min?: number;

    /**
     * Maximum value
     */
    max?: number;

    /**
     * Level of precision
     */
    precision?: number;

    /**
     * The amount used to increment the value when using the arrow keys in the Editor's UI.
     */
    step?: number;
}

export interface INumberAttribute extends
INumberAttributeBase,
IHasEnum<number>,
IHasPlaceholder<string>,
IHasDefault<number> {
    array?: false;
}

export interface INumberArrayAttribute extends
INumberAttributeBase,
IHasPlaceholder<string[]>,
IHasDefault<number[]> {
    array: true;
}

export interface IEntityAttributeAbs extends IAttribute {
    type: 'entity';
}

export interface IEntityAttribute extends IEntityAttributeAbs, IHasPlaceholder<string> {
    array?: false;
}

export interface IEntityArrayAttribute extends IEntityAttributeAbs, IHasPlaceholder<string[]> {
    array: true;
}

export interface IVec2Attribute extends IAttribute, IHasDefault<[number, number]> {
    type: 'vec2';
    array?: false;
}

export interface IVec2ArrayAttribute extends IAttribute, IHasDefault<[number, number][]> {
    type: 'vec2';
    array: true;
}

export interface IVec3Attribute extends IAttribute, IHasDefault<[number, number, number]> {
    type: 'vec3';
    array?: false;
}

export interface IVec3ArrayAttribute extends IAttribute, IHasDefault<[number, number, number][]> {
    type: 'vec3';
    array: true;
}

export interface IDefaultCurve {
    keys: number[]
}

export interface ICurveAttribute extends IAttribute, IHasDefault<IDefaultCurve> {
    type: 'curve';
    array?: false;
}

export interface ICurveArrayAttribute extends IAttribute, IHasDefault<IDefaultCurve> {
    type: 'curve';
    array: true;
}

export type AssetType = "animation" | "audio" | "binary" | "container" | "cubemap" | "css" | "font" | "json" | "html" | "material" | "model" | "script" | "shader" | "sprite" | "template" | "text" | "texture" | "textureatlas";

export interface IAssetAttributeAbs extends IAttribute {
    type: 'asset',
    assetType: AssetType,
}

export interface IAssetAttribute extends IAssetAttributeAbs {
    array?: false,
}

export interface IAssetArrayAttribute extends IAssetAttributeAbs {
    array: true,
}

export type TAttributeWithoutJson =
    IStringAttribute  | IStringArrayAttribute  |
    IBooleanAttribute | IBooleanArrayAttribute |
    INumberAttribute  | INumberArrayAttribute  |
    IVec2Attribute    | IVec2ArrayAttribute    |
    IVec3Attribute    | IVec3ArrayAttribute    |
    ICurveAttribute   | ICurveArrayAttribute   |
    IEntityAttribute  | IEntityArrayAttribute  |
    IAssetAttribute   | IAssetArrayAttribute;

export interface IJsonAttributeSchemaItem {
    name: string;
}

export interface IJsonAttributeSchemaItemBy<T> {
    name: keyof T;
}

export interface IJsonAttributeAbs extends IAttribute {
    type: 'json';
    array?: false;
}


export interface IJsonArrayAttributeAbs extends IAttribute {
    type: 'json';
    array: true;
}

export interface IJsonAttribute extends IJsonAttributeAbs {
    schema: Array<IJsonAttributeSchemaItem & TAttributeWithoutJson>;
}

export interface IJsonAttributeBy<T> extends IJsonAttributeAbs {
    schema: Array<IJsonAttributeSchemaItemBy<T> & TAttributeWithoutJson>;
}

export interface IJsonArrayAttribute extends IJsonArrayAttributeAbs {
    schema: Array<IJsonAttributeSchemaItem & TAttributeWithoutJson>;
}

export interface IJsonArrayAttributeBy<T> extends IJsonArrayAttributeAbs {
    schema: Array<IJsonAttributeSchemaItemBy<T> & TAttributeWithoutJson>;
}

export type TAttribute =
    TAttributeWithoutJson |
    IJsonAttribute | IJsonAttributeBy<any> |
    IJsonArrayAttribute | IJsonArrayAttributeBy<any>;

export default TAttribute;
