import { useSettings } from "#components/SettingsProvider"
import {
  GiftCardOrCouponCode,
  GiftCardOrCouponRemoveButton,
} from "@commercelayer/react-components"
import { CodeType } from "@commercelayer/react-components/lib/esm/reducers/OrderReducer"
import { FC } from "react"
import { useTranslation } from "react-i18next"

const allowedCodeTypes: CodeType[] = ["coupon"]

export const CodeRecap = ({ isApplyCLicked , onClickremoveCoupnCode}: any) => {
  const { t } = useTranslation()
  const { settings } = useSettings()
  if (!settings || !settings.isValid) {
    return null
  }

  return (
    <div>
      {allowedCodeTypes.map((type) => (
        <GiftCardOrCouponCode key={type} type={type}>
          {({ code, discountAmountCents }) => {


            const removeCoupnCode = () => {
              const headers = {
                Accept: "application/vnd.api+json",
                Authorization: `Bearer ${settings.accessToken}`,
                "Content-Type": "application/vnd.api+json",
              }
              const body = JSON.stringify({
                data: {
                  type: "orders",
                  id: settings?.orderId,
                  attributes: {
                    coupon_code: "",
                  },
                },
              })
              const url = `${process.env.REACT_APP_PUBLIC_CL_URL_PATH}/api/orders/${settings?.orderId}`

              return fetch(url, {
                method: "PATCH",
                headers: headers,
                body: body,
              })
                .then((response) => response.json())
                .then((data) => {
                  setTimeout(() => {
                    window.location.reload()
                  }, 2500)
                  return data
                })
                .catch((error) => {
                  setTimeout(() => {
                    window.location.reload()
                  }, 2500)
                })
            }

            if (isApplyCLicked && discountAmountCents === 0) {
              removeCoupnCode()
            }

            if (code !== null && discountAmountCents !== 0) {
              return (
                <div className="flex justify-between items-center text-sm mb-2 gap-3">
                  <div className="select-all" data-test-id={`applied-${type}`}>
                    {code}
                  </div>
                  <GiftCardOrCouponRemoveButton
                    type={type}
                    className="font-bold text-primary border-b leading-none border-black border-opacity-10 md: transition ease-in duration-200 hover:border-opacity-50 hover:text-primary-dark focus:outline-none"
                    label={t("general.remove")}
                    data-test-id={`button-remove-${type}`}
                    onClick={onClickremoveCoupnCode}
                  />
                </div>
              )
            }
            return (
              <>
                {isApplyCLicked && discountAmountCents === 0 && (
                  <div>
                    <span className="text-xs text-red-400">
                      {t("couponOrGift.error.coupon_code")}
                    </span>
                  </div>
                )}
              </>
            )
          }}
        </GiftCardOrCouponCode>
      ))}
    </div>
  )
}

