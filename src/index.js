import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { CartProvider } from "./Context/CartContext";
import { LanguageProvider } from "./Context/LanguageContext";
import AuthProvider from "./Auth/AuthProvider";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <CartProvider>
        <LanguageProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LanguageProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
