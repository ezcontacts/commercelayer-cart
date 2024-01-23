import { LineItemsCount } from "@ezcontacts/react-components"
import { VFC, ReactNode } from "react"

import Header from "#components/header"
import { isEmbedded } from "#utils/isEmbedded"

type Props = {
  top?: ReactNode
  bottom?: ReactNode
} & InnerProps

export const PageLayout: VFC<Props> = ({ top, main, aside, bottom }) => {
  return isEmbedded() ? (
    <Inner main={main} aside={aside} />
  ) : (
    <div className="container">
      <Header />
      <div className="inner-container flex flex-col min-h-screen">
        {top && <div>{top}</div>}
        <Inner main={main} aside={aside} />
        {bottom && <div>{bottom}</div>}
      </div>
    </div>
  )
}

type InnerProps = {
  main: ReactNode
  aside: ReactNode
}
const Inner: VFC<InnerProps> = ({ main, aside }) => {
  return (
    <div className="cart-page-section flex flex-col md:flex-row md:gap-8 xl:gap-6 items-start">
      <main className="w-full left-part">{main}</main>
      <aside className="w-full right-sidebar">
        {/* if there are no items it wont render anything */}
        <LineItemsCount>
          {({ quantity }) =>
            quantity ? (
              <div className="totalcard md:totalcard  pt-6 md:px-7 rounded-md w-full">
                {aside}
              </div>
            ) : (
              <div />
            )
          }
        </LineItemsCount>{" "}
      </aside>
    </div>
  )
}
