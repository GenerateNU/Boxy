import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error }: { error: StripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/stripe/success`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      error.message = error.message || "";
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="flex flex-col items-end"
    >
      <PaymentElement id="payment-element" />
      <button
        disabled={isProcessing || !stripe || !elements}
        id="submit"
        className="p-4 mt-4 rounded-lg bg-blue-400 hover:bg-blue-500"
      >
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Checkout"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
