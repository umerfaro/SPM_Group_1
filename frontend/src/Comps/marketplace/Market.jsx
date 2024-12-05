
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Star } from 'lucide-react';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../header/Header.jsx';
import Footer from '../footer/Footer.jsx';

function Market() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    equipmentType: '',
    location: '',
    minPrice: 0,
    maxPrice: 100,
    startDate: '',
    endDate: '',

    availabilityStatus: 'available', // Ensures only available products
    search: '', // Add search filter
  });
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    setFilters((prev) => ({
      ...prev,
      search,
    }));
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/equipment', { params: filters });
        if (Array.isArray(response.data)) {
          let availableProducts = response.data.filter(
            (product) => product.availabilityStatus === 'available'
          );

          // Apply search filter (if backend doesn't handle it)
          if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            availableProducts = availableProducts.filter(
              (product) =>
                product.equipmentType.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower) ||
                product.location.toLowerCase().includes(searchLower)
            );
          }

          setProducts(availableProducts);

          // Extract unique equipment types
          const types = [...new Set(availableProducts.map((product) => product.equipmentType))];
          setEquipmentTypes(types);
        } else {
          setProducts([]);
          setEquipmentTypes([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
        setEquipmentTypes([]);
      }
    };


    fetchProducts();
  }, [filters]);

  const handleProductClick = (id) => {
    navigate(`/marketplace/product/${id}`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="relative h-48 bg-[url('/placeholder.svg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4">
          <h1 className="relative pt-16 text-center text-3xl font-bold text-white">Our Shop</h1>
        </div>
      </div>

      <main className="container mx-auto flex-1 px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <aside className="space-y-6">
            {/* Price Filter */}
            <div>
              <h2 className="mb-4 font-semibold">Price</h2>
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                onValueChange={(value) =>
                  setFilters((prev) => ({
                    ...prev,
                    minPrice: value[0],
                    maxPrice: value[1],
                  }))
                }
              />
              <div className="mt-2 flex items-center gap-2">
                <Input
                  name="minPrice"
                  placeholder="Min"
                  type="number"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                />
                <span>-</span>
                <Input
                  name="maxPrice"
                  placeholder="Max"
                  type="number"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                />
                <Button size="sm" variant="secondary">
                  Go
                </Button>
              </div>
            </div>
            {/* Categories Filter */}
            <div>
              <h2 className="mb-4 font-semibold">Categories</h2>
              <div className="space-y-2">
                {equipmentTypes.length === 0 ? (
                  <p>No categories available.</p>
                ) : (
                  equipmentTypes.map((category, index) => (
                    <button
                      key={index}

                      className={`block text-sm text-left w-full hover:text-green-600 ${
                        filters.equipmentType === category ? 'font-bold' : ''
                      }`}
                      onClick={() =>
                        setFilters((prev) => ({
                          ...prev,
                          equipmentType: prev.equipmentType === category ? '' : category, // Toggle filter
                        }))

                      }
                    >
                      {category}
                    </button>
                  ))
                )}
              </div>
            </div>
            {/* Additional Filters (e.g., Location, Dates) */}
            {/* You can add more filters here if needed */}
          </aside>

          <div className="col-span-3 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              products.map((product) => (
                <Card
                  key={product._id}
                  className="overflow-hidden cursor-pointer"
                  onClick={() => handleProductClick(product._id)}
                >
                  <CardContent className="p-4">
                    <img
                      alt={product.equipmentType}
                      className="mb-4 aspect-square rounded-lg object-cover"
                      height={200}
                      src={product.images[0] || '/placeholder.svg'}
                      width={200}
                    />
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{product.equipmentType}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-600">
                          {product.rating || 'No rating'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      ${product.rentalPricePerDay?.toFixed(2)} / day
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Market;
