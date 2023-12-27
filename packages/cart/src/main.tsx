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
  return {
    ip: data.ip,
    country: userData.country_name,
    city: userData.city,
    region: userData.region,
    country_code: userData.country_code,
    postal: userData.postal,
    continent_code: userData.continent_code,
    logged_in: "true",
  }
}

const createUser = async () => {
  var urlString = window?.location?.href
  var url = new URL(urlString)
  var queryParams = url?.searchParams
  var visitorId = queryParams?.get("ezref")
  const userLocation = await getIp()
  return {
    id: visitorId ? visitorId : "user123",
    attributes: {
      logged_in: "true",
      server_ip: userLocation.ip,
      country: userLocation.country,
      city: userLocation.city,
      region: userLocation.region,
      country_code: userLocation.country_code,
      postal_code: userLocation.postal,
      continent_code: userLocation.continent_code,
      os: "windows",
      device: "desktop",
    },
  }
}

const renderApp = async () => {
  const user = await createUser()

  console.log("user", user)
  createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <OptimizelyProvider optimizely={optimizely} user={user}>
        <App />
      </OptimizelyProvider>
    </React.StrictMode>
  )
}

renderApp()
