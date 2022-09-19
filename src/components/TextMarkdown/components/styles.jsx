import styled from "styled-components";

export const MarkedInputContainer = styled.div`
  width: 50%;
  height: 100%;
  padding: 13px;
  border-right: 1.5px solid rgba(15, 15, 15, 0.4);
  font-family: "Lato", sans-serif;
`;

export const MarketdInputTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 1em;
  padding: 8px 0;
  border-bottom: 1px solid rgba(15, 15, 15, 0.3);
`;

export const MarketdInputTextAreaTest = styled.div`
  outline: none;

  > div:hover {
      border-bottom: 1px solid lightgray;
  }

  > div:hover:before {
      content: "\f055";
      font-family: 'Font Awesome 5 Free';
      font-weight: 900;
      font-size: 30px;
      font-weight: bold;
      vertical-align: middle;
  }

  > div:hover:before {
      pointer-events: all;
  }
`;

export const MarketdInputTextArea = styled.textarea`
  height: 100%;
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  font-size: 17px;
`;

export const ResultContainer = styled.div`
  width: 50%;
  height: 100%;
  padding: 13px;
  font-family: "Lato", sans-serif;
`;

export const ResultTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 1em;
  padding: 8px 0;
  border-bottom: 1px solid rgba(15, 15, 15, 0.3);
`;

export const ResultArea = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 17px;
`;