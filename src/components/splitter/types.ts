import { TOrientation } from "../types"
import { Splitter } from "./splitter"

export interface IParamsSplitterConstructor {
    children?: string | JSX.Element | JSX.Element[]
    separatorSize?: number
    proportions?: Array<number>
    orientation?: TOrientation
}