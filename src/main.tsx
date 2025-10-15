import { createRoot } from "react-dom/client";
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <>
    <AuthProvider>
      <App />
    </AuthProvider>
    <Toaster position="top-right" richColors />
  </>
);