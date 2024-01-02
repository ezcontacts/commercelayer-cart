import { LineItemsCount } from "@ezcontacts/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ButtonCheckoutDisabled } from "#components/atoms/ButtonCheckoutDisabled"
import { useSettings } from "#components/SettingsProvider"
import { getLogedinStatus, getVisitorId } from "#utils/getLogedinStatus"
import { saveUserActivitylogData } from "#utils/cllogs"
import useLogMetricsData from "#utils/logClMetrics"


export const ButtonCheckout: FC = () => {
  const { logMetrics } = useLogMetricsData()
  const islogged = getLogedinStatus()
  const visitoId = getVisitorId()
  const { settings } = useSettings()
  const { t } = useTranslation()


  if (!settings || !settings.isValid) {
    return null
  }

  const logData = (request: any) => {
    let requestBody = {
      requested_method: request.requested_method,
      cl_token: settings.accessToken,
      requested_data: request.requested_data,
      response_data: request.response_data,
    }
    saveUserActivitylogData(requestBody)
  }

  const onProceedCheckout = async () => {
    logMetrics("proceed_to_checkout")
    if (Number(islogged) === 1) {
      if (settings.orderId) {
        let paymentToken = await getPaymentToken(settings.orderId)
        logData({
          requested_method: "onProceedCheckout",
          requested_data: { "orderId-": settings.orderId },
          response_data: `${process.env.REACT_APP_CHECKOUT_URL}/${settings.orderId}?accessToken=${settings.accessToken}&paymentToken=${paymentToken}&islogged=1&ezref=${visitoId}`,
        })
        window.open(
          `${process.env.REACT_APP_CHECKOUT_URL}/${settings.orderId}?accessToken=${settings.accessToken}&paymentToken=${paymentToken}&islogged=1&ezref=${visitoId}`,
          "_self"
        )
      }
    } else {
      logData({
        requested_method: "onProceedCheckout",
        requested_data: settings.orderId,
        response_data: `${process.env.REACT_APP_PUBLIC_ODOO_PATH}/account/sign-in?cart-login=1`,
      })
      window.location.href = `${process.env.REACT_APP_PUBLIC_ODOO_PATH}/account/sign-in?cart-login=1`
    }
  }

  const onProceedCheckoutAsGuest = async () => {
    logMetrics("proceed_to_checkout")
    if (settings.orderId) {
      localStorage.setItem("checkoutUserEmail", "")
      let paymentToken = await getPaymentToken(settings.orderId)
      logData({
        requested_method: "onProceedCheckoutAsGuest",
        requested_data: { "orderId-": settings.orderId },
        response_data: `${process.env.REACT_APP_CHECKOUT_URL}/${settings.orderId}?accessToken=${settings.accessToken}&paymentToken=${paymentToken}&islogged=0&ezref=${visitoId}`,
      })
      window.open(
        `${process.env.REACT_APP_CHECKOUT_URL}/${settings.orderId}?accessToken=${settings.accessToken}&paymentToken=${paymentToken}&islogged=0&ezref=${visitoId}`,
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
          visitor_id: visitoId || "",
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
