import React, { useState } from "react";
import { FaTimes, FaPlus, FaRegFile } from "react-icons/fa";
import { MarkedInputContainer, MarkedInputMenu, MarketdInputTextArea, MarkdownPanel } from "./styles";

export function MarkedInput() {
    const [selectedCoordinates, setSelecterdCoordinates] = useState('');
    const [markdownPanelVisible, setMarkdownPanelVisible] = useState('none');

    const onInputChange = value => {
        setMarkdownText(value);
    };

    const handleRemoveMarkuptPanel = () => {
        let selection = document.getSelection()
        
        let rect = selection.getRangeAt(0).getBoundingClientRect();

        if(rect !== undefined) {
            setSelecterdCoordinates(rect);
        }
        setMarkdownPanelVisible('unset');
    }

    function handleApplyMarkup(markup) {
        if (markup === "text") {
            document.execCommand("removeformat");
        } else if (markup === "bold") {
            document.execCommand("bold");
        } else if (markup === "italic") {
            document.execCommand("italic");
        } else if (markup === "title") {
            document.execCommand("fontSize", false, "10");
        }
    }

    return (
        <MarkedInputContainer>
            <MarkedInputMenu>
                <section>
                    <div><FaRegFile />Página 1</div>
                    <div><FaRegFile />Página 2</div>
                    <div><FaRegFile />Página 3</div>
                    <div><FaRegFile />Página 4</div>
                    <div><FaRegFile />Página 5</div>
                </section>
                <footer><FaPlus /> Adicionar página</footer>
            </MarkedInputMenu>
            <MarketdInputTextArea 
                onInput={e => onInputChange(e.currentTarget.textContent)}
                onPointerUp={(e) => handleRemoveMarkuptPanel(e)}
                onKeyUp={() => setMarkdownPanelVisible('none')}
                contentEditable
            >
                { [...Array(15)].map((_, index) =>  <div key={index}><br /></div>) }
            </MarketdInputTextArea>
            <MarkdownPanel 
                markdownPanelVisible={markdownPanelVisible} 
                rect={selectedCoordinates}
            >
                <div className="markdownPanel" onMouseDown={(event) => event.preventDefault()}>
                    <div onClick={() => handleApplyMarkup('text')}>Texto</div>
                    <div onClick={() => handleApplyMarkup('bold')}>Negrito</div>
                    <div onClick={() => handleApplyMarkup('italic')}>Itálico</div>
                    <div onClick={() => handleApplyMarkup('title')}>Título</div>
                    <FaTimes onClick={() => setMarkdownPanelVisible('none')} />
                </div>
            </MarkdownPanel>
        </MarkedInputContainer>
    );
}
