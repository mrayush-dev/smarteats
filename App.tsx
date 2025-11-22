import React, { useState, useMemo } from 'react';
import { MOCK_RESTAURANTS, CUISINES } from './constants';
import { Restaurant, MenuItem, CartItem, ViewState } from './types';
import { ShoppingBag, Star, Clock, Search, ChevronLeft, Plus, Minus, Trash2, Sparkles, MapPin } from 'lucide-react';
import { Button } from './components/Button';
import { AIConcierge } from './components/AIConcierge';

// --- Subcomponents defined within file for simplicity due to shared context ---

const Navbar: React.FC<{
  cartCount: number;
  onCartClick: () => void;
  onLogoClick: () => void;
  onAIClick: () => void;
}> = ({ cartCount, onCartClick, onLogoClick, onAIClick }) => (
  <nav className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="cursor-pointer flex items-center gap-1" onClick={onLogoClick}>
          <div className="bg-orange-500 p-1.5 rounded-lg">
            <span className="text-white font-bold text-xl">Z</span>
          </div>
          <span className="text-2xl font-bold text-gray-900 tracking-tight">wiggy</span>
        </div>
        <div className="hidden md:flex items-center text-gray-500 text-sm gap-2 cursor-pointer hover:text-orange-500 transition">
            <MapPin className="w-4 h-4" />
            <span className="font-medium underline decoration-dashed">New York, USA</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
         <button 
          onClick={onAIClick}
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
        >
          <Sparkles className="w-4 h-4" />
          <span className="font-medium text-sm">Ask Genie</span>
        </button>

        <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input 
                type="text" 
                placeholder="Search for food..." 
                className="pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-64 transition-all" 
            />
        </div>

        <button className="relative p-2 text-gray-600 hover:text-orange-600 transition" onClick={onCartClick}>
          <ShoppingBag className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-orange-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {cartCount}
            </span>
          )}
        </button>
        
        <button 
          onClick={onAIClick}
          className="md:hidden p-2 text-purple-600 hover:bg-purple-50 rounded-full"
        >
          <Sparkles className="w-6 h-6" />
        </button>
      </div>
    </div>
  </nav>
);

const RestaurantCard: React.FC<{ restaurant: Restaurant; onClick: () => void }> = ({ restaurant, onClick }) => (
  <div 
    onClick={onClick}
    className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
  >
    <div className="relative h-48 overflow-hidden">
      <img 
        src={restaurant.image} 
        alt={restaurant.name} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
        {restaurant.discount && (
           <span className="text-white font-extrabold text-lg tracking-wide drop-shadow-sm">{restaurant.discount}</span>
        )}
      </div>
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-800 shadow-sm">
        {restaurant.deliveryTime}
      </div>
    </div>
    <div className="p-4">
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors">{restaurant.name}</h3>
        <div className="flex items-center bg-green-100 px-1.5 py-0.5 rounded text-green-700 font-bold text-xs gap-0.5">
          <span>{restaurant.rating}</span>
          <Star className="w-3 h-3 fill-current" />
        </div>
      </div>
      <p className="text-gray-500 text-sm mb-3 line-clamp-1">{restaurant.cuisine.join(", ")}</p>
      <div className="flex items-center justify-between text-gray-500 text-xs border-t border-gray-100 pt-3">
         <span>${restaurant.priceForTwo} for two</span>
      </div>
    </div>
  </div>
);

