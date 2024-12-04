import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../UserHeader';
import Footer from '../Footer';
import axios from 'axios';

function Market() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    equipmentType: '',
    location: '',
    minPrice: 0,
    maxPrice: 100,
    startDate: '',
    endDate: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/equipment', { params: filters });
        if (Array.isArray(response.data)) 
          {

            console.log(response.data);
          setProducts(response.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
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
            <div>
              <h2 className="mb-4 font-semibold">Categories</h2>
              <div className="space-y-2">
                {['Fresh Vegetables', 'Fresh Fruits', 'Organic Foods'].map(
                  (category, index) => (
                    <Link
                      key={index}
                      to="#"
                      className="block text-sm hover:text-green-600"
                      onClick={() =>
                        setFilters((prev) => ({ ...prev, equipmentType: category }))
                      }
                    >
                      {category}
                    </Link>
                  )
                )}
              </div>
            </div>
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
