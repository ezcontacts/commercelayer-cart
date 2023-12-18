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
    server_ip: "172.20.21.13",
    country: "Germany",
    city: "Frankfurt am Main",
    region: "Hesse",
    country_code: "IN",
    postal_code: "60313",
    continent_code: "",
    os: "Windows",
    device: "Desktop",
    browser: "MSIE",
    browser_version: "9.0",
    Guest: "1",
  },
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <OptimizelyProvider optimizely={optimizely} user={user}>
      <App />
    </OptimizelyProvider>
  </React.StrictMode>
)
