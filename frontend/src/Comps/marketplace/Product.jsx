import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '../UserHeader';
import Footer from '../Footer';
import axios from 'axios';
import CartButton from '../cart/CartButton';
import CartPanel from '../cart/CartPanel';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/equipment/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (selectedProduct) => {
    // Logic for adding the product to the cart
    console.log('Added to cart:', selectedProduct);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      

      <div className="h-48 bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/placeholder.svg?height=192&width=1920')" }}>
        <h1 className="text-4xl font-bold text-white">Product Details</h1>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg">
            <img src={product.images[0]} alt={product.equipmentType} width={400} height={400} className="mx-auto" />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">{product.equipmentType}</h2>
            <p className="text-2xl font-semibold text-primary mt-2">${product.rentalPricePerDay.toFixed(2)} per day</p>

            <div className="flex items-center gap-4">
              <Input type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} className="w-20 border-0" />
              <Button className="bg-primary text-white" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </Button>
            </div>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">Description</h3>
                <Textarea value={product.description} readOnly className="mt-2" rows={6} />
              </CardContent>
            </Card>
          </div>
        </div>
      
      </main>

   {/* Footer */}
   <Footer />
      <CartPanel />
    </div>
  );
}

export default Product;
