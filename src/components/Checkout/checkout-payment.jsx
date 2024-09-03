import React, { useState } from 'react';

const CreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic, like sending the data to an API
    console.log({ cardNumber, expiryDate, cvv, cardName });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          maxLength="16"
          required
        />
      </div>

      <div>
        <label>Cardholder Name</label>
        <input
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Expiry Date (MM/YY)</label>
        <input
          type="text"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          maxLength="5"
          placeholder="MM/YY"
          required
        />
      </div>

      <div>
        <label>CVV</label>
        <input
          type="text"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          maxLength="4"
          required
        />
      </div>

      <button type="submit">Submit Payment</button>
    </form>
  );
};

export default CreditCardForm;
