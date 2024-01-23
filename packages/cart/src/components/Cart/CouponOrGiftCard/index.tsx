import { FC, useState } from "react"
import { useTranslation } from "react-i18next"

import { CodeForm } from "./CodeForm"
import { CodeRecap } from "./CodeRecap"

export const CouponOrGiftCard: FC = () => {
  return (
    <div className="border-b border-b-gray-100 py-1 mb-5">
      <CodeForm />
      <CodeRecap />
    </div>
  )
}
