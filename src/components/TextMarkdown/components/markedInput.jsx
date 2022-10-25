import React, { useState, useEffect  } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Editor, EditorState, ContentState, RichUtils, convertToRaw, convertFromRaw } from "draft-js";
import { Popconfirm, Tooltip, message, Modal, Button, Input, notification, Skeleton } from 'antd';
import { FaTimes, FaPlus, FaRegFile, FaRegFileAlt, FaTimesCircle, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { MarkedInputContainer, MarkedInputMenu, MarketdInputTextAreaContainer, BlankAnnotationContainer, MarkdownPanel, AddNewPageModal } from "./styles";
import { v4 } from 'uuid';

import api from '../../../services/api';
import { initialEditorState } from './initialEditorState';

import "draft-js/dist/Draft.css";

export function MarkedInput() {
    const location = useLocation();
    const history = useNavigate();

    const getUserSession = localStorage.getItem('@StudyNizer:userSession');
    const headers = { Authorization: `Bearer ${JSON.parse(getUserSession).token}` };
    const userId = JSON.parse(getUserSession).id;

    const [selectedCoordinates, setSelectedCoordinates] = useState(0);
    const [markdownPanelVisible, setMarkdownPanelVisible] = useState('none');
    const [hideMarkdownMenu, setHideMarkdownMenu] = useState(false);
    const [pageArray, setPageArray] = useState([]);
    const [pagesMarkdownArray, setPagesMarkdownArray] = useState([]);
    const [pageDeleted, setPageDeleted] = useState(false);
    const [addMarkdownLoad, setAddMarkdownLoad] = useState(false);
    const [addMarkdownUpdate, setAddMarkdownUpdate] = useState(false);

    const getPages = JSON.parse(localStorage.getItem('@StudyNizer:subjectsPages'))
    localStorage.setItem('@StudyNizer:subjectsPages', JSON.stringify(pageArray));

    const getPagesMarkdown = JSON.parse(localStorage.getItem('@StudyNizer:pagesMarkdown'))
    localStorage.setItem('@StudyNizer:pagesMarkdown', JSON.stringify(pagesMarkdownArray));

    const [openNewPageModal, setOpenNewPageModal] = useState(false);
    const [newPageName, setNewPageName] = useState('');
    const [pageName, setPageName] = useState('');
    const [activePage, setActivePage] = useState(null);

    const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText('')));

    const editor = React.useRef(null);

    const handleChangeEditor = (editorState) => {
        let contentRaw = convertToRaw(editorState.getCurrentContent());

        const filteredResult = pageArray.find((obj) => obj.url_id === location.pathname);

        if (filteredResult){
            filteredResult.annotation_block.annotationBlock = contentRaw;
        }
        console.log('contentRaw', contentRaw)

        setEditorState(editorState);
        setMarkdownPanelVisible('none');
    }

    function focusEditor() {
        editor?.current?.focus();
    }
    
    useEffect(() => {
      focusEditor();

        const getMakrdownPages = async () => {
            setAddMarkdownLoad(true);
            try {
                const res = await api.get(`/user/markdown/${userId}`, { headers });
                setPageArray(res.data);      
            } catch (error) {
                notification.info({
                    message: `${error?.response?.data?.error}`,
                    placement: 'top',
                });
            }
            setAddMarkdownLoad(false);
        }

        getMakrdownPages();

        if (getPages) {
            setPageArray(getPages);
        } else {
            setPageArray([]);
        }

        if (getPagesMarkdown) {
            setPagesMarkdownArray(getPagesMarkdown);
        } else {
            setPagesMarkdownArray([]);
        }
    }, [addMarkdownUpdate]);

    useEffect(() => {
        const filteredResult = pageArray.find((obj) => obj.url_id === location.pathname);

        if (filteredResult){
          setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(JSON.stringify(filteredResult.annotation_block.annotationBlock)))));
        }
    }, [pageName]);
  
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

    const handleSaveSubjectsArray = () => {
        let subjectsPageArr = [];
        subjectsPageArr = JSON.parse(localStorage.getItem('@StudyNizer:subjectsPages')) || [];
        subjectsPageArr.push(pageArray);
        localStorage.setItem('@StudyNizer:subjectsPages', JSON.stringify(subjectsPageArr));
    }

    const handleSavePagesMarkdownArray = () => {
        let pagesMarkdownArr = [];
        pagesMarkdownArr = JSON.parse(localStorage.getItem('@StudyNizer:pagesMarkdown')) || [];
        pagesMarkdownArr.push(pagesMarkdownArray);
        localStorage.setItem('@StudyNizer:pagesMarkdown', JSON.stringify(pagesMarkdownArr));
    }

    const handleCreateNewPage = async () => {
        let pageId = v4();

        let subjectPageLink = `/subject-annotations/${location.state.subject.title.replace(/ /g, '-').toLowerCase()}-${location.state.subject.subject_id}/${newPageName.replace(/ /g, '-').toLowerCase()}-${pageId}`;

        const newPageObj = {
            id: pageId,
            pageName: newPageName,
            urlPath: subjectPageLink,
            subjectName: location.state.subject.title.replace(/ /g, '-').toLowerCase()
        }

        const subjectsAnnotationsPages = {
            id: subjectPageLink,
            pageId: pageId,
            annotationBlock: initialEditorState,
            subjectName: location.state.subject.title.replace(/ /g, '-').toLowerCase()
        }

        try {
            await api.post('/user/markdown', {
                annotation_block: { annotationBlock: initialEditorState },
                page_name: newPageName,
                url_id: subjectPageLink,
                page_id: pageId,
                subject_name: location.state.subject.title.replace(/ /g, '-').toLowerCase(),
                users_id: userId
            }, {headers});
            setAddMarkdownUpdate(!addMarkdownUpdate);
        } catch (error) {
            notification.info({
                message: `${error?.response?.data?.error}`,
                placement: 'top',
            });
        }
        
        history(subjectPageLink, { state: location.state });
        setPageArray(oldPageArray => [...oldPageArray, newPageObj]);
        setPagesMarkdownArray(oldPagesMarkdownArray => [...oldPagesMarkdownArray, subjectsAnnotationsPages]);
        setNewPageName('');
        setOpenNewPageModal(false);
        setMarkdownPanelVisible('none');
        setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(JSON.stringify(initialEditorState)))));
    
        handleSaveSubjectsArray();
        handleSavePagesMarkdownArray();
    }

    const handleRemovePage = (pageId) => {
        setPageArray(current =>
            current.filter((props) => {
              return props.page_id !== pageId;
        }));
        setPagesMarkdownArray(current =>
            current.filter((props) => {
              return props.pageId !== pageId;
        }));
        setPageDeleted(true);
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
        if (pageDeleted) {
            return <></>
        } else if(pageName === '' && pageArray.length === 0) {
            return (<BlankAnnotationContainer>
                <FaRegFileAlt /> 
                <p>Página vazia, adicione uma página de resumo no meu à esquerda</p>
            </BlankAnnotationContainer>)
        } else if(pageName !== '' && pageArray.length !== 0) {
            return (<div onClick={(e) => handleShowMarkupPanel(e)}>
                <Editor
                    ref={editor}
                    editorState={editorState}
                    onChange={(editorState) => handleChangeEditor(editorState)}
                    blockStyleFn={getBlockStyle}
                />
            </div>)
        }
    }

    const handlePageLink = (e, pageName) => {
        setPageName(pageName);
        setPageDeleted(false);
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
                    {!addMarkdownLoad ? (
                        <>
                            {pageArray.filter(pages => pages.subject_name === location.state.subject.title.replace(/ /g, '-').toLowerCase()).map((page) => (
                                <div 
                                    id={page.page_id} 
                                    className={`${activePage == page.page_name && 'activePageLink'}`}
                                    onClick={() => setActivePage(page.page_name)}
                                >
                                    <FaRegFile />
                                    <NavLink 
                                        id={page.page_id}
                                        to={page.url_id}
                                        state={location.state}
                                        onClick={(e) => handlePageLink(e, page.page_name)}
                                    >
                                        {page.page_name}
                                    </NavLink>
                                    <Popconfirm placement="right" title={'Realmente deseja excluir está página?'} onConfirm={() => confirm(page.page_id)} okText="Sim" cancelText="Não">
                                        <Tooltip placement="right" title="Excluir página">
                                            <FaTimesCircle />
                                        </Tooltip>
                                    </Popconfirm>
                                </div>
                            ))}
                        </>
                    ) : <div style={{padding: '10px'}}>
                            <Skeleton active block />
                        </div>
                    }
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
