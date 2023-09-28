import { LoginRegistrationAPI } from "./API"
import { sendTokenToExtension } from "./SendTokenToExtension"
import Swal from "sweetalert2"
export const RedeemCouponCode = (coupon: string, auth: any) => {


    if (coupon.length > 5) {

        auth.redeemCoupon({ coupon: coupon })

    }
}

