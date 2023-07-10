import {
  LineItemImage,
  LineItemAmount,
  LineItem,
  LineItemType,
  LineItemsEmpty,
  LineItemField,
  LineItemsCount,
} from "@commercelayer/react-components"
import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { NewButtonRemoveItem } from "./ButtonRemoveItem"
import { LineItemOptions, LineItemOptionsRespone } from "./LineItemOptions"
import { NewQuantitySelector } from "./QuantitySelector"
import { EmptyCartMessage } from "#components/atoms/EmptyCartMessage"
import { useSettings } from "#components/SettingsProvider"
import { LineItemsSkeleton } from "#components/Skeleton/LineItems"
import { isEmbedded } from "#utils/isEmbedded"
import { i } from "vitest/dist/index-5aad25c1"
import {
  CartLineItemOptions,
  LineItemOptionsAtributes,
} from "./CartLineItemOptions"

type Props = {
  listTypes: LineItemType[]
}

export const Summary = ({
  cartItems,
  onSetShowModel,
  onDelete,
  showModal,
  updateItemQuantity,
  isLoading,
}: any) => {
  const { t } = useTranslation()
  const { settings } = useSettings()

  if (!settings || !settings.isValid) {
    return null
  }

  const goContinueShopping = () => {
    window.location.href = `${process.env.REACT_APP_PUBLIC_ODOO_PATH}`
  }

  const ContinueShopping = () => {
    return (
      <div
        onClick={goContinueShopping}
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

  if (isLoading) {

    return <LineItemsSkeleton />
  }



  return (
    <>
      <div className="cart-summary-desktop">
        {cartItems?.length > 0 && (
          <div className="text-lg pb-6 leading-6 text-gray-700">
            <span data-test-id="items-count">
              {" "}
              Shopping Cart ({cartItems?.length})
            </span>
          </div>
        )}
        <div>
          {cartItems.map((item: any) => (
            <div className="gap-5 pb-8 mb-8 border-b border-b-gray-100 space-y-5">
              <div
                className="flex space-x-8 w-full"
                data-test-id={`line-item-${"skus"}`}
              >
                <div className="w-3/6 card-image-container">
                  <img
                    src={item?.item1?.attributes?.image_url}
                    alt={item?.item1?.attributes?.skuDisplayName}
                    className="w-3/4 self-start md:self-center object-contain"
                  />
                </div>
                <div className="w-4/5">
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-1">
                      <div className="flex flex-col">
                        <div>
                          <div className="flex-col">
                            {item?.item1?.attributes?.metadata?.brandName && (
                              <div className="cart-brandname">
                                {item?.item1?.attributes?.metadata?.brandName}
                              </div>
                            )}

                            <div className="font-semibold text-sm leading-5 text-gray-700 opacity-80">
                              {
                                item?.item1?.attributes?.metadata
                                  ?.skuDisplayName
                              }
                            </div>
                            {item?.item1.attributes?.metadata?.frame_size && (
                              <div className="pt-2">
                                <div className="flex gap-1 text-sm">
                                  <div className="font-semibold text-xs leading-5 text-gray-700">
                                    {t("general.size")}:
                                  </div>
                                  <div className="font-normal text-xs leading-5 text-gray-400">
                                    {
                                      item?.item1.attributes?.metadata
                                        ?.frame_size
                                    }
                                  </div>
                                </div>
                              </div>
                            )}
                            {item?.item1?.attributes?.metadata?.color && (
                              <div className="pt-2">
                                <div className="flex gap-1 text-sm">
                                  <div className="font-semibold text-xs leading-5 text-gray-700">
                                    {t("general.color")}:
                                  </div>
                                  <div className="font-normal text-xs leading-5 text-gray-400">
                                    {item?.item1?.attributes?.metadata?.color}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          {Object.keys(item).map((key, index) => (
                            <CartLineItemOptions
                              key={index}
                              cartItem={item[key]}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/5">
                  {Object.keys(item).map((key, index) => (
                    <div className="flex flex-col space-y-6">
                      <div className="flex justify-end">
                        {index === 0 && (
                          <NewButtonRemoveItem
                            onSetShowModel={onSetShowModel}
                            onDelete={onDelete}
                            showModal={showModal}
                            cartItem={item[key]}
                            lineItemId={item[key]?.id}
                          />
                        )}
                      </div>
                      <div key={index}>
                        <div>
                          <div
                            className={`flex pt-2 items-center justify-end space-x-5 mt-auto ${
                              index === 1 ? "pt-6" : ""
                            }`}
                          >
                            <div>
                              <>
                                <NewQuantitySelector
                                  quantity={item[key].attributes?.quantity}
                                  cartItem={item[key]}
                                  updateItemQuantity={updateItemQuantity}
                                />
                              </>
                            </div>

                            <div>
                              <span
                                className="className="
                                font-normal
                                text-sm
                                text-right
                                text-gray-700
                              >
                                {item[key].attributes?.formatted_total_amount}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pl-3">
                {Object.keys(item).map((key, index) => (
                  <LineItemOptionsAtributes key={index} cartItem={item[key]} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="w-40">
          {cartItems?.length > 0 && <ContinueShopping />}
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
        <div>
      {cartItems.length === 0 &&(
        <EmptyCartMessage />
      )}
        </div>
      </div>
    </>
  )
}
