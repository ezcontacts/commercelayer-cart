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

const Cart: FC = () => {
  const [userEmail, setuserEmail] = useState("")
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
    accessToken={"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJkWGttWkZhb1FSIiwic2x1ZyI6ImV6LWNvbnRhY3RzIiwiZW50ZXJwcmlzZSI6dHJ1ZX0sIm93bmVyIjp7ImlkIjoia2J3eWhKYW15ZyIsInR5cGUiOiJDdXN0b21lciJ9LCJhcHBsaWNhdGlvbiI6eyJpZCI6IiIsImtpbmQiOiJzYWxlc19jaGFubmVsIiwicHVibGljIjp0cnVlfSwibWFya2V0Ijp7ImlkIjpbIkJseHJKaHdZZWoiXSwicHJpY2VfbGlzdF9pZCI6IllsRUdtQ3hBTkIiLCJzdG9ja19sb2NhdGlvbl9pZHMiOlsiQm5EUWd1RXFvRyIsIkVuQUx4dWRYTE0iLCJnbldvbXVwanFuIiwicWtQYmV1clpLbiIsIlJNTEJ6dWJnT0ciLCJ2TVF3anVvandHIl19LCJleHAiOjE3MDI2NDg3ODgsInJhbmQiOjAuOTIsInRlc3QiOnRydWV9.VhvvFW8Fp7P12KWvdlGS6SMl66SNjQENpAlhBpkuUjJIDN7uW0cTXE_U7-zhn5AglMeoqheddqTgkgrlYS0H9w"}
      endpoint={settings.endpoint}
    >
      <OrderContainer
        orderId={"EBrhvGYjJz"}
        attributes={{
          cart_url: settings.cartUrl || window.location.href,
        }}
        fetchOrder={(res) => {
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
            aside={<Totals />}
            bottom={<PageFooter />}
          />
        </LineItemsContainer>
      </OrderContainer>
    </CommerceLayer>
  )
}

export default Cart
