// src/Comps/header/Header.jsx
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Play,
  ArrowRight,
  X,
  PhoneCall,
  Mail,
  Twitter,
  Facebook,
  Instagram,
} from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { resetUserState } from '../../../store/UsersSlice';

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

function Header() {
  const token = useSelector((state) => state.users.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const logout = () => {
    // Dispatch action to reset the Redux state
    dispatch(resetUserState());

    // Remove all data from localStorage
    localStorage.clear();
    navigate('/signup');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return;
    }
    // Navigate to the Marketplace page with the search query as a URL parameter
    navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery(''); // Clear the search input
  };

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-xl font-bold text-green-600 hover:text-green-700 transition-colors"
          >
            AgriLink
          </Link>
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
              { name: 'Services', path: '/services' },
              { name: 'MarketPlace', path: '/marketplace' },
              { name: 'News', path: '/news' },
              { name: 'Blog', path: '/blog' },
              { name: 'Contact', path: '/contact' },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-sm hover:text-green-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="rounded-r-md bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500"
            >
              <SearchIcon className="h-4 w-4" />
            </Button>
          </form>

          {/* Mobile Search Button */}
          <Disclosure>
            {({ open }) => (
              <>
                <DisclosureButton className="md:hidden flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open search</span>
                  <SearchIcon className="h-6 w-6" />
                </DisclosureButton>
                <DisclosurePanel className="md:hidden">
                  <form onSubmit={handleSearchSubmit} className="flex items-center px-2 py-2 space-x-2">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                    <Button
                      type="submit"
                      size="icon"
                      variant="ghost"
                      className="bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500"
                    >
                      <SearchIcon className="h-4 w-4" />
                    </Button>
                  </form>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>

          {/* Shopping Cart Icon */}
          <Button size="icon" variant="ghost" onClick={() => navigate('/cart')}>
            <ShoppingCartIcon className="h-4 w-4" />
          </Button>

          {/* User Authentication */}
          {token === "" ? (
            <Link to='/signup'>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 p-1 hover:shadow-lg hover:border-gray-500 transition-all">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          ) : (
            <>
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 p-1 hover:shadow-lg hover:border-gray-500 transition-all">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt="User Avatar"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                      className="w-full h-full object-cover"
                    />
                  </MenuButton>
                </div>
                <Menu.Items
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`block px-4 py-2 text-sm text-gray-700 ${
                          active ? 'bg-gray-100' : ''
                        }`}
                      >
                        Your Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/settings"
                        className={`block px-4 py-2 text-sm text-gray-700 ${
                          active ? 'bg-gray-100' : ''
                        }`}
                      >
                        Settings
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={`block w-full text-left px-4 py-2 text-sm text-gray-700 ${
                          active ? 'bg-gray-100' : ''
                        }`}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
