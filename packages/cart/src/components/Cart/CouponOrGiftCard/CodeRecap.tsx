import { useSettings } from "#components/SettingsProvider"
import {
  GiftCardOrCouponCode,
  GiftCardOrCouponRemoveButton,
} from "@ezcontacts/react-components"
import { CodeType } from "@ezcontacts/react-components/lib/esm/reducers/OrderReducer"
import { FC } from "react"
import { useTranslation } from "react-i18next"

const allowedCodeTypes: CodeType[] = ["coupon"]

export const CodeRecap = () => {
  const { t } = useTranslation()

return (
    <div>
      {allowedCodeTypes.map((type) => (
        <GiftCardOrCouponCode key={type} type={type}>
          {({ code }) =>
            code ? (
              <div className="flex justify-between items-center text-sm mb-2 gap-3">
                <div className="select-all" data-test-id={`applied-${type}`}>
                  {code}
                </div>
                <GiftCardOrCouponRemoveButton
                  type={type}
                  className="font-bold text-primary border-b leading-none border-black border-opacity-10 md: transition ease-in duration-200 hover:border-opacity-50 hover:text-primary-dark focus:outline-none"
                  label={t("general.remove")}
                  data-test-id={`button-remove-${type}`}
                />
              </div>
            ) : (
              <div />
            )
          }
        </GiftCardOrCouponCode>
      ))}
    </div>
  )
}
