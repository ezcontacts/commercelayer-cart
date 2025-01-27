/**
 * @returns the value of `accessToken` query string parameter or `undefined` if it's not present.
 */
export const getLogedinStatus = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      return params.get("islogged") || undefined
    }
  }

  export const getVisitorId = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      return params.get("ezref") || undefined
    }
  }
