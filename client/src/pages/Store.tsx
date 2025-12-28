import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingCart, Search, Filter, Star, TrendingUp } from "lucide-react";

export default function Store() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All Products", count: 1247 },
    { value: "baseball", label: "Baseball", count: 342 },
    { value: "fishing", label: "Fishing", count: 456 },
    { value: "golf", label: "Golf", count: 234 },
    { value: "hunting", label: "Hunting", count: 178 },
    { value: "fitness", label: "Fitness", count: 289 },
    { value: "apparel", label: "Apparel", count: 567 },
  ];

  // Mock products - will be replaced with real data from tRPC
  const products = [
    {
      id: 1,
      name: "Rawlings Heart of the Hide Baseball Glove",
      category: "baseball",
      price: 299.99,
      compareAtPrice: 349.99,
      rating: 4.8,
      reviews: 127,
      image: "/api/placeholder/300/300",
      inStock: true,
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Shimano Stella SW Spinning Reel",
      category: "fishing",
      price: 899.99,
      rating: 4.9,
      reviews: 89,
      image: "/api/placeholder/300/300",
      inStock: true,
      badge: "Premium",
    },
    {
      id: 3,
      name: "Titleist Pro V1 Golf Balls (Dozen)",
      category: "golf",
      price: 54.99,
      compareAtPrice: 59.99,
      rating: 4.7,
      reviews: 456,
      image: "/api/placeholder/300/300",
      inStock: true,
    },
    {
      id: 4,
      name: "Hoyt Carbon RX-7 Compound Bow",
      category: "hunting",
      price: 1499.99,
      rating: 4.9,
      reviews: 34,
      image: "/api/placeholder/300/300",
      inStock: true,
      badge: "New Arrival",
    },
    {
      id: 5,
      name: "Rogue Fitness Olympic Barbell",
      category: "fitness",
      price: 325.00,
      rating: 4.8,
      reviews: 234,
      image: "/api/placeholder/300/300",
      inStock: true,
    },
    {
      id: 6,
      name: "Nike Vapor Elite Baseball Cleats",
      category: "baseball",
      price: 129.99,
      compareAtPrice: 149.99,
      rating: 4.6,
      reviews: 178,
      image: "/api/placeholder/300/300",
      inStock: true,
      badge: "Sale",
    },
    {
      id: 7,
      name: "St. Croix Legend Tournament Bass Rod",
      category: "fishing",
      price: 379.99,
      rating: 4.9,
      reviews: 67,
      image: "/api/placeholder/300/300",
      inStock: true,
    },
    {
      id: 8,
      name: "Callaway Rogue ST Max Driver",
      category: "golf",
      price: 549.99,
      compareAtPrice: 599.99,
      rating: 4.7,
      reviews: 123,
      image: "/api/placeholder/300/300",
      inStock: true,
      badge: "Best Seller",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Athlynx Store</h1>
              <p className="text-muted-foreground">
                Premium sports equipment for every athlete
              </p>
            </div>
            <Button size="lg" className="gap-2">
              <ShoppingCart className="h-5 w-5" />
              Cart (0)
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px] h-12">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label} ({cat.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="lg" className="gap-2">
              <Filter className="h-5 w-5" />
              More Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="border-b bg-muted/30">
        <div className="container py-4">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.value)}
                className="whitespace-nowrap"
              >
                {cat.label}
                <Badge variant="secondary" className="ml-2">
                  {cat.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} products
          </p>
          <Select defaultValue="featured">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <Link href={`/store/product/${product.id}`}>
                <div className="relative">
                  {product.badge && (
                    <Badge className="absolute top-2 left-2 z-10">
                      {product.badge}
                    </Badge>
                  )}
                  <div className="aspect-square bg-muted overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
                <CardContent className="pt-4">
                  <Badge variant="outline" className="mb-2 capitalize">
                    {product.category}
                  </Badge>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      ${product.price}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.compareAtPrice}
                      </span>
                    )}
                  </div>
                  {product.inStock ? (
                    <Badge variant="secondary" className="mt-2">
                      In Stock
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="mt-2">
                      Out of Stock
                    </Badge>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled={!product.inStock}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Brands */}
      <div className="border-t bg-muted/30 py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6 text-center">Featured Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {["Rawlings", "Nike", "Shimano", "Titleist", "Hoyt", "Rogue"].map((brand) => (
              <div
                key={brand}
                className="bg-background rounded-lg p-6 flex items-center justify-center hover:shadow-md transition-shadow cursor-pointer"
              >
                <span className="font-semibold text-lg">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="border-t py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 text-primary rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">
                On orders over $50
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 text-primary rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Best Prices</h3>
              <p className="text-muted-foreground">
                Price match guarantee
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 text-primary rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Expert Support</h3>
              <p className="text-muted-foreground">
                24/7 customer service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
