import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from 'use-debounce';
import { Popconfirm, Dropdown, Menu, Tooltip, message, Modal, Button, Input } from 'antd';
import { FaTimes, FaPlus, FaRegFile, FaRegFileAlt, FaTimesCircle, FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleDown } from "react-icons/fa";
import { MarkedInputContainer, MarkedInputMenu, MarketdInputTextAreaContainer, BlankAnotationContainer, MarketdInputTextArea, MarkdownPanel, AddNewPageModal } from "./styles";
import { v4 } from 'uuid';

export function MarkedInput() {
    const location = useLocation();
    const history = useNavigate();

    const [selectedCoordinates, setSelectedCoordinates] = useState(0);
    const [markdownPanelVisible, setMarkdownPanelVisible] = useState('none');
    const [hideMarkdownMenu, setHideMarkdownMenu] = useState(false);
    const [pageArray, setPageArray] = useState([]);
    const [openNewPageModal, setOpenNewPageModal] = useState(false);
    const [newPageName, setNewPageName] = useState('');
    const [pageName, setPageName] = useState('');
    const [markupContent, setMarkupContent] = useState([]);
    const [markupContentToSave] = useDebounce(markupContent, 1000);

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

    const confirm = (pageId) => {
        handleRemovePage(pageId);
    };

    const handleCreateNewPage = () => {
        let pageId = v4();

        const subjectPageLink = `/subject-anotations/${location.state.subject.title.replace(/ /g, '-').toLowerCase()}-${location.state.subject.id}/${newPageName.replace(/ /g, '-').toLowerCase()}-${pageId}`;

        let newPage = 
            <div id={pageId}>
                <FaRegFile />
                <NavLink 
                    id={pageId}
                    to={subjectPageLink}
                    state={location.state}
                    onClick={() => setPageName(newPageName)}
                >
                    {newPageName}
                </NavLink>
                <Popconfirm placement="right" title={'Realmente deseja excluir está página?'} onConfirm={() => confirm(pageId)} okText="Sim" cancelText="Não">
                    <Tooltip placement="right" title="Excluir página">
                        <FaTimesCircle />
                    </Tooltip>
                </Popconfirm>
            </div>;


        history(subjectPageLink, { state: location.state });
        setPageArray(oldPageArray => [...oldPageArray, newPage]);
        setNewPageName('');
        setPageName(newPageName);
        setOpenNewPageModal(false);
    }

    const handleRemovePage = (pageId) => {
        setPageArray(current =>
            current.filter(({props}) => {
              return props.id !== pageId;
        }));
        setPageName('');
        message.success('Página removida!');
    }

    const showNewPageModal = () => {
        setOpenNewPageModal(true);
        setHideMarkdownMenu(false);
    };
    
      const cancelNewPageModal = () => {
        setOpenNewPageModal(false);
    };

    function handleMarkedInputTyping(e){
        setMarkupContent(e.target);
        setMarkdownPanelVisible('none');

        // TODO - Pegar aqui o html e salvar no banco de dados

        /* TODO - Ver se isso funciona melhor em vez da biblioteca use-debounce
            function Search() {
                const [searchTerm, setSearchTerm] = useState('')

                useEffect(() => {
                    const delayDebounceFn = setTimeout(() => {
                    console.log(searchTerm)
                    // Send Axios request here
                    }, 3000)

                    return () => clearTimeout(delayDebounceFn)
                }, [searchTerm])

                return (
                    <input
                    autoFocus
                    type='text'
                    autoComplete='off'
                    className='live-search-field'
                    placeholder='Search here...'
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                )
            }
        */
    } 

    console.log('markupContentToSave', markupContentToSave)

    return (
        <MarkedInputContainer>
            <Modal
                open={openNewPageModal}
                title={'Adicionar página'}
                onCancel={cancelNewPageModal}
                footer={[
                <Button key="back" onClick={cancelNewPageModal}>
                    Fechar
                </Button>
                ]}
            >
                <AddNewPageModal>
                    <Input 
                        placeholder="Nome da página" 
                        autocomplete="new-password" 
                        value={newPageName}
                        onChange={(e) => setNewPageName(e.target.value)}
                    />
                    <Button 
                        type="primary"
                        disabled={newPageName.trim() === "" ? true : false}
                        style={{
                        opacity: newPageName.trim() === "" ? '' : '0.8',
                        cursor: newPageName.trim() === "" ? 'not-allowed' : ''
                        }}
                        onClick={() => handleCreateNewPage()}
                    >Adicionar</Button>
                </AddNewPageModal>
            </Modal>
            <MarkedInputMenu hideMarkdownMenu={hideMarkdownMenu}>
                {hideMarkdownMenu ? 
                    <Tooltip placement="right" title="Menu de páginas">
                        <FaAngleDoubleRight onClick={() => setHideMarkdownMenu(false)} /> 
                    </Tooltip>  : 
                    <FaAngleDoubleLeft onClick={() => setHideMarkdownMenu(true)} /> 
                }
                <section>
                    {pageArray}
                </section>
                <footer onClick={() => showNewPageModal()}><FaPlus />Adicionar página</footer>
            </MarkedInputMenu>
            <MarketdInputTextAreaContainer>
                <h1>{location.state.subject.title}</h1>
                <h2>{pageName}</h2>
                {pageArray.length !== 0 ? (
                    <MarketdInputTextArea 
                        onPointerUp={(e) => handleRemoveMarkuptPanel(e)}
                        onKeyUp={(e) => handleMarkedInputTyping(e)}
                        onClick={(e) => handleShowMarkupPanel(e)}
                        contentEditable
                    >
                        { [...Array(15)].map((_, index) =>  <div key={index}><br /></div>) }
                    </MarketdInputTextArea> 
                    ) : <BlankAnotationContainer>
                            <FaRegFileAlt /> 
                            <p>Página vazia, adicione uma página de resumo no meu à esquerda</p>
                        </BlankAnotationContainer>
                }
            </MarketdInputTextAreaContainer>
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
