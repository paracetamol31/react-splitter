import { CSSProperties, FC, useCallback } from "react";
import separatorStyle from "./separator.module.css";
import React from "react";
import { Splitter } from "../splitter/splitter";

export const SeparatorView: FC<{ splitter: Splitter, indexSeparator: number }> = ({ splitter, indexSeparator }) => {
    const className = `${separatorStyle.separator} ${splitter.orientation}`;

    const onMouseDown = useCallback<React.MouseEventHandler<HTMLElement>>((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        splitter.setResizing(true);
        splitter.currentSeparotorIndex = indexSeparator;
        if (splitter.orientation === "horizontal") {
            splitter.seavedPointCurrentSeparator = event.clientX;
        } else {
            splitter.seavedPointCurrentSeparator = event.clientY;
        }
        const onMouseUp = (event: MouseEvent) => {
            splitter.setResizing(false);
            window.removeEventListener("mouseup", onMouseUp);
        }

        window.addEventListener("mouseup", onMouseUp);
    }, [splitter]);

    const onMouseUp = useCallback(() => {
        splitter.setResizing(false);
    }, [splitter]);


    const inlineStyle: CSSProperties = {
        [splitter.orientation === "horizontal" ? "width" : "height"]: `${splitter.separatorSize}px`
    }
    return (
        <section onMouseDown={onMouseDown} onMouseUp={onMouseUp} className={className} style={inlineStyle} />
    )
}