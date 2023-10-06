import { SplitterItem } from "../splitter-item/splitter-item";
import { TOrientation } from "../types";

export interface IParamsSeparatorConstructor {
    firstSplitterItem?: SplitterItem | null;
    secondSplitterItem?: SplitterItem | null;
    orientation?: TOrientation,
    size?: number
}
export const defaultSeparatorSize: number = 15;