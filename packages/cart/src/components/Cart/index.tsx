import {
  CommerceLayer,
  LineItemsContainer,
  LineItemsCount,
  OrderContainer,
} from "@ezcontacts/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Totals } from "./Totals"
import { Summary } from "#components/Cart/Summary"
import { EmbeddedCapabilities } from "#components/EmbeddedCapabilities"
import { PageHeader } from "#components/PageHeader"
import { PageLayout } from "#components/PageLayout"
import { useSettings } from "#components/SettingsProvider"
import PageFooter from "#components/PageFooter"

const Cart: FC = () => {
  const { settings } = useSettings()
  const { t } = useTranslation()

  if (!settings || !settings.isValid) {
    return null
  }
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
        fetchOrder={() => {
          // send update event to parent iframe if iframe-resizer is enabled
          window.parentIFrame?.sendMessage({ type: "update" }, "*")
        }}
      >
        <EmbeddedCapabilities.OrderRefresher />
        <LineItemsContainer>
          <PageLayout
            top={
              <PageHeader>

              </PageHeader>
            }
            main={<Summary listTypes={["bundles", "skus", "gift_cards"]} />}
            aside={<Totals />}
            bottom={<PageFooter/>}
          />
        </LineItemsContainer>
      </OrderContainer>
    </CommerceLayer>
  )
}

export default Cart
