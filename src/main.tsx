import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import { Admin } from './components/admin.component.tsx';

import './index.css'
import { Home } from './components/home.component.tsx';

const router = createBrowserRouter([
  {
    path: "",
    Component: App,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "admin",
        Component: Admin,
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
