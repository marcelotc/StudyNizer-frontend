import React, { useState, useEffect  } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Editor, EditorState, ContentState, RichUtils, convertToRaw, convertFromRaw  } from "draft-js";
import { Popconfirm, Tooltip, message, Modal, Button, Input } from 'antd';
import { FaTimes, FaPlus, FaRegFile, FaRegFileAlt, FaTimesCircle, FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleDown } from "react-icons/fa";
import { MarkedInputContainer, MarkedInputMenu, MarketdInputTextAreaContainer, BlankAnotationContainer, MarketdInputTextArea, MarkdownPanel, AddNewPageModal } from "./styles";
import { v4 } from 'uuid';

import { initialEditorState } from './initialEditorState';
import "draft-js/dist/Draft.css";

export function MarkedInput() {
    const location = useLocation();
    const history = useNavigate();

    const [selectedCoordinates, setSelectedCoordinates] = useState(0);
    const [markdownPanelVisible, setMarkdownPanelVisible] = useState('none');
    const [hideMarkdownMenu, setHideMarkdownMenu] = useState(false);
    const [pageArray, setPageArray] = useState([]);

    const getPages = JSON.parse(localStorage.getItem('@StudyNizer:subjectsPages'))
    localStorage.setItem('@StudyNizer:subjectsPages', JSON.stringify(pageArray));

    const [openNewPageModal, setOpenNewPageModal] = useState(false);
    const [newPageName, setNewPageName] = useState('');
    const [pageName, setPageName] = useState('');

    let rawContentFromStore = '';

    const storeRaw = localStorage.getItem('@StudyNizer:subjectsAnnotations');
    if(storeRaw) {
        rawContentFromStore = EditorState.createWithContent(convertFromRaw(JSON.parse(storeRaw)));
    } else {
        rawContentFromStore = EditorState.createWithContent(ContentState.createFromText(''))
    }
    
    const [editorState, setEditorState] = useState(rawContentFromStore);

    const editor = React.useRef(null);

    const handleChangeEditor = (editorState) => {
        let contentRaw = convertToRaw(editorState.getCurrentContent());
        localStorage.setItem('@StudyNizer:subjectsAnnotations', JSON.stringify(contentRaw));
        
        setEditorState(editorState);
        setMarkdownPanelVisible('none');
    }

    function focusEditor() {
        editor?.current?.focus();
    }

    const subjectsAnotationsPages = [
        {
            id: "/subject-anotations/sistemas-operacionais-0041982d-98ba-4082-bec5-ea72e5c9e19b/teste-1-3a32de46-929f-417c-96d2-d33a8787703c",
            anotationBlock: {
                entityMap: {},
                blocks:[
                  { 
                    key: v4(),
                    text: "teste 1",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  }
                ]
            }
        },
        {
            id: "/subject-anotations/sistemas-operacionais-0041982d-98ba-4082-bec5-ea72e5c9e19b/teste-2-0b61ef27-4aad-41a6-8dc6-a3928c18ca06",
            anotationBlock: {
                entityMap: {},
                blocks:[
                  { 
                    key: v4(),
                    text: "teste 2",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  }
                ]
            }
        },
        {
            id: "/subject-anotations/sistemas-operacionais-0041982d-98ba-4082-bec5-ea72e5c9e19b/teste-3-0fa40d42-a22c-4bb4-864e-ccb344f641a5",
            anotationBlock: {
                entityMap: {},
                blocks:[
                  { 
                    key: v4(),
                    text: "teste 3",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  },
                  { 
                    key: v4(),
                    text: "",
                    type:"unstyled",
                    depth:0,
                    inlineStyleRanges:[],
                    entityRanges: [],
                    data: {}
                  }
                ]
            }
        },
    ]
    
    useEffect(() => {
      focusEditor();

      if (getPages) {
        setPageArray(getPages);
      } else {
        setPageArray([]);
      }
    }, []);

    useEffect(() => {
        const filteredResult = subjectsAnotationsPages.find((e) => e.id === location.pathname);

        if (filteredResult){
          setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(JSON.stringify(filteredResult.anotationBlock)))));
        }
    }, [pageName])
  
    const StyleButton = (props) => {
      let onClickButton = (e) => {
        e.preventDefault();
        props.onToggle(props.style);
      };
      return <button className="editorToolBarButton" onMouseDown={onClickButton}>{props.label}</button>;
    };
  
    const BLOCK_TYPES = [
      { label: "H1", style: "header-one" },
      { label: "H2", style: "header-two" },
      { label: "H3", style: "header-three" },
      { label: "H4", style: "header-four" },
      { label: "H5", style: "header-five" },
      { label: "H6", style: "header-six" },
      { label: "UL", style: "unordered-list-item" },
      { label: "OL", style: "ordered-list-item" },
      { label: "Left", style: "left" },
      { label: "Center", style: "center" },
      { label: "Right", style: "right" },
    ];
  
    const BlockStyleControls = (props) => {
      return (
        <div>
          {BLOCK_TYPES.map((type) => (
            <StyleButton
              key={type.label}
              label={type.label}
              onToggle={props.onToggle}
              style={type.style}
            />
          ))}
        </div>
      );
    };
  
    const INLINE_STYLES = [
      { label: "Bold", style: "BOLD" },
      { label: "Italic", style: "ITALIC" },
      { label: "Underline", style: "UNDERLINE" },
    ];
    const InlineStyleControls = (props) => {
      return (
        <div>
          {INLINE_STYLES.map((type) => (
            <StyleButton
              key={type.label}
              label={type.label}
              onToggle={props.onToggle}
              style={type.style}
            />
          ))}
        </div>
      );
    };
  
    const onInlineClick = (e) => {
      let nextState = RichUtils.toggleInlineStyle(editorState, e);
      setEditorState(nextState);
    };
  
    const onBlockClick = (e) => {
      let nextState = RichUtils.toggleBlockType(editorState, e);
      setEditorState(nextState);
    };

    const handleShowMarkupPanel = (e) => {
        setSelectedCoordinates(e.pageY - 30);
        setMarkdownPanelVisible('block');   
    }

    const confirm = (pageId) => {
        handleRemovePage(pageId);
        setMarkdownPanelVisible('none');
    };

    const handleCreateNewPage = () => {
        let pageId = v4();

        let subjectPageLink = `/subject-anotations/${location.state.subject.title.replace(/ /g, '-').toLowerCase()}-${location.state.subject.id}/${newPageName.replace(/ /g, '-').toLowerCase()}-${pageId}`;

        const newPageObj = {
            id: v4(),
            pageName: newPageName,
            urlPath: subjectPageLink
        }
        
        history(subjectPageLink, { state: location.state });
        setPageArray(oldPageArray => [...oldPageArray, newPageObj]);
        setNewPageName('');
        setOpenNewPageModal(false);
        setMarkdownPanelVisible('none');
        
        setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(JSON.stringify(initialEditorState)))));

        let subjectsPageArr = [];
        subjectsPageArr = JSON.parse(localStorage.getItem('@StudyNizer:subjectsPages')) || [];
        subjectsPageArr.push(pageArray);
        localStorage.setItem('@StudyNizer:subjectsPages', JSON.stringify(subjectsPageArr));
    }

    const handleRemovePage = (pageId) => {
        setPageArray(current =>
            current.filter((props) => {
              return props.id !== pageId;
        }));
        message.success('Página removida!');
    }

    const showNewPageModal = () => {
        setOpenNewPageModal(true);
        setHideMarkdownMenu(false);
    };
    
      const cancelNewPageModal = () => {
        setOpenNewPageModal(false);
    };

    const getBlockStyle = (block) => {
        switch (block.getType()) {
            case 'left':
                return 'align-left';
            case 'center':
                return 'align-center';
            case 'right':
                return 'align-right';
            default:
                return null;
        }   
    }

    const renderEditor = () => {
        if(pageName === '' && pageArray.length === 0) {
            return (<BlankAnotationContainer>
                <FaRegFileAlt /> 
                <p>Página vazia, adicione uma página de resumo no meu à esquerda</p>
            </BlankAnotationContainer>)
        } else if(pageName !== '' && pageArray.length !== 0) {
            return (<div onClick={(e) => handleShowMarkupPanel(e)}>
                <Editor
                    ref={editor}
                    editorState={editorState}
                    onChange={(editorState) => handleChangeEditor(editorState)}
                    blockStyleFn={getBlockStyle}
                />
            </div>)
        } else {
            return <></>
        }
    }

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
                    {pageArray.map((page) => (
                        <div id={page.id}>
                            <FaRegFile />
                            <NavLink 
                                id={page.id}
                                to={page.urlPath}
                                state={location.state}
                                onClick={() => setPageName(page.pageName)}
                            >
                                {page.pageName}
                            </NavLink>
                            <Popconfirm placement="right" title={'Realmente deseja excluir está página?'} onConfirm={() => confirm(page.id)} okText="Sim" cancelText="Não">
                                <Tooltip placement="right" title="Excluir página">
                                    <FaTimesCircle />
                                </Tooltip>
                            </Popconfirm>
                        </div>
                    ))}
                </section>
                <footer onClick={() => showNewPageModal()}><FaPlus />Adicionar página</footer>
            </MarkedInputMenu>
            <MarketdInputTextAreaContainer>
                <h1>{location?.state?.subject.title}</h1>
                <h2>{pageName}</h2>
                {renderEditor()}
            </MarketdInputTextAreaContainer>
            <MarkdownPanel 
                markdownPanelVisible={markdownPanelVisible} 
                rect={selectedCoordinates}
            >
                <div className="markdownPanel" onMouseDown={(event) => event.preventDefault()}>
                    <BlockStyleControls onToggle={onBlockClick} />
                    <InlineStyleControls onToggle={onInlineClick} />
                    <FaTimes onClick={() => setMarkdownPanelVisible('none')} />
                </div>
            </MarkdownPanel>
        </MarkedInputContainer>
    );
}