const CartDrawer: React.FC<{
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQty: (id: string, delta: number) => void;
}> = ({ cart, isOpen, onClose, onUpdateQty }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 5;
  const total = subtotal + deliveryFee;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-gray-800">Your Order</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <ChevronLeft className="w-6 h-6 rotate-180" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <Button onClick={onClose} variant="outline">Browse Restaurants</Button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 items-center bg-white">
                <div className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                     <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                </div>
                <div className="flex-1">
                    <h4 className="font-medium text-gray-800 line-clamp-1">{item.name}</h4>
                    <p className="text-gray-500 text-sm">${item.price * item.quantity}</p>
                </div>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <button 
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="p-2 hover:bg-gray-50 text-gray-600"
                    >
                        {item.quantity === 1 ? <Trash2 className="w-4 h-4 text-red-500" /> : <Minus className="w-4 h-4" />}
                    </button>
                    <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                    <button 
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="p-2 hover:bg-gray-50 text-green-600"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-gray-50 border-t border-gray-200 space-y-4">
            <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                    <span>Item Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
            <Button className="w-full py-3 text-lg shadow-lg shadow-orange-200" onClick={() => alert("Proceeding to checkout (Mock)")}>
              Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [activeRestaurant, setActiveRestaurant] = useState<Restaurant | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAIConciergeOpen, setIsAIConciergeOpen] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty <= 0 ? null : { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setActiveRestaurant(restaurant);
    setView(ViewState.RESTAURANT_DETAILS);
    window.scrollTo(0, 0);
  };

  const handleLogoClick = () => {
    setView(ViewState.HOME);
    setActiveRestaurant(null);
  };

  const cartItemCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-900">
      <Navbar 
        cartCount={cartItemCount} 
        onCartClick={() => setIsCartOpen(true)} 
        onLogoClick={handleLogoClick}
        onAIClick={() => setIsAIConciergeOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === ViewState.HOME && (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/20 blur-3xl rounded-full -mr-20 -mt-20"></div>
              <div className="relative z-10 max-w-2xl">
                <span className="inline-block px-3 py-1 rounded-full bg-orange-500 text-xs font-bold mb-4">FREE DELIVERY</span>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Hungry? <br/> We've got you covered.</h1>
                <p className="text-lg text-gray-300 mb-8">Order from the best local restaurants with easy, on-demand delivery.</p>
                <div className="flex flex-wrap gap-4">
                    <Button size="lg" onClick={() => document.getElementById('restaurants')?.scrollIntoView({behavior: 'smooth'})}>
                        Order Now
                    </Button>
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900" onClick={() => setIsAIConciergeOpen(true)}>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Ask Genie
                    </Button>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-1/3 h-full opacity-20 md:opacity-100 pointer-events-none">
                  <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Food" className="w-full h-full object-cover mask-image-linear-gradient" style={{maskImage: 'linear-gradient(to left, black, transparent)'}} />
              </div>
            </div>

            {/* Categories */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">What's on your mind?</h2>
              <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar snap-x">
                {CUISINES.map((c, idx) => (
                  <div key={idx} className="snap-start flex-shrink-0 flex flex-col items-center gap-3 cursor-pointer group">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-transparent group-hover:border-orange-200 transition-all shadow-md">
                      <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-orange-600">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Restaurants Grid */}
            <div id="restaurants">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Top Restaurants in New York</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {MOCK_RESTAURANTS.map(r => (
                  <RestaurantCard key={r.id} restaurant={r} onClick={() => handleRestaurantClick(r)} />
                ))}
              </div>
            </div>
          </div>
        )}

        {view === ViewState.RESTAURANT_DETAILS && activeRestaurant && (
          <div className="animate-in fade-in duration-500">
            <Button variant="ghost" onClick={() => setView(ViewState.HOME)} className="mb-6 pl-0 hover:bg-transparent hover:text-orange-600">
              <ChevronLeft className="w-5 h-5 mr-1" /> Back to Restaurants
            </Button>

            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full -mr-20 -mt-20 blur-3xl opacity-50 pointer-events-none"></div>
                <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{activeRestaurant.name}</h1>
                        <p className="text-gray-500 mb-4">{activeRestaurant.cuisine.join(" • ")}</p>
                        <div className="flex gap-6 text-sm font-medium text-gray-700">
                            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded text-green-700">
                                <Star className="w-4 h-4 fill-current" />
                                {activeRestaurant.rating} Rating
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {activeRestaurant.deliveryTime}
                            </div>
                            <div>${activeRestaurant.priceForTwo} for two</div>
                        </div>
                    </div>
                    <div className="border-2 border-dashed border-orange-200 bg-orange-50 p-4 rounded-xl text-orange-800 text-sm font-bold">
                         {activeRestaurant.discount || "Free Delivery available"}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">Menu</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                </div>
              
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeRestaurant.menu.map(item => (
                        <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between gap-4 hover:shadow-md transition-shadow">
                            <div className="flex-1">
                                <div className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center mb-2 ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
                                    <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
                                </div>
                                <h3 className="font-bold text-gray-800 text-lg mb-1">{item.name}</h3>
                                <span className="block font-medium text-gray-900 mb-2">${item.price}</span>
                                <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
                            </div>
                            <div className="relative w-32 h-32 flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                                    <button 
                                        className="bg-white text-green-600 font-bold px-6 py-2 rounded-lg shadow-lg border border-gray-100 hover:bg-green-50 uppercase text-sm transition"
                                        onClick={() => addToCart(item)}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        )}
      </main>

      <CartDrawer 
        cart={cart} 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onUpdateQty={updateCartQty}
      />

      <AIConcierge 
        isOpen={isAIConciergeOpen} 
        onClose={() => setIsAIConciergeOpen(false)} 
      />
    </div>
  );
}