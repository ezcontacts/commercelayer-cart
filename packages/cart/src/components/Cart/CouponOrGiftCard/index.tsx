import { FC, useState } from "react"

import { CodeForm } from "./CodeForm"
import { CodeRecap } from "./CodeRecap"
import { useTranslation } from "react-i18next"

export const CouponOrGiftCard: FC = () => {
  const [couponError, setCouponError] = useState(false)
  const { t } = useTranslation()

  const [isApplyCLicked, setIsApplyCLicked] = useState(false)

  const onSubmitCouponCode = (success: any) => {
    setCouponError(!success)
    if (success) {
      setIsApplyCLicked(true)
    }
    if(!success){
      setTimeout(() => {
        window.location.reload()
      }, 2500)
    }
  }

  const onClickremoveCoupnCode = () => {
    setIsApplyCLicked(false)
  }

  return (
    <div className="border-t border-t-gray-100 border-b border-b-gray-100 py-6 mb-6">
      <CodeForm
        couponError={couponError}
        onSubmitCouponCode={onSubmitCouponCode}
      />
     { !couponError && <CodeRecap
        isApplyCLicked={isApplyCLicked}
        onClickremoveCoupnCode={onClickremoveCoupnCode}
      />}
    </div>
  )
}
