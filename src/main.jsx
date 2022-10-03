import React from 'react'
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client'
import ptBr from 'antd/es/locale/pt_BR';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';

import App from './App'
import store from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
 /* <React.StrictMode> */
  <Provider store={store}>
    <ConfigProvider locale={ptBr}>
      <App />
    </ConfigProvider>
  </Provider>
 /* </React.StrictMode> */
)

/**
  Strict mode removido devido a lib react-beautiful-dnd
 */