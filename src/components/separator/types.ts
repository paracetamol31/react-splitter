import { SplitterItem } from "../splitter-item/splitter-item";
import { TOrientation } from "../splitter/types";

export interface IParamsSeparatorConstructor {
    firstSplitterItem?: SplitterItem | null;
    secondSplitterItem?: SplitterItem | null;
    orientation?: TOrientation,
    size?: number
    setResizing: (value: boolean) => void
}
export const defaultSeparatorSize: number = 15;