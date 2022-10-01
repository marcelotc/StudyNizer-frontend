import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { MarkedInput } from "./components/markedInput";
import { Button, Modal } from 'antd';
import { TextMarkdownContainer, Title } from './styles';

export function TextMarkdown() {
    const { state } = useLocation();
    const [open, setOpen] = useState(false);

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
        <TextMarkdownContainer>
            <Title>{state.subject.title}</Title>
            <Modal
                open={open}
                title="Title"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                <Button type="primary" onClick={handleOk}>
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
            <MarkedInput 
                handleMardownModal={{showModal, handleCancel}} 
            />
        </TextMarkdownContainer>
    );
}
