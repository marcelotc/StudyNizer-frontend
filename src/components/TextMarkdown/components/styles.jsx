import styled from "styled-components";

export const MarkedInputContainer = styled.div`
  width: 50%;
  height: 100%;
  padding: 13px;
  border-right: 1.5px solid rgba(15, 15, 15, 0.4);
  font-family: "Lato", sans-serif;
`;

export const MarkdownPanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  display: ${props => props.markdownPanelVisible};
  width: 220px; 
  padding: 8px;
  border-radius: 2px;
  background-color: #fff;
  left: ${props => `calc(${props?.rect.left}px + calc(${props?.rect.width}px / 2) - 40px)`};
  top:  ${props => `calc(${props?.rect.top}px - 48px)`};
  box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07), 
                0 4px 8px rgba(0,0,0,0.07), 
                0 8px 16px rgba(0,0,0,0.07),
                0 16px 32px rgba(0,0,0,0.07), 
                0 32px 64px rgba(0,0,0,0.07);
  
  > div {
    display: table;
    margin: 0 auto;
    height: 100%;
    font-weight: bold;
  }
`;

export const MarketdInputTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 1em;
  padding: 8px 0;
  border-bottom: 1px solid rgba(15, 15, 15, 0.3);
`;

export const MarketdInputTextArea = styled.div`
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