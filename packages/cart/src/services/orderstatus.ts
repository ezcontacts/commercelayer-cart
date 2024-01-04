export const getOrderStatus = (orderId: any, access_token: any) => {
  const headers = {
    Accept: "application/vnd.api+json",
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/vnd.api+json",
  }

  const url = `${process.env.REACT_APP_PUBLIC_CL_URL_PATH}/api/orders/${orderId}`

  return fetch(url, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      let orderStatus = data?.data?.attributes?.status

      return orderStatus
    })
    .catch((error) => {
      return error
    })
}
