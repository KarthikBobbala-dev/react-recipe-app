import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux';
import Store from "./Store/Store.ts";

createRoot(document.getElementById('root')!).render(
 <Provider store={Store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>


)
