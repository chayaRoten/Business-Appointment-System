import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import { login } from './components/login.component';

import './index.css'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const router = createBrowserRouter([
  {
    path: "",
    Component: App,
    children: [
      {
        path: "login",
        Component: logi,
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
