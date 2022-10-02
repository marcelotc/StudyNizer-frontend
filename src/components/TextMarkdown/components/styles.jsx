import styled from "styled-components";

export const MarkedInputContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 13px 13px 13px 0;
  font-family: "Lato", sans-serif;
`;

export const MarkedInputMenu = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  width: ${props => props.hideMarkdownMenu ? '4%' : '18%'};
  margin-right: 50px;
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  transition: 0.3s;
  overflow-y: auto;
  
  ::-webkit-scrollbar {
    display: none;
  }

  > svg {
    font-size: 25px;
    cursor: pointer;
    align-self: flex-end;
    margin: 10px 10px 0 0;
    margin-bottom: 10px;

    &:hover {
      color: gray;
      transition: 0.3s;
    }
  }

  section {
    display: ${props => props.hideMarkdownMenu ? 'none' : 'block'};

    > div {
      cursor: pointer;
      padding: 10px 0 10px 0;
      font-weight: bold;

      > input {
        width: 60%;
        border: none;
        outline: none;
        border-radius: 3px;
        padding-left: 5px;
      }

      &:hover {
        background: lightgray;
        transition: 0.3s;
      }

      svg {
        margin: 0 10px -2px 10px;
      }

      svg:nth-child(3):hover {
        color: red;
        transition: 0.2s;
      }
    }
  }

  footer {
    font-size: 15px;
    width: 100%;
    text-align: center;
    font-weight: bold;
    display: ${props => props.hideMarkdownMenu ? 'none' : 'block'};
    padding: 10px;

    > svg {
      margin: 0 10px -2px 0;
    }

    &:hover {
      cursor: pointer;
      background: lightgray;
      transition: 0.3s;
    }
  }
`;

export const MarkdownPanel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  display: ${props => props.markdownPanelVisible};
  padding: 0 30px;
  height: 40px; 
  border-radius: 2px;
  background-color: #fff;
  border-radius: 10px;
  left: 250px;
  right: 250px;
  top:  ${props => `calc(${props?.rect}px - 48px)`};
  box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07), 
                0 4px 8px rgba(0,0,0,0.07), 
                0 8px 16px rgba(0,0,0,0.07),
                0 16px 32px rgba(0,0,0,0.07), 
                0 32px 64px rgba(0,0,0,0.07);
  
  .markdownPanel {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%; 

    > svg {
      position: absolute;
      right: 10px;
      top: 5px;
      font-size: 15px;
      cursor: pointer;

      &:hover {
        color: gray;
      }
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      margin: 0 10px;
      font-weight: bold;

      &:hover{
        background: #ebe8e8;
        cursor: pointer;
      }
    }
  }
`;

export const MarketdInputTextArea = styled.div`
  outline: none;
  width: 100%;

  > div {
      border-bottom: 1px solid lightgray;

      &:hover {
        border-bottom: 1px solid #000;
        transition: 0.4s;
      }
  }

  /*
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
  */
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