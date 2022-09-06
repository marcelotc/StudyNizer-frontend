import { createGlobalStyle } from 'styled-components';

import 'antd/dist/antd.css'

export const GlobalStyle = createGlobalStyle`
  body {
    background: #fff;
  }
  * {
    box-sizing: border-box;
    margin:0;
    padding: 0;
    font-family: 'Arial', sans-serif;
  }
`;
