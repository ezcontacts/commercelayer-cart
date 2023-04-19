import {
  LineItemImage,
  LineItemAmount,
  LineItem,
  LineItemType,
  LineItemsEmpty,
  LineItemField,
  LineItemsCount,
} from "@commercelayer/react-components"
import { FC } from "react"
import { useTranslation } from "react-i18next"

import { ButtonRemoveItem } from "./ButtonRemoveItem"
import { LineItemOptions } from "./LineItemOptions"
import { QuantitySelector } from "./QuantitySelector"

import { EmptyCartMessage } from "#components/atoms/EmptyCartMessage"
import { useSettings } from "#components/SettingsProvider"
import { LineItemsSkeleton } from "#components/Skeleton/LineItems"
import { isEmbedded } from "#utils/isEmbedded"

type Props = {
  listTypes: LineItemType[]
}

export const Summary: FC<Props> = ({ listTypes }) => {
  const { t } = useTranslation()
  const { settings } = useSettings()

  const GetPowerLenseProperties = () => {
    return (
      <div className="pt-2">
        <div className="flex items-center space-x-8">
          <div>
            <span className="font-normal text-xs leading-5 text-gray-400">
              {"Right Eye (OD)"}
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <div>
                <span className="font-normal text-xs leading-5 text-gray-700">
                  {"Power:"}
                </span>
                <span className="pl-2 font-normal text-xs leading-5 text-gray-400">
                  {"-5.00"}
                </span>
              </div>
              <div>
                <span className="font-normal text-xs leading-5 text-gray-700">
                  {"BC:"}
                </span>
                <span className="pl-2 font-normal text-xs leading-5 text-gray-400">
                  {"8.7"}
                </span>
              </div>
              <div>
                <span className="font-normal text-xs leading-5 text-gray-700">
                  {" "}
                  {" DIAMETER"}
                </span>
                <span className="pl-2 font-normal text-xs leading-5 text-gray-400">
                  {"14.0"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-8">
          <div>
            <span className="font-normal text-xs leading-5 text-gray-400">
              {"Left Eye (OD)"}
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <div>
                <span className="font-normal text-xs leading-5 text-gray-700">
                  {"Power:"}
                </span>
                <span className="pl-2 font-normal text-xs leading-5 text-gray-400">
                  {"-5.00"}
                </span>
              </div>
              <div>
                <span className="font-normal text-xs leading-5 text-gray-700">
                  {"BC:"}
                </span>
                <span className="pl-2 font-normal text-xs leading-5 text-gray-400">
                  {"8.7"}
                </span>
              </div>
              <div>
                <span className="font-normal text-xs leading-5 text-gray-700">
                  {" "}
                  {" DIAMETER"}
                </span>
                <span className="pl-2 font-normal text-xs leading-5 text-gray-400">
                  {"14.0"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="text-lg pb-6 leading-6 text-gray-700">
        <LineItemsCount>
          {({ quantity }) =>
            quantity ? (
              <span data-test-id="items-count">
                {" "}
                Shopping Cart( {quantity} )
              </span>
            ) : (
              <div />
            )
          }
        </LineItemsCount>
      </div>

      {listTypes.map((type) => (
        <LineItem key={type} type={type}>
          <div
            className="flex gap-5 pb-8 mb-8 border-b border-b-gray-100"
            data-test-id={`line-item-${type}`}
          >
            <div className="w-1/4 card-image-container">
              <LineItemImage className="w-1/2 self-start md:self-center object-contain" />
            </div>
            <div className="flex-1 flex flex-col min-h-[150px]">
              <div className="flex justify-between items-center gap-1">
                <LineItemField attribute="metadata" tagElement="div">
                  {({ attributeValue }: any) => {
                    return (
                      <div className="flex-col">
                        <div className="font-normal text-sm leading-5 text-gray-700">
                          {attributeValue?.skuDisplayName}
                        </div>
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
                      </div>
                    )
                  }}
                </LineItemField>

                <ButtonRemoveItem />
              </div>

              <LineItemOptions />

              {/* <div className="pt-2">
                <div className="flex gap-1 text-sm">
                  <div className="text-gray-400 font-semibold">
                    {t("general.price")}:
                  </div>
                  <LineItemAmount type="unit" />
                </div>
              </div> */}

              {/* <div className="flex justify-between items-center mt-auto">
                {type === "gift_cards" ? <div /> : <QuantitySelector />}
                <LineItemAmount className="font-normal text-sm text-right text-gray-700" />
              </div> */}
              <div className="flex pt-2 items-center justify-end space-x-5 mt-auto">
                <div>
                  {type === "gift_cards" ? <div /> : <QuantitySelector />}
                </div>
                <div>
                  <LineItemAmount className="font-normal text-sm text-right text-gray-700" />
                </div>
              </div>
            </div>
          </div>
        </LineItem>
      ))}

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
