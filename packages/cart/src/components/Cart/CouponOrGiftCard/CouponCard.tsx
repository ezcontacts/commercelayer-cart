import { useSettings } from "#components/SettingsProvider"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export const CouponCard = ({ onSubmitCouponCode, couponData , removeCouponCode, couponDiscount, appliedcoupon_code}: any) => {
  const { t } = useTranslation()
  const { settings } = useSettings()
  if (!settings || !settings.isValid) {
    return null
  }

  const [couponCode, setCouponCode] = useState("")

  const [isApplyCLicked, setisApplyCLicked] = useState(false)

  const onApplyCoupnCode = async () => {
    setisApplyCLicked(true)
    onSubmitCouponCode(
      settings.orderId,
      couponCode,
      settings.accessToken,
      "apply"
    )
  }

  const onClearCouponCode = () => {
    setCouponCode("")
    setisApplyCLicked(false)
    onSubmitCouponCode(
      settings.orderId,
      couponCode,
      settings.accessToken,
      "clear"
    )
  }
  const onChangeCouponCode = (e: any) => {
    setCouponCode(e.target.value)
    if (e.target.value === "") {
      setisApplyCLicked(false)
    }
  }

  const onRemoveCouponCode = () => {
     removeCouponCode();
  }

  return (
    <div>
      <div className="flex w-full items-center justify-between jus pt-1 pb-2">
        <div className="flex items-center space-x-2">
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.5 12.5C19.5 11.12 20.62 10 22 10V9C22 5 21 4 17 4L7 4C3 4 2 5 2 9V9.5C3.38 9.5 4.5 10.62 4.5 12C4.5 13.38 3.38 14.5 2 14.5V15C2 19 3 20 7 20H17C21 20 22 19 22 15C20.62 15 19.5 13.88 19.5 12.5Z"
                stroke="#4D4D4D"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 14.75L15 8.75"
                stroke="#4D4D4D"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.9945 14.75H15.0035"
                stroke="#292D32"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.99451 9.25H9.00349"
                stroke="#292D32"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <input
              type="text"
              id="code-input"
              className="text-input-background leading-3 text-sm font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={"Enter promo code"}
              value={couponCode}
              onChange={onChangeCouponCode}
            />
          </div>
        </div>
        {!isApplyCLicked && (
          <div className="flex-end" onClick={onApplyCoupnCode}>
            <span className="text-color font-semibold text-xs leading-5 uppercase cursor-pointer">
              APPLY
            </span>
          </div>
        )}
        {isApplyCLicked && (
          <div className="flex-end" onClick={onClearCouponCode}>
            <span className="text-color font-semibold text-xs leading-5 uppercase cursor-pointer">
              CLEAR
            </span>
          </div>
        )}
      </div>
      {couponData?.hasError && (
        <div>
          <span className="text-xs text-red-400">
            {t(couponData?.errorMessage)}
          </span>
        </div>
      )}
     {couponDiscount !==0 && appliedcoupon_code && (
        <div className="flex justify-between">
          <div font-bold text-xs leading-5 cursor-pointer>{appliedcoupon_code}</div>
          <div>
            <div className="flex-end cursor-pointer">
              <button
                type="button"
                onClick={onRemoveCouponCode}
                className="text-color font-semibold text-xs leading-5 uppercase cursor-pointer underline"
                data-test-id="button-remove-coupon"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
