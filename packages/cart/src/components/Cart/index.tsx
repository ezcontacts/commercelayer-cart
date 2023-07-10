import {
  CommerceLayer,
  LineItemsContainer,
  LineItemsCount,
  OrderContainer,
} from "@commercelayer/react-components"
import { FC, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Totals } from "./Totals"
import { Summary } from "#components/Cart/Summary"
import { EmbeddedCapabilities } from "#components/EmbeddedCapabilities"
import { PageHeader } from "#components/PageHeader"
import { PageLayout } from "#components/PageLayout"
import { useSettings } from "#components/SettingsProvider"

const Cart: FC = () => {
  const { settings } = useSettings()
  const { t } = useTranslation()

  if (!settings || !settings.isValid) {
    return null
  }
  const [isLoading, setisLoading] = useState(false)
  const [showModal, setShowModal] = useState({
    value: "",
    isShowModal: false,
  })
  const [cartItems, seCartItems] = useState([] as any)
  const [orderDetails, setOrderDetails] = useState({} as any)
  const [couponData, setcouponData] = useState({
    hasError: false,
    data: {},
    errorMessage: "",
  })

  useEffect(() => {
    setisLoading(true)
    setOrderData()
  }, [])

  const setOrderData = async () => {
    getOrderDetails().then((data) => {
      setisLoading(false)
      if (data) {
        setOrderDetails(data)
        const lineItems = data?.included?.filter(
          (obj: any) =>
            obj?.type === "line_items" && obj?.attributes?.item_type === "skus"
        )
        const lineItemOptions = data?.included?.filter(
          (obj: any) => obj.type === "line_item_options"
        )

        let mergedLiineItems = lineItems?.map((lineItem: any) => {
          const lineItemOptionsData =
            lineItem?.relationships?.line_item_options?.data || []
          const options = lineItemOptionsData.map((optionData: any) => {
            return lineItemOptions?.find(
              (option: any) => option.id === optionData.id
            )
          })

          return {
            ...lineItem,
            line_item_options: options,
          }
        })

        let mergedLineItems = []
        let mergedLineItemObject = {} as any

        mergedLiineItems?.forEach((obj: any) => {
          if (!mergedLineItemObject[obj.attributes?.metadata?.skuDisplayName]) {
            mergedLineItemObject[obj?.attributes?.metadata?.skuDisplayName] = {}
          }
          const itemKey = `item${
            Object.keys(
              mergedLineItemObject[obj?.attributes?.metadata?.skuDisplayName]
            ).length + 1
          }`
          mergedLineItemObject[obj?.attributes?.metadata?.skuDisplayName][
            itemKey
          ] = obj
        })

        mergedLineItems = Object.values(mergedLineItemObject)
        seCartItems(mergedLineItems)
      }
    })
  }

  const getOrderDetails = async () => {
    const url = `${process.env.REACT_APP_PUBLIC_CL_URL_PATH}/api/orders/${settings.orderId}?include=line_items.item,line_items.line_item_options.sku_option`
    return await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${settings.accessToken}`,
        "Content-Type": "application/vnd.api+json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }

  const onDelete = (obj: any) => {
    const identifiedLineItems = cartItems.find(
      (item: any) => item.item1.id === obj?.value
    )
    Object.keys(identifiedLineItems)?.forEach((key) => {
      let returnLineItemId = identifiedLineItems?.[key]?.id
      if (returnLineItemId) {
        fetch(
          `${process.env.REACT_APP_PUBLIC_CL_URL_PATH}/api/line_items/${returnLineItemId}`,
          {
            method: "DELETE",
            headers: {
              Accept: "application/vnd.api+json",
              Authorization: `Bearer ${settings.accessToken}`,
              "Content-Type": "application/vnd.api+json",
            },
          }
        )
          .then(() => {
            setShowModal({
              ...showModal,
              value: "",
              isShowModal: false,
            })
            setOrderData()
            return true
          })
          .catch((error) => {
            console.log(error)
            setShowModal({
              ...showModal,
              value: "",
              isShowModal: false,
            })
            return false
          })
      }
    })
  }

  const onSetShowModel = (obj: any) => {
    setShowModal({
      ...showModal,
      value: obj.value,
      isShowModal: obj.isShowModal,
    })
  }

  const updateItemQuantity = (quantity?: number, id?: string) => {
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${settings.accessToken}`,
      "Content-Type": "application/vnd.api+json",
    }
    const body = JSON.stringify({
      data: {
        type: "line_items",
        id: id,
        attributes: {
          quantity: quantity,
        },
      },
    })
    const url = `${process.env.REACT_APP_PUBLIC_CL_URL_PATH}/api/line_items/${id}`

    return fetch(url, {
      method: "PATCH",
      headers: headers,
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        setOrderData()
        return data
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }

  const onSubmitCouponCode = async (
    orderId: any,
    couponCode: any,
    accessToken: any,
    type: any
  ) => {
    if (type === "apply") {
      let couponResponse = await applyCoupnCode(
        orderId,
        couponCode,
        accessToken
      )
      if (couponResponse?.isSuccess) {
        setcouponData({
          hasError: false,
          data: couponResponse?.data,
          errorMessage: "",
        })

        setOrderData()
      } else {
        setcouponData({
          hasError: true,
          data: {},
          errorMessage: "Invalid Voucher/Promo Code!",
        })
      }
    } else if (type === "clear") {
      setcouponData({
        ...couponData,
        hasError: false,
        errorMessage: "",
      })
    }
  }

  const applyCoupnCode = (
    orderId: any,
    coupon_code: any,
    access_token: any
  ) => {
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/vnd.api+json",
    }
    const body = JSON.stringify({
      data: {
        type: "orders",
        id: orderId,
        attributes: {
          coupon_code: coupon_code,
        },
      },
    })
    const url = `${process.env.REACT_APP_PUBLIC_CL_URL_PATH}/api/orders/${orderId}`

    return fetch(url, {
      method: "PATCH",
      headers: headers,
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.data) {
          if (data?.data?.attributes.discount_amount_cents === 0) {
            removeCoupnCode()
            return {
              isSuccess: false,
              data: {},
            }
          } else {
            return {
              isSuccess: true,
              data: data,
            }
          }
        }
      })
      .catch((error) => {
        if (error) {
          return {
            isSuccess: false,
            data: {},
          }
        }
      })
  }

  const onRemoveCouponCode = async () => {
    removeCoupnCode()
  }

  const removeCoupnCode = () => {
    const headers = {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${settings.accessToken}`,
      "Content-Type": "application/vnd.api+json",
    }
    const body = JSON.stringify({
      data: {
        type: "orders",
        id: settings?.orderId,
        attributes: {
          coupon_code: "",
        },
      },
    })
    const url = `${process.env.REACT_APP_PUBLIC_CL_URL_PATH}/api/orders/${settings?.orderId}`

    return fetch(url, {
      method: "PATCH",
      headers: headers,
      body: body,
    })
      .then((response) => response.json())
      .then((data) => {
        setOrderData()
        return data
      })
      .catch((error) => {
        return error
      })
  }

  return (
    <CommerceLayer
      accessToken={settings.accessToken}
      endpoint={settings.endpoint}
    >
      <OrderContainer
        orderId={settings.orderId}
        attributes={{
          cart_url: settings.cartUrl || window.location.href,
        }}
        fetchOrder={() => {
          // send update event to parent iframe if iframe-resizer is enabled
          window.parentIFrame?.sendMessage({ type: "update" }, "*")
        }}
      >
        <EmbeddedCapabilities.OrderRefresher />
        <LineItemsContainer>
          <PageLayout
            top={<PageHeader></PageHeader>}
            main={
              <Summary
                cartItems={cartItems}
                onSetShowModel={onSetShowModel}
                onDelete={onDelete}
                showModal={showModal}
                updateItemQuantity={updateItemQuantity}
                isLoading={isLoading}
              />
            }
            aside={
              <Totals
                orderDetails={orderDetails}
                onSubmitCouponCode={onSubmitCouponCode}
                couponData={couponData}
                removeCouponCode={onRemoveCouponCode}
              />
            }
          />
        </LineItemsContainer>
      </OrderContainer>
    </CommerceLayer>
  )
}

export default Cart
