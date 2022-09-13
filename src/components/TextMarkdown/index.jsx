import React, { useState } from "react";
import { MarkedInput } from "./components/markedInput";
import { Result } from "./components/result";
import EditorContext from "./editorContext";
import { EditorContainer, TextMarkdownContainer, Title } from './styles';

export function TextMarkdown() {
    const [markdownText, setMarkdownText] = useState("");

    const contextValue = {
        markdownText,
        setMarkdownText
    };

    return (
        <EditorContext.Provider value={contextValue}>
            <TextMarkdownContainer>
                <Title>Markdown Editor</Title>
                <EditorContainer>
                    <MarkedInput />
                    <Result />
                </EditorContainer>
            </TextMarkdownContainer>
        </EditorContext.Provider>
    );
}
