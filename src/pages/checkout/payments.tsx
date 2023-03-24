import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/checkout";
import { loadStripe, Stripe } from "@stripe/stripe-js";


function Payment() {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    setStripePromise(loadStripe("pk_test_51MnRz2ERgVuN2eWvEEtIZmuFixqk7YQNOpOt4ID70uoRmUUTbdWIJ5T0kTFWM63VJv8vXJFdpYZ93jUMHFISA5E900b36kbFse"));
  }, []);

  useEffect(() => {
    fetch("/api/payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var product = await result.json();
      setClientSecret(product.client_secret);
    });
  }, []);

  return (
    <div className="flex flex-col items-center pt-20">
      <div className="text-4xl text-bold p-4 mb-6">React Stripe and the Payment Element</div>
      {clientSecret && (
        <div>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        </div>
      )}
    </div>
  );
}

export default Payment;