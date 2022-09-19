import React, { useState } from "react";
import { MarkedInput } from "./components/markedInput";
import { Button, Modal } from 'antd';
import { Result } from "./components/result";
import EditorContext from "./editorContext";
import { EditorContainer, TextMarkdownContainer, Title } from './styles';

export function TextMarkdown() {
    const [markdownText, setMarkdownText] = useState("");
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const contextValue = {
        markdownText,
        setMarkdownText
    };

    const showModal = () => {
        setOpen(true);
      };
    
    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <EditorContext.Provider value={contextValue}>
            <TextMarkdownContainer>
                <Title>Markdown Editor</Title>
                <Button type="primary" onClick={showModal}>
                    Utilizar Markdown
                </Button>
            <Modal
                open={open}
                title="Title"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                <Button type="primary" loading={loading} onClick={handleOk}>
                    Fechar
                </Button>
                ]}
            >
                <p># H1</p>
                <p>## H2</p>
                <p>### H3</p>
                <p>#### H4</p>
                <p>##### H5</p>
                <p>[texto do link](https://link.com) Links</p>
                <p>* Lista</p>
                <p>`texto` destaque</p>
            </Modal>
                <EditorContainer>
                    <MarkedInput />
                    <Result />
                </EditorContainer>
            </TextMarkdownContainer>
        </EditorContext.Provider>
    );
}
