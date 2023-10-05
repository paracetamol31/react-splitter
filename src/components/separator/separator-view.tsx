import { CSSProperties, FC } from "react";
import { Separator } from "./separator";
import separatorStyle from "./separator.module.css";
import React from "react";

export const SeparatorView: FC<Separator> = (separator) => {
    const className = `${separatorStyle.separator} ${separator.orientation}`;

    const inlineStyle: CSSProperties = {
        [separator.orientation === "horizontal" ? "width" : "height"]: `${separator.size}px`
    }
    return (
        <section className={className} style={inlineStyle} />
    )
}