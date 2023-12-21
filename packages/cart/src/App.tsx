
import React, { useEffect, useState } from "react"
import { HelmetProvider } from "react-helmet-async"
import { Router, Route, Switch, useLocation } from "wouter"
import { OptimizelyProvider } from "@optimizely/react-sdk"
import optimizely from "#utils/optimizely"
import { EmbeddedCapabilities } from "#components/EmbeddedCapabilities"
import CartPage from "./pages/CartPage"
import ErrorPage from "./pages/ErrorPage"

optimizely.setUser({
  id: "user123",
  attributes: {
    device: "iPhone",
    lifetime: 24738388,
    is_logged_in: true,
  },
})

function App() {
  // const [orderStatus, setOrderStatus] = useState("")

  // const [location] = useLocation()
  // var urlString = window?.location?.href
  // var url = new URL(urlString)
  // var queryParams = url?.searchParams
  // var accessToken = queryParams?.get("accessToken")

  // const orderId = location.split("/").pop()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.REACT_APP_PUBLIC_CL_URL_PATH}/api/orders/${orderId}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Accept: "application/vnd.api+json",
  //             Authorization: `Bearer ${accessToken}`,
  //             "Content-Type": "application/vnd.api+json",
  //           },
  //         }
  //       )
  //       const data = await response.json()
  //       let orderStatus = data?.data?.attributes?.status
  //       setOrderStatus(orderStatus)
  //     } catch (error) {
  //       console.error("Error fetching data:", error)
  //     } finally {
  //     }
  //   }

  //   if (orderId && accessToken) {
  //     fetchData()
  //   }
  // }, [orderId, accessToken])

  // useEffect(() => {
  //   fetch("https://api.ipify.org?format=json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const userIP = data.ip
  //       localStorage.setItem("IP", userIP)
  //     })
  //     .catch((error) => console.error("Error fetching user IP:", error))
  // }, [])

  const basePath =
    import.meta.env.PUBLIC_PROJECT_PATH != null
      ? `/${import.meta.env.PUBLIC_PROJECT_PATH}`
      : undefined

      console.log(basePath)

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
