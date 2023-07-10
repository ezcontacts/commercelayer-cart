import {
  DiscountAmount,
  GiftCardAmount,
  SubTotalAmount,
  TotalAmount,
  LineItemsCount,
} from "@commercelayer/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ButtonCheckout } from "./ButtonCheckout"
import { CouponOrGiftCard } from "#components/Cart/CouponOrGiftCard"
import { CouponCard } from "../CouponOrGiftCard/CouponCard"

export const Totals = ({
  orderDetails,
  onSubmitCouponCode,
  couponData,
  removeCouponCode
}: any) => {
  const { t } = useTranslation()

  const attributes = orderDetails?.data?.attributes

  if (!attributes || attributes === undefined) {
    return null
  }

  const { formatted_subtotal_amount, formatted_total_amount } = attributes
  const skus_count = attributes?.skus_count
  const couponDiscount = attributes?.discount_amount_cents;
  const appliedcoupon_code = attributes?.coupon_code;

  return (
    <div>
      <div className="pb-4">
        <span className="text-xs font-semibold leading-5 text-gray-700`">
          {"Coupons"}
        </span>
      </div>
      <div>
        <CouponCard
          onSubmitCouponCode={onSubmitCouponCode}
          couponData={couponData}
          removeCouponCode={removeCouponCode}
          couponDiscount={couponDiscount}
          appliedcoupon_code={appliedcoupon_code}
        />
      </div>

      <div className="mt-2 mb-4 divider-line-cart-total-box"></div>

      <div className="pb-4">
        <span className="font-semibold text-sm leading-5 text-gray-700">
          {"Price Details"}
        </span>
        <span className="pl-1 font-normal text-xs leading-5 text-gray-400">
          {"("}
          <span>
            <span data-test-id="items-count">{skus_count}</span>

            <span>{"items"}</span>
          </span>
          {")"}
        </span>
      </div>

      <div className="pb-2 flex items-center justify-between">
        <div className="font-normal text-sm leading-7 text-gray-500">
          Items total
        </div>
        <div className="font-semibold text-sm leading-7 text-gray-500">
          <span
            data-amount={formatted_subtotal_amount}
            data-test-id="subtotal-amount"
          >
            {formatted_total_amount}
          </span>
        </div>
      </div>
      <div className="pb-2">
        <GiftCardAmount>
          {({ priceCents, price }) =>
            priceCents ? (
              <div className="text-black mb-2 flex justify-between">
                <div className="text-gray-500">{t("general.giftCard")}</div>
                <div
                  className="font-semibold"
                  data-test-id="gift-card-amount"
                  data-amount={priceCents}
                >
                  {price}
                </div>
              </div>
            ) : (
              <div />
            )
          }
        </GiftCardAmount>
      </div>
      <div>
        {couponDiscount !==0 && (
          <div className="pb-2 flex items-center justify-between">
            <div className="font-normal text-sm leading-7 text-gray-500">
              Coupon Discount
            </div>
            <div className="font-normal text-sm leading-7 text-gray-500">
              <div className="text-black mb-2 flex justify-between">
                <div
                  className="font-semibold"
                  data-test-id="discount-amount"
                  data-amount={couponDiscount}
                >
                 {"$"} {couponDiscount}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-2 mb-2 divider-line-cart-total-box"></div>
      <div className="pb-4 pt-4 flex items-center justify-between">
        <div className="font-semibold text-sm leading-5">Subtotal</div>

        <div className="font-semibold text-sm leading-5">
          <span
            data-test-id="total-amount"
            data-amount={formatted_subtotal_amount}
          >
            {formatted_subtotal_amount}
          </span>
        </div>
      </div>

      <ButtonCheckout />
      <div className="text-center pt-2 pb-5">
        <span className="font-normal text-xs leading-5 text-center text-gray-600">
          {"if applicable, shipping costs will be calculated at checkout"}
        </span>
      </div>
    </div>
  )
}
