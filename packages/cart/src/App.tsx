import { HelmetProvider } from "react-helmet-async"
import { Router, Route, Switch } from "wouter"

import CartPage from "./pages/CartPage"
import ErrorPage from "./pages/ErrorPage"
import { OptimizelyProvider } from "@optimizely/react-sdk"
import optimizely from "#utils/optimizely"

import { EmbeddedCapabilities } from "#components/EmbeddedCapabilities"

const user = {
  id: "user123",
  attributes: {
    logged_in: "true",
  },
}

function App(): JSX.Element {
  const basePath =
    import.meta.env.PUBLIC_PROJECT_PATH != null
      ? `/${import.meta.env.PUBLIC_PROJECT_PATH}`
      : undefined

  return (
    <OptimizelyProvider optimizely={optimizely} user={user}>
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
    </OptimizelyProvider>
  )
}

export default App
