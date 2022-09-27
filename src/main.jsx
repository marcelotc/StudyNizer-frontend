import React from 'react'
import ReactDOM from 'react-dom/client'
import ptBr from 'antd/es/locale/pt_BR';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
 /* <React.StrictMode> */
   <ConfigProvider locale={ptBr}>
    <App />
   </ConfigProvider>
 /* </React.StrictMode> */
)

/**
  Strict mode removido devido a lib react-beautiful-dnd
 */