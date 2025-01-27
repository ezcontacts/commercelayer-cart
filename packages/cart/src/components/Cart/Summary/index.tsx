import {
  LineItemImage,
  LineItemAmount,
  LineItem,
  LineItemsEmpty,
  LineItemField,
  LineItemsCount,
  LineItemQuantity,
  Errors,
} from "@ezcontacts/react-components"
import { FC, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { LiaTimesSolid } from "react-icons/lia"

import { ButtonRemoveItem } from "./ButtonRemoveItem"
import {
  LineItemOptions,
  LineItemOptionsAtributes,
  LineItemOptionsRespone,
  GetLineOptionPowerAttribute,
} from "./LineItemOptions"
import { QuantitySelector } from "./QuantitySelector"

import { EmptyCartMessage } from "#components/atoms/EmptyCartMessage"
import { useSettings } from "#components/SettingsProvider"
import { LineItemsSkeleton } from "#components/Skeleton/LineItems"
import { saveUserActivitylogData } from "#utils/cllogs"
import { isEmbedded } from "#utils/isEmbedded"
export type LineItemType =
  | "gift_cards"
  | "payment_methods"
  | "promotions"
  | "shipments"
  | "skus"
  | "bundles"
  | "adjustments"

type Props = {
  listTypes: LineItemType[]
}
export const Summary: FC<Props> = ({ listTypes }) => {
  const { settings } = useSettings()
  if (!settings || !settings.isValid) {
    return null
  }
  const { t } = useTranslation()
  useEffect(() => {
    const requestBody = {
      requested_method: "View Cart",
      cl_token: settings.accessToken,
      requested_data: { "orderId-": settings.orderId },
      response_data: "OK",
    }
    saveUserActivitylogData(requestBody)
  }, [])

  const goContinueShopping = (product_url: string) => {
    const baseUrl = process.env.REACT_APP_PUBLIC_ODOO_PATH
    if (product_url) {
      const fullUrl = `${baseUrl}${product_url}`
      window.open(fullUrl, "_blank")
    } else {
      window.open(baseUrl, "_blank")
    }
  }

  const messages: Parameters<typeof Errors>[0]["messages"] = [
    {
      code: "VALIDATION_ERROR",
      resource: "line_items",
      field: "quantity",
      message: `Out of stock`,
    },
  ]

  const ContinueShoppingToHome = () => {
    return (
      <div
        onClick={() => goContinueShopping("")}
        className="flex items-center space-x-1 cursor-pointer"
      >
        <div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19.92L8.48 13.4C7.71 12.63 7.71 11.37 8.48 10.6L15 4.07996"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="font-normal text-sm leading-5 text-gray-400 cursor-pointer hover:text-gray-700">
          {"Continue shopping"}
        </div>
      </div>
    )
  }

  const ShoppingHeaderCart = (
    <div className="text-lg pb-6 leading-6 text-gray-700 flex items-center justify-between">
      <LineItemsCount>
        {({ quantity }) =>
          quantity ? (
            <span data-test-id="items-count"> Shopping Cart ({quantity})</span>
          ) : (
            <div></div>
          )
        }
      </LineItemsCount>
      {/* <div className="cart-summary-mobile" onClick={goContinueShopping}>
        <LiaTimesSolid />
      </div> */}
    </div>
  )

  const SelectQuantity = ({ type }: any) => {
    return (
      <div className="flex pt-2 items-center justify-between space-x-5 mt-auto">
        <div>{type === "gift_cards" ? <div /> : <QuantitySelector />}</div>
        <div>
          <LineItemAmount className="font-semibold text-sm text-right text-gray-700" />
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="cart-summary-mobile">
        {ShoppingHeaderCart}
        {listTypes.map((type) => (
          <LineItem key={type} type={type}>
            <div className="gap-5 pb-8 mb-8 border-b border-b-gray-100 space-y-2">
              <div
                className="flex space-x-4"
                data-test-id={`line-item-${type}`}
              >
                <div style={{ width: "16%" }}>
                  <div className="card-image-container">
                    <LineItemImage className="self-start md:self-center object-contain" />
                  </div>
                </div>
                <div style={{ width: "84%" }}>
                  <LineItemField attribute="metadata" tagElement="div">
                    {({ attributeValue }: any) => {
                      return (
                        <div className="flex-col">
                          <div className="flex justify-between">
                            <div>
                              {attributeValue?.brandName && (
                                <div className="cart-brandname">
                                  {attributeValue?.brandName}
                                </div>
                              )}

                              <div className="font-semibold text-sm leading-5 text-gray-700 opacity-80">
                                {attributeValue?.skuDisplayName}
                              </div>
                            </div>
                            <div className="flex flex-col space-y-16">
                              <div>
                                <ButtonRemoveItem
                                  metadataitem={attributeValue}
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            {attributeValue?.frame_size && (
                              <div className="pt-2">
                                <div className="flex gap-1 text-sm">
                                  <div className="font-semibold text-xs leading-5 text-gray-700">
                                    {t("general.size")}:
                                  </div>
                                  <div className="font-normal text-xs leading-5 text-gray-400">
                                    {attributeValue?.frame_size}
                                  </div>
                                </div>
                              </div>
                            )}
                            {attributeValue?.color && (
                              <div className="pt-2">
                                <div className="flex gap-1 text-sm">
                                  <div className="font-semibold text-xs leading-5 text-gray-700">
                                    {t("general.color")}:
                                  </div>
                                  <div className="font-normal text-xs leading-5 text-gray-400 w-60 truncate ">
                                    {attributeValue?.color}
                                  </div>
                                </div>
                              </div>
                            )}
                            <div className="pl-3 pt-3">
                              <LineItemOptionsAtributes />
                            </div>
                            <LineItemOptions LineItem={attributeValue} />
                          </div>
                        </div>
                      )
                    }}
                  </LineItemField>
                </div>
              </div>
              <div className="flex space-x-8">
                <div style={{ width: "20%" }}></div>
                <div style={{ width: "80%" }}>
                  <LineItemOptionsRespone />
                </div>
              </div>
              <div className="flex">
                <div style={{ width: "20%" }}></div>
                <div style={{ width: "80%" }}>
                  <SelectQuantity />
                </div>
              </div>
            </div>
          </LineItem>
        ))}
      </div>
      <div className="cart-summary-desktop">
        {ShoppingHeaderCart}
        {listTypes.map((type) => (
          <LineItem key={type} type={type}>
            <LineItemField attribute="metadata" tagElement="div">
              {({ attributeValue }: any) => {
                return (
                  <div className="gap-5 pb-8 mb-8 border-b border-b-gray-100 space-y-5">
                    <div
                      className="flex space-x-5 w-full"
                      data-test-id={`line-item-${type}`}
                    >
                      <div className="w-3/6 card-image-container">
                        <LineItemImage className="w-3/4 self-start md:self-center object-contain" />
                      </div>
                      <div className="w-5/5 flex-1">
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start gap-1">
                            <LineItemField
                              attribute="metadata"
                              tagElement="div"
                            >
                              {({ attributeValue }: any) => {
                                return (
                                  <div className="flex flex-col">
                                    <div>
                                      <div className="flex-col">
                                        {attributeValue?.brandName && (
                                          <div className="cart-brandname">
                                            {attributeValue?.brandName}
                                          </div>
                                        )}

                                        <div
                                          onClick={() =>
                                            goContinueShopping(
                                              attributeValue?.product_url
                                            )
                                          }
                                          className="font-semibold cursor-pointer text-sm leading-5 text-gray-700"
                                        >
                                          {attributeValue?.skuDisplayName}
                                        </div>
                                        {attributeValue?.frame_size && (
                                          <div className="pt-2">
                                            <div className="flex gap-1 text-sm">
                                              <div className="font-semibold text-xs leading-5 text-gray-700">
                                                {t("general.size")}:
                                              </div>
                                              <div className="font-normal text-xs leading-5 text-gray-400">
                                                {attributeValue?.frame_size}
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                        {attributeValue?.color && (
                                          <div className="pt-2">
                                            <div className="flex gap-1 text-sm">
                                              <div className="font-semibold text-xs leading-5 text-gray-700">
                                                {t("general.color")}:
                                              </div>
                                              <div className="font-normal text-xs leading-5 text-gray-400">
                                                {attributeValue?.color}
                                              </div>
                                            </div>
                                          </div>
                                        )}

                                        {attributeValue?.productType ===
                                          "EYEGLASSES - READERS" &&
                                          attributeValue?.external_price_type ===
                                            "READERS" && (
                                            <div className="pt-2">
                                              <div className="flex gap-1 text-sm">
                                                <div className="font-semibold text-xs leading-5 text-gray-700">
                                                  {"Power"}:
                                                </div>
                                                <div className="font-normal text-xs leading-5 text-gray-400">
                                                  <GetLineOptionPowerAttribute />
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                    <div>
                                      <LineItemOptions
                                        LineItem={attributeValue}
                                      />
                                    </div>
                                  </div>
                                )
                              }}
                            </LineItemField>
                          </div>
                        </div>
                      </div>
                      <div className="w-3/3">
                        <div className="flex flex-col space-y-6">
                          <div className="flex justify-end">
                            <ButtonRemoveItem metadataitem={attributeValue} />
                          </div>
                          <div>
                            <div className="flex pt-2 items-center justify-end space-x-5 mt-auto">
                              <div>
                                <LineItemField
                                  attribute="metadata"
                                  tagElement="div"
                                >
                                  {({ attributeValue }: any) => {
                                    return (
                                      <>
                                        {attributeValue?.is_rx ? (
                                          <>
                                            <LineItemQuantity>
                                              {({ quantity }) => (
                                                <div className="flex items-center space-x-2 font-normal text-sm text-right text-gray-700">
                                                  <div>{"Qty: "}</div>{" "}
                                                  <div>{quantity}</div>
                                                </div>
                                              )}
                                            </LineItemQuantity>
                                          </>
                                        ) : (
                                          <QuantitySelector />
                                        )}
                                      </>
                                    )
                                  }}
                                </LineItemField>
                              </div>

                              <div>
                                <LineItemAmount className="font-normal text-sm text-right text-gray-700" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex pt-1 pb-1">
                          <LineItemQuantity>
                            {({ quantity }) => (
                              <Errors
                                className="text-xs text-red-400 error-message-text"
                                resource="line_items"
                                field="quantity"
                                messages={[
                                  {
                                    code: "VALIDATION_ERROR",
                                    resource: "line_items",
                                    field: "quantity",
                                    message: `Only ${quantity} ${
                                      attributeValue?.skuDisplayName
                                        ? attributeValue?.skuDisplayName
                                        : ""
                                    } ${
                                      attributeValue?.color
                                        ? attributeValue?.color
                                        : ""
                                    } ${
                                      attributeValue?.frame_size
                                        ? attributeValue?.frame_size
                                        : ""
                                    } is available to order`,
                                  },
                                ]}
                              />
                            )}
                          </LineItemQuantity>
                        </div>
                      </div>
                    </div>
                    <div className="pl-3">
                      <LineItemOptionsAtributes />
                    </div>
                  </div>
                )
              }}
            </LineItemField>
          </LineItem>
        ))}
      </div>
      {/* Empty cart */}
      <LineItemsEmpty>
        {({ quantity }) => {
          if (quantity === undefined) {
            return <LineItemsSkeleton />
          }

          if (quantity === 0) {
            return <EmptyCartMessage />
          }
          return <div />
        }}
      </LineItemsEmpty>

      <div className="w-40">
        <ContinueShoppingToHome />
      </div>

      {/* Return Url */}
      {settings.isValid && settings.returnUrl ? (
        <div className="pt-2 pb-8">
          <a
            data-test-id="return-url"
            href={settings.returnUrl}
            className="link-base text-xs font-bold"
            target={isEmbedded() ? "_top" : undefined}
          >
            &lt; {t("general.returnUrlLabel")}
          </a>
        </div>
      ) : null}
    </>
  )
}
