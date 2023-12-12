const Invalid = () => {

  const handleGoBack = () => {
    window.history.back()
  }

  const handleClickContacts = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/contact-lenses`
  }

  const handleClickSunglasses = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/sunglasses`
  }

  const goContinueShopping = () => {
    window.location.href = `${process.env.REACT_APP_PUBLIC_ODOO_PATH}`
  }

  return (
    <div className="min-h-screen w-auto">
    <div className="container">
      <div className={`flex flex-wrap justify-end items-stretch flex-col h-screen p-5 md:p-10 lg:px-20 lg:pb-10`}>
        <div className={  `md:max-w-xs`}>
        <img className={`w-60 max-w-full mb-5 md:mb-10`} onClick={goContinueShopping} src={'/img/logo.svg'} alt={'EzContacts'} />
        </div>
        <div className={`flex flex-col flex-1 justify-center items-center text-center`}>
      <img className="four-zero-four-img" src="/img/404.svg" alt="404" />
      <div className="four-zero-four-main-text">Whoops, sorry about that!</div>
      <div className="four-zero-four-sub-text">{`It looks like the page you're looking for no longer exists.`}</div>
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          className="btn-background four-zero-four-btn uppercase"
          onClick={handleClickContacts}
        >
          Shop contacts
        </button>
        <button
          className="btn-background four-zero-four-btn uppercase"
          onClick={handleClickSunglasses}
        >
          Shop Sunglasses
        </button>
      </div>

    </div>
      </div>
    </div>
  </div>


  )
}

export default Invalid
