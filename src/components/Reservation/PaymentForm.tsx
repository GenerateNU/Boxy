import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { AiOutlineLeft } from "react-icons/ai";
import ReservationOverview from "./ReservationOverview";

export default function PaymentForm({ reservation }: any) {
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentId, setPaymentId] = useState("");

  useEffect(() => {
    setStripePromise(
      loadStripe(
        "pk_test_51MnRz2ERgVuN2eWvEEtIZmuFixqk7YQNOpOt4ID70uoRmUUTbdWIJ5T0kTFWM63VJv8vXJFdpYZ93jUMHFISA5E900b36kbFse"
      )
    );
  }, []);

  useEffect(() => {
    fetch("/api/payment-intent", {
      method: "POST",
      body: JSON.stringify({
        currency: "USD",
        amount: reservation.price,
        automatic_payment_methods: { enabled: true },
      }),
    })
      .then((result) => result.json())
      .then((data) => {
        setClientSecret(data.client_secret);
        setPaymentId(data.id);
      });
  }, []);

  return (
    <div className="flex flex-col items-center mt-8">
      {clientSecret && (
        <div>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm reservationInfo={reservation} paymentId={paymentId} />
          </Elements>
        </div>
      )}
    </div>
  );
}

function CheckoutForm({ reservationInfo, paymentId }: any) {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setStatus("Processing ...");

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/stasher/confirmation`,
      },
    });
    if (result.error.message) {
      setError(result.error.message);
    }

    setStatus("");
  };

  return (
    <>
      <div className="container flex flex-col min-w-[80vw] pt-16 justify-center items-center opacity-100">
        <div className="flex w-[80vw] items-center mt-7 mb-7">
          <AiOutlineLeft style={{ fontSize: "10px", color: "" }} />
          <button className="text-[15px] ml-2">Back</button>
        </div>
        <div className="flex place-content-between w-[80vw]">
          <div className="flex-col w-[60%]">
            <div className="flex mb-5">
              <div className="text-[20px] md:text-[32px] text-[#B5B5B5]">
                Reservation Dates
              </div>
              <h2 className="text-[20px] md:text-[32px] text-[#B5B5B5]">
                {"\xa0/\xa0"}
              </h2>
              <div className="text-[20px] md:text-[32px] text-[#B5B5B5]">
                Item Information
              </div>
              <h2 className="text-[20px] md:text-[32px] text-[#B5B5B5]">
                {"\xa0/\xa0"}
              </h2>
              <div className="text-[20px] md:text-[32px] text-black">
                Payment
              </div>
            </div>
            <PaymentElement />
          </div>
          <div>
            {ReservationOverview(
              reservationInfo,
              2,
              () => {},
              handleSubmit,
              status
            )}
            <div className="text-red-500 pt-2 text-center">{error}</div>
          </div>
        </div>
      </div>
    </>
  );
}
