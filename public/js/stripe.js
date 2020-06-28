import axios from 'axios';
import  {showAlert} from "./alerts";

const stripe = Stripe('pk_test_51GybfVGKyA64MLcgqp95rpBBdrRzQkoWHDjIvlfA6g1KH8SA3pS9wl3j2kC4G0aqhzamVQviXN4N4nsOmpuPfauX00eFrdtrrY');

export  const  bookTour = async tourId => {
  try{
    //1) Get ckeckout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    //2) Create ckeckout form + charge credit card
await  stripe.redirectToCheckout({
  sessionId: session.data.session.id,
});
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }

};

