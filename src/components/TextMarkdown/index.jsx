import React from "react";
import { MarkedInput } from "./components/markedInput";
import { TextMarkdownContainer, Title } from './styles';

export function TextMarkdown() {
    return (
        <TextMarkdownContainer>
            <MarkedInput />
        </TextMarkdownContainer>
    );
}
