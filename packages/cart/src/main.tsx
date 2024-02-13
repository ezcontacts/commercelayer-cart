import React from "react"
import { createRoot } from "react-dom/client"
import "#styles/globals.css"
import "#styles/cart.css"
import "#styles/footer.css"
import "#components/i18n"
import App from "./App"

const renderApp = async () => {
  createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

renderApp()
