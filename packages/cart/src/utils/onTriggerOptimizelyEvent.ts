export const triggerOptimizelyEvent = async (
  visitoId: any,
  event_name: any
) => {
  const requestBody = {
    visitor_id: visitoId || "",
    event_name: event_name,
  }
  return fetch(
    `${process.env.REACT_APP_PUBLIC_ODOO_PATH}/cl/passOptimizelyEvent`,
    {
      headers: {
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestBody),
    }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log("visitor_id:", visitoId)
      console.log("event_name:", event_name)
      console.log("Success:", result)
      return result
    })
    .catch((error) => {
      console.error("Error:", error)
      return error
    })
}
