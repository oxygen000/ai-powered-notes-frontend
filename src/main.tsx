import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n.ts'
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux";
import {BrowserRouter} from 'react-router-dom'
import { store } from './redux/store.ts'
import NextToploader from "nextjs-toploader"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <NextToploader 
  color="linear-gradient(to right, #2fa05c, #1e7944)" 
  height={4} 
  showSpinner={false} 
  shadow="0 0 10px #2fa05c"
/>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
