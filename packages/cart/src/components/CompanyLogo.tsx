import { LogoCL } from "@commercelayer/react-utils"
import { FC, ReactNode } from "react"

import { useSettings } from "./SettingsProvider"
import { SkeletonItem } from "./Skeleton/Item"

export const CompanyLogo: FC = () => {
  const { isLoading, settings } = useSettings()
  const returnUrl = settings.isValid ? settings.returnUrl : undefined

  const goContinueShopping = () => {
    window.location.href = `${process.env.REACT_APP_PUBLIC_ODOO_PATH}`
  }

  return (
    <>
      {isLoading ? (
        <SkeletonItem className="w-12/12 h-[40px]" />
      ) : settings.logoUrl ? (
        <ReturnLink url={returnUrl}>
          <img
            src={settings.logoUrl}
            alt={settings.companyName}
            className="h-[40px] cursor-pointer"
            onClick={goContinueShopping}
          />
        </ReturnLink>
      ) : settings.companyName ? (
        <ReturnLink url={returnUrl}>
          <div className="font-semibold text-2xl h-[40px] uppercase">
            {settings.companyName}
          </div>
        </ReturnLink>
      ) : (
        <div>
          <LogoCL height="40px" className="text-black" />
        </div>
      )}
    </>
  )
}

const ReturnLink: FC<{ url?: string; children: ReactNode }> = ({
  url,
  children,
}) => {
  return url ? (
    <a href={url} data-test-id="return-url-logo">
      {children}
    </a>
  ) : (
    <>{children}</>
  )
}
