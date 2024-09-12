import React from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

const CustomPaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardNumberElement),
            billing_details: {
                // Optional: Collect additional billing details if needed
                name: 'Customer Name',
            },
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            // Send paymentMethod.id to your server (Laravel)
        }
    };

    return (
        <div class="payment-detail-form contact-form">
            <form class="creditcard-form">
                <div class="form-group">
                    <input class="form_control" id="cardname" name="cardname" placeholder="Name On Card" type="text"  />
                </div>
                <div class="form-group">
                    <label class="form-check-label" for="card-number">
                        Card Number:
                    </label>
                    {/* <input class="form_control" id="ccnumber" name="ccnumber" placeholder="Card Number" type="tel"  /> */}
                    <CardNumberElement className="input" id="card-number" />
                </div>
                <div class="row">
                    <div class="form-group col-6">
                        <label class="form-check-label" for="card-exp">
                            Card Expirey:
                        </label>
                        {/* <input class="form_control" id="ccexp" name="ccexp" placeholder="Expiration Date(MM/YY)" type="tel"  /> */}
                        <CardExpiryElement className="input" id="card-exp"/>
                    </div>
                    <div class="form-group col-6">
                        <label class="form-check-label" for="card-cvv">
                             CVV:
                        </label>
                        {/* <input class="form_control" id="cvv" name="cvv" placeholder="Security Code" type="tel"  /> */}
                        <CardCvcElement className="input" id="card-cvv"/>
                        {/* <div data-tooltip="true" id="phone_tooltip" class="tooltip-container">
                            <button type="button" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Your card security code ">
                                ?
                            </button>
                        </div> */}
                    </div>
                </div>
            </form>
        </div>
    );
};
        
export default CustomPaymentForm;