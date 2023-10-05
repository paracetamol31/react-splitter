import { TOrientation } from "../types";
import { Separator } from "./separator";

export interface IParamsSeparatorConstructor {
    orientation: TOrientation,
    size?: number
}
export const defaultSeparatorSize: number = 15;