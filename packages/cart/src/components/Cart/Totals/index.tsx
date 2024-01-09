import {
  DiscountAmount,
  GiftCardAmount,
  SubTotalAmount,
  TotalAmount,
  LineItemsCount,
  LineItemsEmpty,
  LineItem,
} from "@ezcontacts/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ButtonCheckout } from "./ButtonCheckout"
import { CouponOrGiftCard } from "#components/Cart/CouponOrGiftCard"
import { SideSkeleton } from "#components/Skeleton"

type Props = {
  orderData: any
}

export const Totals: FC<Props> = ({ orderData }: any) => {
  const formatted_discount_amount = orderData?.formatted_discount_amount
  const discount = parseFloat(formatted_discount_amount?.replace("$", ""))
  const { t } = useTranslation()
  return (
    <div>
      <LineItemsEmpty>
        {(props) => {
          if (props.quantity > 0) {
            return (
              <>
                <div className="pb-4">
                  <span className="text-xs font-semibold leading-5 text-gray-700`">
                    {"Coupons"}
                  </span>
                </div>
                <div>
                  <CouponOrGiftCard />
                </div>

                <div className="pb-4">
                  <span className="font-semibold text-sm leading-5 text-gray-700">
                    {"Price Details"}
                  </span>
                  <span className="pl-1 font-normal text-xs leading-5 text-gray-400">
                    {"("}
                    <span>
                      <LineItemsCount>
                        {({ quantity }) =>
                          quantity ? (
                            <span data-test-id="items-count">{quantity}</span>
                          ) : (
                            <div />
                          )
                        }
                      </LineItemsCount>{" "}
                      <span>{"items"}</span>
                    </span>
                    {")"}
                  </span>
                </div>

                <div className="pb-2 flex items-center justify-between">
                  <div className="font-normal text-sm leading-7 text-gray-500">
                    Items total
                  </div>
                  <div className="font-normal text-sm leading-7 text-gray-500">
                    <SubTotalAmount>
                      {({ priceCents, price }) => (
                        <span
                          data-amount={priceCents}
                          data-test-id="subtotal-amount"
                        >
                          {price}
                        </span>
                      )}
                    </SubTotalAmount>
                  </div>
                </div>
                <div className="pb-2">
                  <GiftCardAmount>
                    {({ priceCents, price }) =>
                      priceCents ? (
                        <div className="text-black mb-2 flex justify-between">
                          <div className="text-gray-500">
                            {t("general.giftCard")}
                          </div>
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
                  <DiscountAmount>
                    {({ priceCents, price }) =>
                      priceCents ? (
                        <div className="pb-2 flex items-center justify-between">
                          <div className="font-normal text-sm leading-7 text-gray-500">
                            Coupon Discount
                          </div>
                          <div className="font-normal text-sm leading-7 text-gray-500">
                            <div className="text-black mb-2 flex justify-between">
                              <div
                                className="font-semibold"
                                data-test-id="discount-amount"
                                data-amount={priceCents}
                              >
                                {price}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div />
                      )
                    }
                  </DiscountAmount>
                </div>
                <div className="mt-2 mb-4 divider-line-cart"></div>
                <div className="pb-4 pt-4 flex items-center justify-between">
                  <div className="font-semibold text-sm leading-5">
                    Subtotal
                  </div>

                  <div className="font-normal text-sm leading-5">
                    {discount !== 0 ? (
                      <SubTotalAmount>
                        {(props) => {
                          if (props.price === undefined) return <div />
                          const price = parseFloat(
                            props?.price?.replace("$", "")
                          )
                          const totalPrice = price + discount
                          console.log(price + discount)
                          console.log("totalPrice", totalPrice)
                          return (
                            <span
                              data-test-id="total-amount"
                              data-amount={props.priceCents}
                            >
                              {totalPrice}
                            </span>
                          )
                        }}
                      </SubTotalAmount>
                    ) : (
                      <SubTotalAmount>
                        {(props) => {
                          return (
                            <span
                              data-test-id="total-amount"
                              data-amount={props.priceCents}
                            >
                              {props.price}
                            </span>
                          )
                        }}
                      </SubTotalAmount>
                    )}
                  </div>
                </div>
                <ButtonCheckout />
                <div className="text-center pt-2 pb-5">
                  <span className="font-normal text-xs leading-5 text-center text-gray-600">
                    {
                      "if applicable, shipping costs will be calculated at checkout"
                    }
                  </span>
                </div>
              </>
            )
          } else if (props.quantity === undefined) {
            return <SideSkeleton />
          } else return <div />
        }}
      </LineItemsEmpty>
    </div>
  )
}
