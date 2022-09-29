import React, { useContext, useState } from "react";
import editorContext from "../editorContext";
import { MarkedInputContainer, MarketdInputTitle, MarketdInputTextArea } from "./styles";

export function MarkedInput() {
    const { setMarkdownText } = useContext(editorContext);
    const [selectedWord, setSelectedWord] = useState("");

    const onInputChange = value => {
        setMarkdownText(value);
    };

	const handleCLick=()=>{
        let b;
        let sel=window.getSelection();
        let str=sel.anchorNode.nodeValue;
        let len=str?.length;
        let a=b=sel.anchorOffset;
        
        if(str !== null) {
            while(str[a]!=' '&&a--){}; if (str[a]==' ') a++; // start of word
            while(str[b]!=' '&&b++<len){};                   // end of word+1
            setSelectedWord(str.substring(a,b));
        }
    }

    return (
        <MarkedInputContainer>
            <div>Palavra selecionada: {selectedWord}</div>
            <MarketdInputTitle>Markdown Text</MarketdInputTitle>
            <MarketdInputTextArea 
                contentEditable
                onInput={e => onInputChange(e.currentTarget.textContent)}
                onClick={() => handleCLick()}
            />
        </MarkedInputContainer>
    );
}
