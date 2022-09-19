import React, { useContext } from "react";
import editorContext from "../editorContext";
import { MarkedInputContainer, MarketdInputTitle, MarketdInputTextArea, MarketdInputTextAreaTest } from "./styles";

export function MarkedInput(props) {
    const { setMarkdownText } = useContext(editorContext);

    const onInputChange = e => {
        const newValue = e.currentTarget.value;
        setMarkdownText(newValue);
    };

    return (
        <MarkedInputContainer>
            <MarketdInputTitle>Markdown Text</MarketdInputTitle>
            <MarketdInputTextAreaTest 
                contentEditable
                onInput={e => console.log('Text inside div', e.currentTarget.textContent)}
            > 
            </MarketdInputTextAreaTest>
            {/*<MarketdInputTextArea onChange={onInputChange} />*/}
        </MarkedInputContainer>
    );
}
