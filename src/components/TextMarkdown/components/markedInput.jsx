import React, { useContext, useState } from "react";
import editorContext from "../editorContext";
import { MarkedInputContainer, MarketdInputTitle, MarketdInputTextArea, MarkdownPanel } from "./styles";

export function MarkedInput(props) {
    const { setMarkdownText } = useContext(editorContext);
    const [selectedWord, setSelectedWord] = useState('');
    const [selectedText, setSelectedText] = useState('');
    const [selectedCoordinates, setSelecterdCoordinates] = useState('');
    const [markdownPanelVisible, setMarkdownPanelVisible] = useState('none');

    const onInputChange = value => {
        setMarkdownText(value);
    };

	const handleSelectedText=()=>{
        let selectedText = window.getSelection().toString() ? window.getSelection().toString() : null;
        setSelectedText(selectedText);
    }

    const handleSelectedWord=()=>{
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

    const handleOnPointerUp = () => {
        let selection = document.getSelection()
        
        let rect = selection.getRangeAt(0).getBoundingClientRect();

        if(rect !== undefined) {
            setSelecterdCoordinates(rect);
        }
        setMarkdownPanelVisible('unset');
    }


    return (
        <MarkedInputContainer>
            Selected word: <strong>{selectedWord}</strong> <br />
            Selected wordsss: <strong>{selectedText}</strong>
            <MarketdInputTitle>Markdown Text</MarketdInputTitle>
            <MarketdInputTextArea 
                contentEditable
                onInput={e => onInputChange(e.currentTarget.textContent)}
                onClick={() => handleSelectedWord()}
                onMouseUp={() => handleSelectedText()}
                onPointerUp={(e) => handleOnPointerUp(e)}
                onKeyUp={() => setMarkdownPanelVisible('none')}
            />
            <MarkdownPanel 
                markdownPanelVisible={markdownPanelVisible} 
                rect={selectedCoordinates}
                onClick={() => props.handleMardownModal()}
            >
                <div>
                    Utilizar Markdown
                </div>
            </MarkdownPanel>
        </MarkedInputContainer>
    );
}
