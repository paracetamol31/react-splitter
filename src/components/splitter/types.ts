export type TOrientation = "vertical" | "horizontal";
export type TChildrenJSXElement = string | JSX.Element | JSX.Element[];
export const defaultSeparatorSize: number = 15;

export interface IParamsSplitterConstructor {
    separatorSize?: number
    proportions?: Array<number>
    orientation?: TOrientation
}