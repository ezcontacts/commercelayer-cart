import { Errors, LineItemQuantity } from "@ezcontacts/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { InputSpinner } from "#components/atoms/InputSpinner"

type Props = {
  readonly?: boolean
}

export const QuantitySelector: FC<Props> = () => {
  const { t } = useTranslation()

  return (
    <div className="relative w-full">
      <LineItemQuantity>
        {({ quantity, handleChange }) => (
          <InputSpinner
            data-test-id="quantity-selector"
            quantity={quantity}
            handleChange={handleChange}
            debounceMs={600}
          />
        )}
      </LineItemQuantity>
    </div>
  )
}
