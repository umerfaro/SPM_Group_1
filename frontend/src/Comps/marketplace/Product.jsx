
import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import Header from '../header/Header.jsx';
import Footer from '../footer/Footer.jsx';

import axios from 'axios';
import { useAuth } from '@/context/AuthContext'; // Import the useAuth hook


function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { user, token } = useAuth(); // Access user and token from AuthContext


  useEffect(() => {
    const fetchProduct = async () => {
      try {

        const response = await axios.get(`http://localhost:3001/api/equipment/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(response.data);
        console.log('Fetched product:', response.data); // Verify owner field

      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();

  }, [id, token]);


  const handleAddToCart = (selectedProduct) => {
    // Logic for adding the product to the cart
    console.log('Added to cart:', selectedProduct);

    // Implement cart functionality as needed
  };

  const handleRentOut = async (selectedProduct) => {
    console.log('RentOut:', selectedProduct);

    // Ensure user is authenticated
    if (!user) {
      alert('You must be logged in to rent out this product.');
      return;
    }

    // Validate Dates
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      alert('End date must be after start date.');
      return;
    }
    console.log('user:', user);

    // Collect the form data and log it for inspection
    const bookingData = {
      equipment: selectedProduct._id, // The product ID
      renter: user.userId, // Use userId from context
      owner: selectedProduct.owner, // Correctly assign owner ID
      rentalPeriod: {
        startDate: start, // Ensure startDate is valid
        endDate: end, // Ensure endDate is valid
      },
      totalPrice: selectedProduct.rentalPricePerDay * quantity, // Calculated properly
      pickupTime: new Date(), // Set correctly
    };

    console.log('Booking Data:', bookingData); // Log data for debugging

    // Check for missing data before sending
    if (
      !bookingData.equipment ||
      !bookingData.renter ||
      !bookingData.owner ||
      !bookingData.rentalPeriod.startDate ||
      !bookingData.rentalPeriod.endDate ||
      !bookingData.totalPrice ||
      !bookingData.pickupTime
    ) {
      console.error('Missing required fields', bookingData);
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/bookings', bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Booking successful:', response.data);
      alert('Booking successful!');

      // Update equipment status to "rented out"
      await axios.put(
        `http://localhost:3001/api/equipment/${selectedProduct._id}`,
        { status: 'rented out' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Equipment status updated to "rented out"');
      alert('Equipment status updated to "rented out"');

      // Optionally, reset form fields and refetch product data
      setStartDate('');
      setEndDate('');
      setQuantity(1);
      // Refetch the product to get the updated status
      const updatedProductResponse = await axios.get(`http://localhost:3001/api/equipment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduct(updatedProductResponse.data);
    } catch (error) {
      console.error('Error renting out product:', error.response ? error.response.data : error.message);
      alert('Error renting out product.');
    }
  };


  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />


      <div
        className="h-48 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=192&width=1920')" }}
      >

        <h1 className="text-4xl font-bold text-white">Product Details</h1>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg">

            <img
              src={product.images[0]}
              alt={product.equipmentType}
              width={400}
              height={400}
              className="mx-auto"
            />

          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">{product.equipmentType}</h2>

            <p className="text-2xl font-semibold text-primary mt-2">
              ${product.rentalPricePerDay.toFixed(2)} per day
            </p>

            {/* Display Equipment Status */}
            <div className="mt-2">
              <span className={`px-2 py-1 text-sm font-semibold rounded ${product.status === 'rented out' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                {product.status === 'rented out' ? 'Rented Out' : 'Available'}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-20 border-0"
              />
              <Button
                className="bg-primary text-white"
                onClick={() => handleAddToCart(product)}
                disabled={product.status === 'rented out'}
              >
                Add to Cart
              </Button>
            </div>

            <div className="flex flex-col space-y-4 mt-6">
              <div>
                <label htmlFor="startDate" className="block text-lg font-medium">
                  Start Date
                </label>
                <Input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1"
                  disabled={product.status === 'rented out'}
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-lg font-medium">
                  End Date
                </label>
                <Input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1"
                  disabled={product.status === 'rented out'}
                />
              </div>

              <Button
                className="bg-primary text-white"
                onClick={() => handleRentOut(product)}
                disabled={product.status === 'rented out'}
              >
                Rent Out

              </Button>
            </div>

            <Card className="mt-6">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">Description</h3>
                <Textarea value={product.description} readOnly className="mt-2" rows={6} />
              </CardContent>
            </Card>
          </div>
        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Product;
