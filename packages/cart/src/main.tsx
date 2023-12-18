
import React from "react"
import { createRoot } from "react-dom/client"
import "#styles/globals.css"
import "#styles/cart.css"
import "#styles/footer.css"
import "#components/i18n"
import App from "./App"
import { OptimizelyProvider } from "@optimizely/react-sdk"
import optimizely from "#utils/optimizely"

const getIp = async () => {
  const response = await fetch("https://api.ipify.org?format=json")
  const data = await response.json()
  const userResponse = await fetch(`https://ipapi.co/${data.ip}/json/`)
  const userData = await userResponse.json()
  return userData
}

const createUser = async () => {
  const userLocation = await getIp()
  return {
    id: "user123",
    attributes: {
      logged_in: "true",
      server_ip: userLocation.ip,
      country: userLocation.country,
      city: userLocation.city,
      region:  userLocation.region,
      country_code: userLocation.country_code,
      postal_code: userLocation.postal,
      continent_code: userLocation.continent_code,
      os: "windows",
      device: "desktop",
     Guest: "1",
    },
  }
}

const renderApp = async () => {
  const user = await createUser()

  createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <OptimizelyProvider optimizely={optimizely} user={user}>
        <App />
      </OptimizelyProvider>
    </React.StrictMode>
  )
}

renderApp()
