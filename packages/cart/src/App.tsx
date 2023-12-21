import React, { useEffect } from "react"
import { HelmetProvider } from "react-helmet-async"
import { Router, Route, Switch } from "wouter"
import { OptimizelyProvider } from "@optimizely/react-sdk"
import optimizely from "#utils/optimizely"
import { EmbeddedCapabilities } from "#components/EmbeddedCapabilities"
import CartPage from "./pages/CartPage"
import ErrorPage from "./pages/ErrorPage"
import { getVisitorId } from "#utils/getLogedinStatus"

function App() {
  const visitoId = getVisitorId()
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        const userIP = data.ip
        localStorage.setItem("IP", userIP)
      })
      .catch((error) => console.error("Error fetching user IP:", error))
  }, [])

  const basePath =
    import.meta.env.PUBLIC_PROJECT_PATH != null
      ? `/${import.meta.env.PUBLIC_PROJECT_PATH}`
      : undefined
  optimizely?.setUser({
    id: visitoId ? visitoId : "user123",
    attributes: {
      device: "iPhone",
      lifetime: 24738388,
      is_logged_in: true,
    },
  })
  return (
    <>
      <OptimizelyProvider optimizely={optimizely}>
        <HelmetProvider>
          <EmbeddedCapabilities.IframeResizerInit />
          <Router base={basePath}>
            <Switch>
              <Route path={"/:orderId"}>
                <CartPage />
              </Route>
              <Route path={"/404"}>
                <ErrorPage />
              </Route>
              <Route>
                <ErrorPage />
              </Route>
            </Switch>
          </Router>
        </HelmetProvider>
      </OptimizelyProvider>
    </>
  )
}

export default App
