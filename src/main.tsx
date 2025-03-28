import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n.ts'
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux";
import {BrowserRouter} from 'react-router-dom'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
