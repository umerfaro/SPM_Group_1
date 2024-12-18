// src/main.jsx
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import './index.css';
import Home from './Comps/Home.jsx';
import LoginSignup from './Auth/LoginSignup.jsx';
import Market from './Comps/marketplace/Market.jsx';
import Product from './Comps/marketplace/Product.jsx';
import CartProvider from './context/CartContext';
import { Toaster } from './components/ui/toaster';
import Service from './Comps/service/service';
import Tools from './Comps/service/tools';
import Chat from './Comps/collaboration/Chat';
import { store } from "./store/store";
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Import ProtectedRoute

const router = createBrowserRouter([
  { path: '/signup', element: <LoginSignup /> },
  { path: '/login', element: <LoginSignup /> }, // Add /login route
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/marketplace',
    element: (
      <ProtectedRoute>
        <Market />
      </ProtectedRoute>
    ),
  },
  {
    path: '/marketplace/product/:id',
    element: (
      <ProtectedRoute>
        <Product />
      </ProtectedRoute>
    ),
  },
  {
    path: '/services',
    element: (
      <ProtectedRoute>
        <Service />
      </ProtectedRoute>
    ),
  },
  {
    path: '/service/tools/:id',
    element: (
      <ProtectedRoute>
        <Tools />
      </ProtectedRoute>
    ),
  },
  // Add a catch-all route for undefined paths
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider> {/* Wrap with AuthProvider */}
        <CartProvider>
          <RouterProvider router={router} />
          <Chat />
          <Toaster /> {/* Include Toaster for notifications */}
        </CartProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>
);

