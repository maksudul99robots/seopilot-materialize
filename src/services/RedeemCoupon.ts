export const RedeemCouponCode = (coupon: string, auth: any) => {


    if (coupon.length > 5) {


        auth.redeemCoupon({ coupon: coupon })

    }
}

