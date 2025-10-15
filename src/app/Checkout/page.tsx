'use client'
import React from 'react';

export default function Page() {
  const handleCheckout = async () => {
    const res = await fetch('/api/create-checkout-session', { method: 'POST' });
    const data = await res.json();

    if (data.error) {
      console.error('Checkout session error:', data.error);
      return;
    }

    // Redirect the browser directly
    window.location.href = data.url;
  };

  return (
    <button onClick={handleCheckout}>
      Buy 50 Cent Product
    </button>
  );
}
