// src/main.jsx
import { StrictMode, useEffect, useState } from 'react';
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
import { store } from "../store/store";
import { Provider, useSelector} from 'react-redux';
import { jwtDecode } from "jwt-decode";

// function ProtectedRoute({ children }) {
//   const isAuthenticated = true; // Replace with actual authentication check
//   return isAuthenticated ? children : <Navigate to="/signup" />;
// }
function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.users.token);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      try {
        if (!token) {
          setIsAuthenticated(false);
          return;
        }
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decoded.exp < currentTime) {
          setIsAuthenticated(false); // Token is expired
          localStorage.clear();
        } else {
          setIsAuthenticated(true); // Token is valid
        }
      } catch (error) {
        setIsAuthenticated(false); // Invalid token
        localStorage.clear();
      }
    };
    console.log('came here');

    checkToken();
  }, [token]); // Dependency on `token`

  return isAuthenticated ? children : <Navigate to="/signup" />;
}




const router = createBrowserRouter([
  { path: '/signup', element: <LoginSignup /> },
  {
    path: '/',
    element: (

        <Home />
    ),
  },
  {
    path: '/marketplace',
    element: (
      // <ProtectedRoute>
        <Market />
      // </ProtectedRoute>
    ),
  },
  {
    path: '/marketplace/product/:id',
    element: (
      // <ProtectedRoute>
        <Product />
      // </ProtectedRoute>
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
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <CartProvider>
      <RouterProvider router={router} />
      <Chat />
    </CartProvider>
    </Provider>
  </StrictMode>
);
