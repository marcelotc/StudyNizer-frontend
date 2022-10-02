import React, { useState } from "react";
import { Dropdown, Menu, Tooltip } from 'antd';
import { FaTimes, FaPlus, FaRegFile, FaTimesCircle, FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleDown } from "react-icons/fa";
import { MarkedInputContainer, MarkedInputMenu, MarketdInputTextArea, MarkdownPanel } from "./styles";
import { v4 } from 'uuid';

export function MarkedInput() {
    const [selectedCoordinates, setSelectedCoordinates] = useState(0);
    const [markdownPanelVisible, setMarkdownPanelVisible] = useState('none');
    const [hideMarkdownMenu, setHideMarkdownMenu] = useState(true);
    const [pageArray, setPageArray] = useState([]);

    const onInputChange = value => {
        setMarkdownText(value);
    };

    const handleRemoveMarkuptPanel = () => {
        let selection = document.getSelection()
        
        let rect = selection.getRangeAt(0).getBoundingClientRect();

        if(rect !== undefined) {
            setSelectedCoordinates(rect.top);
        }
        setMarkdownPanelVisible('none');
    }

    function handleApplyMarkup(markup, fontSize) {
        if (markup === "text") {
            document.execCommand("removeformat");
        } else if (markup === "bold") {
            document.execCommand("bold");
        } else if (markup === "italic") {
            document.execCommand("italic");
        } else  if (markup === "underline") {
            document.execCommand("underline");
        } else if (markup === "fontSize") {
            document.execCommand("fontSize", false, fontSize);
        } else if (markup === "title") {
            document.execCommand("fontSize", false, 7);
        } else if (markup === "justifyFull") {
            document.execCommand("justifyFull", false, 7);
        } else if (markup === "justifyCenter") {
            document.execCommand("justifyCenter");
        } else if (markup === "justifyLeft") {
            document.execCommand("justifyLeft");
        } else if (markup === "justifyRight") {
            document.execCommand("justifyRight");
        }
    }

    const handleFontSize = ({key}) => {
        handleApplyMarkup('fontSize', key);
    }

    const fontSizeMenu = (
        <Menu
            onClick={handleFontSize}
            items={[
                {
                    key: '1',
                    label: (
                    <span>
                        1
                    </span>
                    ),
                },
                {
                key: '2',
                label: (
                    <span>
                        2
                    </span>
                ),
                },
                {
                    key: '3',
                    label: (
                    <span>
                        3
                    </span>
                    ),
                },
                {
                    key: '4',
                    label: (
                    <span>
                        4
                    </span>
                    ),
                },
                {
                    key: '5',
                    label: (
                    <span>
                        5
                    </span>
                    ),
                },
                {
                    key: '6',
                    label: (
                    <span>
                        6
                    </span>
                    ),
                },
                {
                    key: '7',
                    label: (
                    <span>
                        7
                    </span>
                    ),
                },

            ]}
        />
    );

    const markupPanelMenu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <div onClick={() => handleApplyMarkup('justifyFull')}>Justificar texto</div>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <div onClick={() => handleApplyMarkup('justifyLeft')}>Alinhar à esquerda</div>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <div onClick={() => handleApplyMarkup('justifyCenter')}>Alinhar ao centro</div>
                    ),
                },
                {
                    key: '4',
                    label: (
                        <div onClick={() => handleApplyMarkup('justifyRight')}>Centralizar à direita</div>
                    ),
                },
            ]}
        />
    );

    const handleShowMarkupPanel = (e) => {
        setSelectedCoordinates(e.pageY - 30);
        setMarkdownPanelVisible('block');
    }

    const handleShowPagesMenu = () => {
        setHideMarkdownMenu(false); 
        setMarkdownPanelVisible('none');
    }

    const handleCreateNewPage = () => {
        let pageId = v4();
        let newPage = <div id={pageId}><FaRegFile /><input placeholder="Nome da página" autocomplete="new-password" /><FaTimesCircle onClick={() => handleRemovePage(pageId)} /></div>;

        setPageArray(oldPageArray => [...oldPageArray, newPage])
    }

    const handleRemovePage = (pageId) => {
        setPageArray(current =>
            current.filter(({props}) => {
              return props.id !== pageId;
        }));
    }

    return (
        <MarkedInputContainer>
            <MarkedInputMenu hideMarkdownMenu={hideMarkdownMenu}>
                {hideMarkdownMenu ? 
                    <Tooltip placement="right" title="Menu de páginas">
                    <FaAngleDoubleRight onClick={() => handleShowPagesMenu()} /> 
                    </Tooltip>  : 
                    <FaAngleDoubleLeft onClick={() => setHideMarkdownMenu(true)} /> 
                }
                <section>
                    {pageArray}
                </section>
                <footer onClick={() => handleCreateNewPage()}><FaPlus />Adicionar página</footer>
            </MarkedInputMenu>
            <MarketdInputTextArea 
                onInput={e => onInputChange(e.currentTarget.textContent)}
                onPointerUp={(e) => handleRemoveMarkuptPanel(e)}
                onKeyUp={() => setMarkdownPanelVisible('none')}
                onClick={(e) => handleShowMarkupPanel(e)}
                contentEditable
            >
                { [...Array(15)].map((_, index) =>  <div key={index}><br /></div>) }
            </MarketdInputTextArea>
            <MarkdownPanel 
                markdownPanelVisible={markdownPanelVisible} 
                rect={selectedCoordinates}
            >
                <div className="markdownPanel" onMouseDown={(event) => event.preventDefault()}>
                    <Dropdown overlay={markupPanelMenu}>
                        <div>Alinhamento <FaAngleDown /></div>
                    </Dropdown>
                    <div onClick={() => handleApplyMarkup('text')}>Texto</div>
                    <div onClick={() => handleApplyMarkup('bold')}>Negrito</div>
                    <div onClick={() => handleApplyMarkup('italic')}>Itálico</div>
                    <div onClick={() => handleApplyMarkup('underline')}>Sublinhar</div>
                    <Dropdown overlay={fontSizeMenu}>
                        <div onClick={() => handleFontSize()}>Tamanho da fonte</div>
                    </Dropdown>
                    <div onClick={() => handleApplyMarkup('title')}>Título</div>
                    <FaTimes onClick={() => setMarkdownPanelVisible('none')} />
                </div>
            </MarkdownPanel>
        </MarkedInputContainer>
    );
}
