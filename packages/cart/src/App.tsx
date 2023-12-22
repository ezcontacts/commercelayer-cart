import React, { useEffect } from "react"
import { HelmetProvider } from "react-helmet-async"
import { Router, Route, Switch } from "wouter"
import { EmbeddedCapabilities } from "#components/EmbeddedCapabilities"
import CartPage from "./pages/CartPage"
import ErrorPage from "./pages/ErrorPage"
import { getVisitorId } from "#utils/getLogedinStatus"

const getOrderStatus = async () => {
  var urlString = window?.location?.href
  var url = new URL(urlString)
  var queryParams = url?.searchParams
  var accessToken = queryParams?.get("accessToken")
  const orderId = window?.location?.href.split("/").pop()
  const response = await fetch(
    `${process.env.REACT_APP_PUBLIC_CL_URL_PATH}/api/orders/${orderId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/vnd.api+json",
      },
    }
  )
  const data = await response.json()
  return data?.data?.attributes?.status
}

function App() {
  const visitoId = getVisitorId()
  const [orderstatus, setOderstatus] = React.useState("")

  useEffect(() => {
    const fetchOrderStatus = async () => {
      const orderStatus = await getOrderStatus()
      setOderstatus(orderStatus)
      console.log("orderstatus-latest", orderstatus)
      if (orderStatus === "placed") {
        window.location.href = `${process.env.REACT_APP_PUBLIC_ODOO_PATH}`
        return false
      }
    }

    fetchOrderStatus()
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        const userIP = data.ip
        localStorage.setItem("IP", userIP)
      })
      .catch((error) => console.error("Error fetching user IP:", error))
  }, [orderstatus])

  const basePath =
    import.meta.env.PUBLIC_PROJECT_PATH != null
      ? `/${import.meta.env.PUBLIC_PROJECT_PATH}`
      : undefined

  return (
    <>
      <HelmetProvider>
        <EmbeddedCapabilities.IframeResizerInit />
        <Router base={basePath}>
          <Switch>
            <Route path={"/404"}>
              <ErrorPage />
            </Route>
            <Route path={"/:orderId"}>
              <CartPage />
            </Route>
            <Route>
              <ErrorPage />
            </Route>
          </Switch>
        </Router>
      </HelmetProvider>
    </>
  )
}

export default App
