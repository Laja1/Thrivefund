import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_TEST_KEY);
const queryClient = new QueryClient({
  defaultOptions:{queries:{staleTime:60000, gcTime:10*(60*1000)
  }}
})
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <Elements stripe={stripePromise}>
     <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
      </Elements>
      
  </React.StrictMode>,
)
