

const Rating = ({rating}:{rating:string}) => {
  return (
    <div className='button-checkout p-1 text-white'>{rating}</div>
  )
}

const ReviewSiteCard = ({logo,company,rating,reviews}:{logo:string,company:string,rating:string,reviews:string }) => {
  return (
    <div className='flex flex-col justify-center items-center gap-1'>
      <img src={logo} alt={company} />
      <div className='flex text-xs items-center gap-1'>
        <Rating rating={rating}/>
        <div className='text-tundora-300'>{`(${reviews} Reviews)`}</div>
      </div>
    </div>
  )
}


export const Divider = () => {
  return (
    <div className='hidden md:block border-l-2 h-24'></div>
  )
}


const PageFooter = () => {
  return (
    <div className='review-banner'>
      <div className='review-banner-title'>Customers love us</div>
      <div className='review-banner-main'>
        <ReviewSiteCard logo="/img/ResellerRatings-logo-e1656963462806 1.svg" company={'Reseller Ratings'} rating="4.7/5" reviews="10,451"/>
        <Divider/>
        <ReviewSiteCard logo="/img/602e67f57b5b5700048a4ab0 1.svg" company={'Ratings.io'} rating="4.7/5" reviews="10,451"/>
        <Divider/>
        <ReviewSiteCard logo="/img/shopper-approved-logo-2 1.svg" company={'Shopper Approved'} rating="4.7/5" reviews="10,451"/>
        <Divider/>
        <ReviewSiteCard logo="/img/Trustpilot_logo 1.svg" company={'Trustpilot'} rating="4.7/5" reviews="10,451"/>
      </div>
    </div>
  )
}

export default PageFooter