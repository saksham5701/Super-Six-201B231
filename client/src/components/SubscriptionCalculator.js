import React, { useState } from 'react';

const SubscriptionCalculator = () => {
  const [basePrice, setBasePrice] = useState(0);
  const [pricePerCreditLine, setPricePerCreditLine] = useState(0);
  const [pricePerCreditScorePoint, setPricePerCreditScorePoint] = useState(0);
  const [creditScore, setCreditScore] = useState(0);
  const [creditLines, setCreditLines] = useState(0);
  const [subscriptionPrice, setSubscriptionPrice] = useState(0);

  const calculateSubscriptionPrice = () => {
    const price =
      basePrice +
      pricePerCreditLine * creditLines +
      pricePerCreditScorePoint * creditScore;
    setSubscriptionPrice(price);
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Base Price"
        onChange={(e) => setBasePrice(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Price per Credit Line"
        onChange={(e) => setPricePerCreditLine(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Price per Credit Score Point"
        onChange={(e) => setPricePerCreditScorePoint(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Credit Score"
        onChange={(e) => setCreditScore(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Credit Lines"
        onChange={(e) => setCreditLines(Number(e.target.value))}
      />
      <button onClick={calculateSubscriptionPrice}>Calculate</button>
      <p>Subscription Price: {subscriptionPrice}</p>
    </div>
  );
};

export default SubscriptionCalculator;