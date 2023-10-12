import { CheckoutLink, LineItemsCount } from "@ezcontacts/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { ButtonCheckoutDisabled } from "#components/atoms/ButtonCheckoutDisabled"
import { isEmbedded } from "#utils/isEmbedded"
import { useSettings } from "#components/SettingsProvider"
import { navigate } from "wouter/use-location"
import { getLogedinStatus } from "#utils/getLogedinStatus"
import { saveUserActivitylogData } from "#utils/cllogs"
export const ButtonCheckout: FC = () => {
  const islogged = getLogedinStatus()
  const { settings } = useSettings()
  const { t } = useTranslation()
  const label = t("general.gotToCheckoutCta")

  if (!settings || !settings.isValid) {
    return null
  }

  const onProceedCheckout = async () => {
    let requestBody = {
      requested_method: "onProceedCheckout",
      cl_token: "eyJhbGciOiJIUzUxMiJ9.eyJvcmdhbml6YXRp",
      requested_data: "",
      response_data: "",
    }
    saveUserActivitylogData(requestBody)

    if (Number(islogged) === 1) {
      if (settings.orderId) {
        let paymentToken = await getPaymentToken(settings.orderId)
        window.open(
          `${process.env.REACT_APP_CHECKOUT_URL}/${settings.orderId}?accessToken=${settings.accessToken}&paymentToken=${paymentToken}`,
          "_self"
        )
      }
    } else {
      window.location.href = `${process.env.REACT_APP_PUBLIC_ODOO_PATH}/account/sign-in?cart-login=1`
    }
  }

  const onProceedCheckoutAsGuest = async () => {
    let requestBody = {
      requested_method: "onProceedCheckoutAsGuest",
      cl_token: "eyJhbGciOiJIUzUxMiJ9.eyJvcmdhbml6YXRp",
      requested_data: "",
      response_data: "",
    }
    saveUserActivitylogData(requestBody)
    if (settings.orderId) {
      let paymentToken = await getPaymentToken(settings.orderId)
      window.open(
        `${process.env.REACT_APP_CHECKOUT_URL}/${settings.orderId}?accessToken=${settings.accessToken}&paymentToken=${paymentToken}`,
        "_self"
      )
    }
  }

  const getPaymentToken = (orderId: any) => {
    if (orderId) {
      const requestBody = {
        data: {
          order: {
            id: orderId,
          },
        },
      }
      return fetch(
        `${process.env.REACT_APP_PUBLIC_ODOO_PATH}/cl/order/payment/v1/payment-token`,
        {
          headers: {
            Accept: "application/json",
          },
          method: "POST",
          body: JSON.stringify(requestBody),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          const res = result?.data?.payment_source_token
          return res
        })
        .catch((error) => {
          console.error("Error:", error)
        })
    }
  }

  return (
    <>
      <LineItemsCount>
        {({ quantity }) =>
          quantity ? (
            <>
              {Number(islogged) === 0 ? (
                <div className="flex flex-col space-y-3">
                  <div
                    className="button-checkout cursor-pointer text-center text-white py-2 px-4 rounded"
                    onClick={onProceedCheckout}
                  >
                    {"PROCEED TO CHECKOUT"}
                  </div>

                  <div
                    className="checkout-as-guest text-center cursor-pointer not-italic font-semibold text-xs leading-5 py-2 px-4 uppercase text-gray-700"
                    onClick={onProceedCheckoutAsGuest}
                  >
                    {"CHECKOUT AS GUEST"}
                  </div>
                </div>
              ) : (
                <div>
                  <div
                    className="button-checkout cursor-pointer text-center text-white py-2 px-4 rounded"
                    onClick={onProceedCheckout}
                  >
                    {"PROCEED TO CHECKOUT"}
                  </div>
                </div>
              )}
            </>
          ) : (
            <ButtonCheckoutDisabled />
          )
        }
      </LineItemsCount>
    </>
  )
}
