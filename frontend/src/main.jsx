import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./components/ErrorPage.jsx";
import GettingStarted from './components/GettingStarted.jsx';
import InterviewRoom from './components/InterviewRoom.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <GettingStarted />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/interview",
    element: <InterviewRoom />,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
