import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_TEST_KEY);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <Elements stripe={stripePromise}>
      <App />
      </Elements>
  </React.StrictMode>,
)
