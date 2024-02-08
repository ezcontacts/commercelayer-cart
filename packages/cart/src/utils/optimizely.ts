import { createInstance } from "@optimizely/react-sdk"

export const optimizely = createInstance({
  sdkKey: process.env.REACT_APP_OPTIMIZELY_KEY,
  datafileOptions: {
    updateInterval: 600000,
    autoUpdate: true,
    urlTemplate: process.env.REACT_APP_OPTIMIZELY_URL,
  },
})
export default optimizely
