import React, { useContext } from "react";
import editorContext from "../editorContext";
import { MarkedInputContainer, MarketdInputTitle, MarketdInputTextArea } from "./styles";

export function MarkedInput(props) {
    const { setMarkdownText } = useContext(editorContext);

    const onInputChange = e => {
        const newValue = e.currentTarget.value;
        setMarkdownText(newValue);
    };

    return (
        <MarkedInputContainer>
            <MarketdInputTitle>Markdown Text</MarketdInputTitle>
            <MarketdInputTextArea onChange={onInputChange} />
        </MarkedInputContainer>
    );
}
