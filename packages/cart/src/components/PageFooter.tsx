import React from 'react'

const Rating = ({rating}:{rating:string}) => {
  return (
    <div className='button-checkout p-1 text-white'>*{rating}</div>
  )
}

const ReviewSiteCard = ({logo,company,rating,reviews}:{logo:string,company:string,rating:string,reviews:string }) => {
  return (
    <div className='flex flex-col justify-end items-center gap-1 lg:pr-10 lg:pl-10 lg:border-l-2 first:border-0 '>
      <img src={logo} alt={company} />
      <div className='flex text-xs items-center gap-1'>
        <Rating rating={rating}/>
        <div className='text-tundora-300'>{`(${reviews} Reviews)`}</div>
      </div>
    </div>
  )
}


const PageFooter = () => {
  return (
    <div className='flex flex-col items-center pt-40 '>
      <div className=''>Customers love us</div>
      <div className='flex  flex-wrap basis-1/2 pt-10 pb-10'>
        <ReviewSiteCard logo="/img/ResellerRatings-logo-e1656963462806 1.svg" company={'Reseller Ratings'} rating="4.7/5" reviews="10,451"/>
        <ReviewSiteCard logo="/img/602e67f57b5b5700048a4ab0 1.svg" company={'Ratings.io'} rating="4.7/5" reviews="10,451"/>
        <ReviewSiteCard logo="/img/shopper-approved-logo-2 1.svg" company={'Shopper Approved'} rating="4.7/5" reviews="10,451"/>
        <ReviewSiteCard logo="/img/Trustpilot_logo 1.svg" company={'Trustpilot'} rating="4.7/5" reviews="10,451"/>
      </div>
    </div>
  )
}

export default PageFooter