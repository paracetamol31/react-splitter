import { Splitter } from "../splitter/splitter"

export interface IParamsSplitterItemConstructor {
    children?: string | JSX.Element | JSX.Element[],
    ratioSize: number,
    minSize?: number
    offset: number,
    splitter: Splitter
}