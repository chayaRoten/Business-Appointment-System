import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import { AdminLayout } from './components/admin/adminLayout.component.tsx';

import './index.css'
import { Home } from './components/user/home.component.tsx';
import BusinessDetails from './components/admin/businessDetails.component.tsx';
import SignIn from './components/signIn.component.tsx';
import SignUp from './components/signUp.component.tsx';
import { AuthProvider } from './context/auth.context.tsx';

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
        path: "signin",
        element: <AuthProvider><div><SignIn></SignIn></div></AuthProvider>,
      },
      {
        path: "signup",
        element: <AuthProvider><div><SignUp></SignUp></div></AuthProvider>,
      }
    ]
  },
  {
  path: "admin",
    Component: AdminLayout,
    children: [
      {
        path: "business-detail",
        Component: BusinessDetails,
      },
      // {
      //   path: "contact",
      //   Component: Contact,
      // },
      // {
      //   path: "about",
      //   Component: About,
      // },
    ]
  }
  // {
  //   path: "admin",
  //   Component: AdminLayout,
  // },
  // {
  //   path: 'admin/business-detail',
  //   Component: BusinessDetails
  // }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
