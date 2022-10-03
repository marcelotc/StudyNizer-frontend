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

    a {
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #000;
    }

    > div {
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        padding: 10px 0 10px 0;
        font-weight: bold;

        &:hover {
          background: lightgray;
          transition: 0.3s;
        }

        svg {
          margin: 0 10px -2px 10px;
          font-size: 18px;
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
    font-weight: bold;
    display: ${props => props.hideMarkdownMenu ? 'none' : 'block'};
    padding: 10px 0;

    > svg {
      margin: 0 10px -2px 10px;
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
  left: 180px;
  right: 180px;
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

export const MarketdInputTextAreaContainer = styled.div`
  width: 100%;

  h1 {
    text-align: center;
  }

`;

export const MarketdInputTextArea = styled.div`
  outline: none;

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

export const BlankAnotationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  font-size: 20px;

  > svg {
    font-size: 80px;
    margin: 0 20px 35px 0;
  }
`;

export const AddNewPageModal = styled.div`
  button {
    width: 100%;
    margin-top: 10px;
  }
`;