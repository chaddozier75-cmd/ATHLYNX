import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
  category: string;
}

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutEmail, setCheckoutEmail] = useState("");
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutAddress, setCheckoutAddress] = useState("");
  const [checkoutCity, setCheckoutCity] = useState("");
  const [checkoutZip, setCheckoutZip] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const categories = [
    { id: "all", name: "All Products", icon: "🛒" },
    { id: "baseball", name: "Baseball", icon: "⚾" },
    { id: "football", name: "Football", icon: "🏈" },
    { id: "basketball", name: "Basketball", icon: "🏀" },
    { id: "fishing", name: "Fishing", icon: "🎣" },
    { id: "golf", name: "Golf", icon: "⛳" },
    { id: "hunting", name: "Hunting", icon: "🦌" },
    { id: "fitness", name: "Fitness", icon: "💪" },
    { id: "apparel", name: "Apparel", icon: "👕" },
    { id: "training", name: "Training", icon: "🏋️" },
  ];

  const products = [
    { id: 1, name: "Pro Baseball Bat", category: "baseball", price: 299.99, image: "⚾", rating: 4.8, reviews: 124 },
    { id: 2, name: "Leather Baseball Glove", category: "baseball", price: 189.99, image: "🧤", rating: 4.9, reviews: 89 },
    { id: 3, name: "Training Baseballs (12pk)", category: "baseball", price: 49.99, image: "⚾", rating: 4.7, reviews: 256 },
    { id: 4, name: "Elite Football", category: "football", price: 129.99, image: "🏈", rating: 4.8, reviews: 178 },
    { id: 5, name: "Football Gloves", category: "football", price: 79.99, image: "🧤", rating: 4.6, reviews: 92 },
    { id: 6, name: "Pro Basketball", category: "basketball", price: 149.99, image: "🏀", rating: 4.9, reviews: 312 },
    { id: 7, name: "Basketball Shoes", category: "basketball", price: 179.99, image: "👟", rating: 4.7, reviews: 445 },
    { id: 8, name: "Fishing Rod Pro", category: "fishing", price: 249.99, image: "🎣", rating: 4.8, reviews: 67 },
    { id: 9, name: "Tackle Box Complete", category: "fishing", price: 89.99, image: "🧰", rating: 4.5, reviews: 134 },
    { id: 10, name: "Golf Club Set", category: "golf", price: 899.99, image: "⛳", rating: 4.9, reviews: 56 },
    { id: 11, name: "Golf Balls (24pk)", category: "golf", price: 39.99, image: "🏌️", rating: 4.6, reviews: 289 },
    { id: 12, name: "Hunting Rifle Scope", category: "hunting", price: 349.99, image: "🔭", rating: 4.8, reviews: 78 },
    { id: 13, name: "Camo Jacket", category: "hunting", price: 149.99, image: "🧥", rating: 4.7, reviews: 112 },
    { id: 14, name: "Adjustable Dumbbells", category: "fitness", price: 399.99, image: "🏋️", rating: 4.9, reviews: 567 },
    { id: 15, name: "Resistance Bands Set", category: "fitness", price: 29.99, image: "💪", rating: 4.5, reviews: 892 },
    { id: 16, name: "ATHLYNX Performance Tee", category: "apparel", price: 34.99, image: "👕", rating: 4.8, reviews: 234 },
    { id: 17, name: "ATHLYNX Hoodie", category: "apparel", price: 69.99, image: "🧥", rating: 4.9, reviews: 189 },
    { id: 18, name: "Speed Ladder", category: "training", price: 24.99, image: "🪜", rating: 4.6, reviews: 345 },
    { id: 19, name: "Agility Cones (20pk)", category: "training", price: 19.99, image: "🔶", rating: 4.7, reviews: 456 },
    { id: 20, name: "Pitching Machine", category: "baseball", price: 1299.99, image: "⚾", rating: 4.9, reviews: 34 },
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: typeof products[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        toast.success(`Added another ${product.name}`);
        return prev.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      toast.success(`${product.name} added to cart!`);
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1, image: product.image, category: product.category }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    toast.info("Item removed from cart");
  };

  const updateQty = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = item.qty + delta;
        if (newQty <= 0) return item;
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const shipping = cartTotal > 100 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const orderTotal = cartTotal + shipping + tax;

  const handleCheckout = async () => {
    if (!checkoutEmail || !checkoutName || !checkoutAddress || !checkoutCity || !checkoutZip) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In production, this would create a Stripe checkout session
    toast.success("🎉 Order placed successfully! Check your email for confirmation.");
    setCart([]);
    setShowCheckout(false);
    setShowCart(false);
    setIsProcessing(false);
    
    // Reset form
    setCheckoutEmail("");
    setCheckoutName("");
    setCheckoutAddress("");
    setCheckoutCity("");
    setCheckoutZip("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowCart(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#1a1a2e] border-l border-white/10 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Your Cart ({cartCount})</h2>
                <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-white text-2xl">×</button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <span className="text-6xl mb-4 block">🛒</span>
                  <p className="text-gray-400">Your cart is empty</p>
                  <button
                    onClick={() => setShowCart(false)}
                    className="mt-4 px-6 py-2 bg-yellow-500 text-black rounded-lg font-semibold"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 bg-white/5 rounded-xl p-4">
                        <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center text-3xl">
                          {item.image}
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-semibold text-sm">{item.name}</p>
                          <p className="text-yellow-400 font-bold">${item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              className="w-6 h-6 bg-white/10 rounded text-white hover:bg-white/20"
                            >
                              -
                            </button>
                            <span className="text-white w-8 text-center">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              className="w-6 h-6 bg-white/10 rounded text-white hover:bg-white/20"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-red-400 text-sm hover:text-red-300"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div className="border-t border-white/10 pt-4 space-y-2">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? <span className="text-green-400">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/10">
                      <span>Total</span>
                      <span>${orderTotal.toFixed(2)}</span>
                    </div>
                    {cartTotal < 100 && (
                      <p className="text-green-400 text-sm text-center">
                        Add ${(100 - cartTotal).toFixed(2)} more for FREE shipping!
                      </p>
                    )}
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full mt-6 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-xl font-bold text-lg hover:opacity-90 transition-all"
                  >
                    Proceed to Checkout
                  </button>
                  <p className="text-gray-500 text-xs text-center mt-2">
                    🔒 Secure checkout powered by Stripe
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setShowCheckout(false)} />
          <div className="relative bg-[#1a1a2e] border border-white/20 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">Checkout</h2>

            {/* Order Summary */}
            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <h3 className="text-white font-semibold mb-3">Order Summary</h3>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>{item.name} × {item.qty}</span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-white/10 mt-3 pt-3">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-bold mt-2 pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="space-y-4 mb-6">
              <h3 className="text-white font-semibold">Shipping Information</h3>
              <input
                type="email"
                value={checkoutEmail}
                onChange={(e) => setCheckoutEmail(e.target.value)}
                placeholder="Email address"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
              />
              <input
                type="text"
                value={checkoutName}
                onChange={(e) => setCheckoutName(e.target.value)}
                placeholder="Full name"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
              />
              <input
                type="text"
                value={checkoutAddress}
                onChange={(e) => setCheckoutAddress(e.target.value)}
                placeholder="Street address"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={checkoutCity}
                  onChange={(e) => setCheckoutCity(e.target.value)}
                  placeholder="City"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                />
                <input
                  type="text"
                  value={checkoutZip}
                  onChange={(e) => setCheckoutZip(e.target.value)}
                  placeholder="ZIP code"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>

            {/* Test Card Info */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
              <p className="text-green-400 font-semibold text-sm mb-1">🧪 Test Mode</p>
              <p className="text-gray-400 text-xs">
                Use test card: <span className="text-white font-mono">4242 4242 4242 4242</span>
              </p>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-xl font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : `Pay $${orderTotal.toFixed(2)}`}
            </button>
            <p className="text-gray-500 text-xs text-center mt-2">
              🔒 Your payment is secure and encrypted
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <span className="text-xl font-black text-white">ATHLYNX</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/home" className="text-gray-400 hover:text-white">Platform</Link>
            <Link href="/store" className="text-yellow-400 font-semibold">Store</Link>
            <Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link>
          </nav>
          <button
            onClick={() => setShowCart(true)}
            className="relative flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-all"
          >
            <span>🛒</span>
            <span>${cartTotal.toFixed(2)}</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold mb-4">
              🛒 OFFICIAL STORE
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
              ATHLYNX <span className="text-yellow-400">Store</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Premium sports equipment for every athlete • Free shipping on orders over $100
            </p>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-yellow-500 text-black font-semibold"
                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-yellow-500/50 transition-all group"
              >
                <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-6xl">
                  {product.image}
                </div>
                <div className="p-4">
                  <p className="text-white font-semibold text-sm mb-1 line-clamp-2">{product.name}</p>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="text-gray-400 text-xs">{product.rating} ({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-white">${product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-all"
                    >
                      <span>+</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Brands */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-10">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Featured Brands</h3>
            <div className="flex justify-center gap-8 flex-wrap">
              {["Nike", "Adidas", "Under Armour", "Rawlings", "Wilson", "Easton"].map((brand) => (
                <div key={brand} className="text-gray-500 font-semibold text-lg hover:text-white transition-all cursor-pointer">
                  {brand}
                </div>
              ))}
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center">
            <Link href="/" className="text-cyan-400 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
