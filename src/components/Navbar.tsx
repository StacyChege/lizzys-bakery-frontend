import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu as MenuIcon } from 'lucide-react';
import { useState } from 'react';

// NOTE: Just fake placeholders for tonight. We will replace these 
// with actual dynamic state from context hooks in Week 2 (for Auth) and Week 4 (for the Cart).
const STUB_cartItemCount = 0;
const STUB_isLoggedIn = false;

export default function Navbar() {
  // Simple toggle state to show/hide the mobile slide-down menu
  const [mobileOpen, setMobileOpen] = useState(false);

  // Centralized navigation items so we only have to edit links in one place
  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Menu', to: '/menu' },
    { label: 'Custom Cake', to: '/custom-cake' },
    { label: 'Location', to: '/location' },
  ];

  return (
    <header className="bg-bakery-cream border-b border-bakery-pink/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        
        {/* Main Brand Logo - Uses the cursive font style */}
        <Link to="/" className="font-script text-3xl text-bakery-pink-dark">
          Lizzy's Bakery
        </Link>

        {/* Desktop Navigation - Standard flex layout, hidden completely on small screens */}
        <nav className="hidden md:flex items-center gap-6 font-body text-bakery-brown">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-bakery-pink transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Icons Panel (Cart, User Account, and Mobile Menu Button) */}
        <div className="flex items-center gap-4">
          
          {/* Cart Icon with a conditional badge count notification */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-bakery-brown" />
            {STUB_cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-bakery-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {STUB_cartItemCount}
              </span>
            )}
          </Link>

          {/* Account Icon: Redirects to user details if logged in, otherwise routes straight to /login */}
          <Link to={STUB_isLoggedIn ? '/account' : '/login'}>
            <User className="w-6 h-6 text-bakery-brown" />
          </Link>

          {/* Hamburger Icon - Only appears on smaller viewport sizes to toggle drawer */}
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            <MenuIcon className="w-6 h-6 text-bakery-brown" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer - Drops down right below the main bar header */}
      {mobileOpen && (
        <nav className="md:hidden flex flex-col gap-3 px-4 pb-4 font-body text-bakery-brown">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}