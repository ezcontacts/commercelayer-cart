import {
  CommerceLayer,
  LineItemsContainer,
  OrderContainer,
} from "@ezcontacts/react-components"
import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Totals } from "./Totals"
import { Summary } from "#components/Cart/Summary"
import { EmbeddedCapabilities } from "#components/EmbeddedCapabilities"
import { PageHeader } from "#components/PageHeader"
import { PageLayout } from "#components/PageLayout"
import { useSettings } from "#components/SettingsProvider"
import PageFooter from "#components/PageFooter"
import { s } from "vitest/dist/index-5aad25c1"

const Cart: FC = () => {
  const [userEmail, setuserEmail] = useState("")
  const [orderData, setOrder] = useState({}) as any
  const { settings } = useSettings()
  const { t } = useTranslation()

  if (!settings || !settings.isValid) {
    return null
  }

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        const userIP = data.ip
        localStorage.setItem("IP", userIP)
      })
      .catch((error) => console.error("Error fetching user IP:", error))
  }, [])

  return (
    <CommerceLayer
      accessToken={settings.accessToken}
      endpoint={settings.endpoint}
    >
      <OrderContainer
        orderId={settings.orderId}
        attributes={{
          cart_url: settings.cartUrl || window.location.href,
        }}
        fetchOrder={(res) => {
          setOrder(res)
          if (res.customer_email) {
            setuserEmail(res.customer_email)
          }
          window.parentIFrame?.sendMessage({ type: "update" }, "*")
        }}
      >
        <EmbeddedCapabilities.OrderRefresher />
        <LineItemsContainer>
          <PageLayout
            top={<PageHeader userEmail={userEmail}></PageHeader>}
            main={<Summary listTypes={["bundles", "skus", "gift_cards"]} />}
            aside={<Totals orderData={orderData} />}
            bottom={<PageFooter />}
          />
        </LineItemsContainer>
      </OrderContainer>
    </CommerceLayer>
  )
}

export default Cart
