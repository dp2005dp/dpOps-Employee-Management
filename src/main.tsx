import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'
import EmployeeDataLayout from './components/EmployeeDataLayout.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <EmployeeDataLayout>
       <App />
    </EmployeeDataLayout>
       <Toaster
      position='top-center'
      toastOptions={{
        duration: 4000,
        success: {
          style: {
            background: "#E8F4F4",
            color: "#00B4A6",
          },
        },
        error: {
          style: {
              background: '#F52742',
              color: "#ffffff",
            },
        },
      }}
    />
    </BrowserRouter> 
  </StrictMode>,
)
