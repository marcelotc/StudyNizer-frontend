import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import editorContext from "../editorContext";
import { ResultTitle, ResultContainer, ResultArea } from "./styles";

export function Result(props) {
    const { markdownText } = useContext(editorContext);

    return (
        <ResultContainer>
            <ResultTitle>Converted Text</ResultTitle>
            <ResultArea>
                <ReactMarkdown children={markdownText} />
            </ResultArea>
        </ResultContainer>
    );
}
