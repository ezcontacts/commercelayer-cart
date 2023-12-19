import { HelmetProvider } from "react-helmet-async"
import { Router, Route, Switch } from "wouter"
import { useLocation } from 'wouter';
import CartPage from "./pages/CartPage"
import ErrorPage from "./pages/ErrorPage"
import { OptimizelyProvider } from "@optimizely/react-sdk"
import optimizely from "#utils/optimizely"

import { EmbeddedCapabilities } from "#components/EmbeddedCapabilities"

optimizely.setUser({
  id: 'user123',
  attributes: {
    device: 'iPhone',
    lifetime: 24738388,
    is_logged_in: true,
  }
});

function App(): JSX.Element {
const [location] = useLocation();
const orderId = location.split('/').pop();
console.log(orderId);
  const basePath =
    import.meta.env.PUBLIC_PROJECT_PATH != null
      ? `/${import.meta.env.PUBLIC_PROJECT_PATH}`
      : undefined

  return (
    <OptimizelyProvider optimizely={optimizely}>
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
