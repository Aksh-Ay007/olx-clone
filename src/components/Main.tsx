import { useEffect, useState } from "react";
import Menubar from "./Menubar";
import Navbar from "./Navbar";
import Home from "./Home";
import Footer from "./Footer";

// Define Product type
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
};

function Main() {
  const [prod, setProd] = useState<Product[]>([]); 
  const [filteredProd, setFilteredProd] = useState<Product[]>([]); 
  const [search, setSearch] = useState<string>(""); 
  const [menu, setMenu] = useState<string>(""); // For menu/category filter

  // Fetch products from API
  const getProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json: Product[]) => {
        setProd(json);
        setFilteredProd(json); // Initially set filtered products to all products
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Apply filter whenever the search input or menu changes
  useEffect(() => {
    let filtered = prod;

    // If search is applied
    if (search) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // If menu (category) is selected
    if (menu) {
      filtered = filtered.filter((item) =>
        item.category.toLowerCase() === menu.toLowerCase() // Exact match for category
      );
    }

    setFilteredProd(filtered); // Update filtered products based on search/menu
  }, [search, menu, prod]);

  return (
    <div>
      <Navbar setSearch={setSearch} />
      <Menubar setMenu={setMenu} />
      <Home products={filteredProd} /> 
      <Footer />
    </div>
  );
}

export default Main;
