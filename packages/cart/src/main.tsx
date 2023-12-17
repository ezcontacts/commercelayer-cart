import React from "react"
import { createRoot } from "react-dom/client"

import "#styles/globals.css"
import "#styles/cart.css"
import "#styles/footer.css"
import "#components/i18n"
import App from "./App"
import { OptimizelyProvider } from "@optimizely/react-sdk"
import optimizely from "#utils/optimizely"

const user = {
  id: "user123",
  attributes: {
    logged_in: "true",
   },
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <OptimizelyProvider optimizely={optimizely} user={user}>
      <App />
    </OptimizelyProvider>
  </React.StrictMode>
)
