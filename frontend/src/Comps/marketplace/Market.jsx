import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Icon Components
function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function Market() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, Infinity]); // Default to show all products
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  // Function to handle product click and navigate with selected product
  const handleProductClick = (id) => {
    const selectedProduct = equipment.find((product) => product._id === id);
    if (selectedProduct) {
      navigate(`/marketplace/product/${id}`, { state: selectedProduct });
    } else {
      console.error('Product not found!');
    }
  };

  // Fetch equipment data on component mount
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/equipment');
        
        const transformedData = response.data.map((item) => ({
          id: item._id,
          name: item.equipmentType,
          price: item.rentalPricePerDay,
          rating: 4.5,
          image: item.images?.[0] || '/placeholder.svg?height=200&width=200',
        }));
  
        setProducts(transformedData);
        setEquipment(response.data);
        setFilteredProducts(transformedData); // Set filteredProducts to all products initially
        setLoading(false);
      } catch (err) {
        setError(err.message || 'An error occurred');
        setLoading(false);
      }
    };
  
    fetchEquipment();
  }, []);
  
  useEffect(() => {
    // Only filter products when the price range or products change
    if (products.length > 0) {
      filterProductsByPrice(priceRange);
    }
  }, [priceRange, products]);
  
  // Function to handle price range change
  const handlePriceChange = (value) => {
    setPriceRange(value);
  };
  
  // Function to handle the 'Go' button click for price filter
  const handleApplyPriceFilter = () => {
    filterProductsByPrice(priceRange);
  };
  
  // Function to filter products by price range
  const filterProductsByPrice = (range) => {
    const filtered = products.filter(
      (product) => product.price >= range[0] && product.price <= range[1]
    );
    setFilteredProducts(filtered);
  };
  

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />

      {/* Hero */}
      <div className="relative h-48 bg-[url('/placeholder.svg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4">
          <h1 className="relative pt-16 text-center text-3xl font-bold text-white">
            Our Shop
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto flex-1 px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Sidebar */}
          <aside className="space-y-6">
            <div>
              <h2 className="mb-4 font-semibold">Price</h2>
              <Slider
                defaultValue={priceRange}
                max={100}
                step={1}
                onChange={handlePriceChange}
              />
              <div className="mt-2 flex items-center gap-2">
                <Input
                  placeholder="Min"
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                />
                <span>-</span>
                <Input
                  placeholder="Max"
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                />
                <Button size="sm" variant="secondary" onClick={handleApplyPriceFilter}>
                  Go
                </Button>
              </div>
            </div>

            {/* <div>
              <h2 className="mb-4 font-semibold">Categories</h2>
              <div className="space-y-2">
                {["Fresh Vegetables", "Fresh Fruits", "Organic Foods"].map((category, index) => (
                  <Link key={index} to="#" className="block text-sm hover:text-green-600">
                    {category}
                  </Link>
                ))}
              </div>
            </div> */}

            {/* <div className="space-y-4">
              <h2 className="mb-4 font-semibold">Filtered Products</h2>
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-item">
                  <h3>{product.name}</h3>
                  <img src={product.image} alt={product.name} />
                  <p>Price: ${product.price}</p>
                  <p>Rating: {product.rating}</p>
                </div>
              ))}
            </div> */}
          </aside>

          {/* Product Grid */}
          <div className="col-span-3 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <CardContent className="p-4">
                  <img
                    alt={product.name}
                    src={product.image}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="mt-2 text-gray-500">Price: ${product.price}</p>
                  <div className="mt-2 flex items-center">
                    <Star className="text-yellow-500" />
                    <span className="ml-1">{product.rating}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Market;
