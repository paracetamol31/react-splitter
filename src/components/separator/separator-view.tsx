import { CSSProperties, FC, useCallback } from "react";
import { Separator } from "./separator";
import separatorStyle from "./separator.module.css";
import React from "react";

export const SeparatorView: FC<{ separator: Separator }> = ({ separator }) => {
    const className = `${separatorStyle.separator} ${separator.orientation}`;

    const onMouseDown = useCallback(() => {
        separator.setResizing(true);
    }, [separator]);

    const onMouseUp = useCallback(() => {
        separator.setResizing(false);
    }, [separator]);


    const inlineStyle: CSSProperties = {
        [separator.orientation === "horizontal" ? "width" : "height"]: `${separator.size}px`
    }
    return (
        <section onMouseDown={onMouseDown} onMouseUp={onMouseUp} className={className} style={inlineStyle} />
    )
}