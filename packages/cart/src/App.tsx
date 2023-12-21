// import { HelmetProvider } from "react-helmet-async"
// import { Router, Route, Switch } from "wouter"
// import { useLocation } from "wouter"
// import CartPage from "./pages/CartPage"
// import ErrorPage from "./pages/ErrorPage"
// import { OptimizelyProvider } from "@optimizely/react-sdk"
// import optimizely from "#utils/optimizely"

// import { EmbeddedCapabilities } from "#components/EmbeddedCapabilities"
// import { useEffect, useState } from "react"

// optimizely.setUser({
//   id: "user123",
//   attributes: {
//     device: "iPhone",
//     lifetime: 24738388,
//     is_logged_in: true,
//   },
// })

// function App(): JSX.Element {
//   const [orderStatus, setOrderStatus] = useState("")
//   var urlString = window?.location?.href
//   var url = new URL(urlString)
//   var queryParams = url?.searchParams
//   var accessToken = queryParams?.get("accessToken")
//   const [location] = useLocation()
//   debugger
//   const orderId = location.split("/").pop()

//   useEffect(() => {
//     if (orderId && accessToken) {
//       const fetchData = async () => {
//         try {
//           const response = await fetch(
//             `${process.env.REACT_APP_PUBLIC_CL_URL_PATH}/api/orders/${orderId}`,
//             {
//               method: "GET",
//               headers: {
//                 Accept: "application/vnd.api+json",
//                 Authorization: `Bearer ${accessToken}`,
//                 "Content-Type": "application/vnd.api+json",
//               },
//             }
//           )
//           debugger
//           const data = await response.json()
//           let orderStatus = data?.data?.attributes?.status
//           setOrderStatus(data?.data?.attributes?.status)
//           return data?.data?.attributes?.status || ""
//         } catch (error) {
//           console.error("Error fetching data:", error)
//         }
//       }
//       fetchData()
//     }
//   }, [orderId, accessToken])

//   useEffect(() => {
//     fetch("https://api.ipify.org?format=json")
//       .then((response) => response.json())
//       .then((data) => {
//         const userIP = data.ip
//         localStorage.setItem("IP", userIP)
//       })
//       .catch((error) => console.error("Error fetching user IP:", error))
//   }, [])

//   const basePath =
//     import.meta.env.PUBLIC_PROJECT_PATH != null
//       ? `/${import.meta.env.PUBLIC_PROJECT_PATH}`
//       : undefined
//   if (orderStatus === "placed") {
//     window.location.href = `http://localhost:3000/ykohGlvLZk?accessToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJkWGttWkZhb1FSIiwic2x1ZyI6ImV6LWNvbnRhY3RzIiwiZW50ZXJwcmlzZSI6dHJ1ZX0sIm93bmVyIjp7ImlkIjoiblZSUGhSS2RiRSIsInR5cGUiOiJDdXN0b21lciJ9LCJhcHBsaWNhdGlvbiI6eyJpZCI6IiIsImtpbmQiOiJzYWxlc19jaGFubmVsIiwicHVibGljIjp0cnVlfSwibWFya2V0Ijp7ImlkIjpbIkJseHJKaHdZZWoiXSwicHJpY2VfbGlzdF9pZCI6IllsRUdtQ3hBTkIiLCJzdG9ja19sb2NhdGlvbl9pZHMiOlsiQm5EUWd1RXFvRyIsIkVuQUx4dWRYTE0iLCJnbldvbXVwanFuIiwicWtQYmV1clpLbiIsIlJNTEJ6dWJnT0ciLCJ2TVF3anVvandHIl19LCJleHAiOjE3MDMxNzE5MTQsInJhbmQiOjAuNTgsInRlc3QiOnRydWV9.9AmvcIPTN06dTn_LDnlaUS6fG_yiUtpD9nsmjMmDWifYmnriSIQaMBYSfW2DTLd-JdWLa-hS9CjrpZqHXKGWHQ&islogged=1&ezref=74efc9dcc5c8566d`
//     return <></>
//   }

//   return (
//     <OptimizelyProvider optimizely={optimizely}>
//       <HelmetProvider>
//         <EmbeddedCapabilities.IframeResizerInit />
//         <Router base={basePath}>
//           <Switch>
//             <Route path={"/404"}>
//               <ErrorPage />
//             </Route>
//             <Route path={"/:orderId"}>
//               <CartPage />
//             </Route>
//             <Route>
//               <ErrorPage />
//             </Route>
//           </Switch>
//         </Router>
//       </HelmetProvider>
//     </OptimizelyProvider>
//   )
// }

// export default App

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
