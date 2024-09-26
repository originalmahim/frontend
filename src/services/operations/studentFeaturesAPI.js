import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setPaymentLoading } from "../../slices/courseSlice";


const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

export async function buyCourse(token, price , coursesId, userDetails) {
    const toastId = toast.loading("Loading...");
    console.log(userDetails);

    
    try {
        // Prepare payment information
        const payInfo = {
            full_name: userDetails.firstName,
            email: userDetails.email,
            amount: price, 
            id: userDetails.additionalDetails._id ,
            coursesId:coursesId,
        };

        // Initiate the order via Uddoktapay
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, payInfo, {
            Authorization: `Bearer ${token}`,
        });
        if (orderResponse.data.payment_urldfd) {

            window.location.href = orderResponse.data.payment_url;
        } else {
            toast.error("Please Select Another Payment Gateway");
        }

    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something Went Wrong, Try Again");
    } finally {
        toast.dismiss(toastId);
    }
}


// ================ send Payment Success Email ================
// async function sendPaymentSuccessEmail(response, amount, token) {
//     try {
//         await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
//             orderId: response.razorpay_order_id,
//             paymentId: response.razorpay_payment_id,
//             amount,
//         }, {
//             Authorization: `Bearer ${token}`
//         })
//     }
//     catch (error) {
//         console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
//     }
// }


// ================ verify payment ================
// async function verifyPayment(bodyData, token, navigate, dispatch) {
//     const toastId = toast.loading("Verifying Payment....");
//     dispatch(setPaymentLoading(true));

//     try {
//         const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
//             Authorization: `Bearer ${token}`,
//         })

//         if (!response.data.success) {
//             throw new Error(response.data.message);
//         }
//         toast.success("payment Successful, you are addded to the course");
//         navigate("/dashboard/enrolled-courses");
//         dispatch(resetCart());
//     }
//     catch (error) {
//         console.log("PAYMENT VERIFY ERROR....", error);
//         toast.error("Could not verify Payment");
//     }
//     toast.dismiss(toastId);
//     dispatch(setPaymentLoading(false));
// }