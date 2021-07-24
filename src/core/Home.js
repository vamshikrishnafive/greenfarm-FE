import React, { useState, useEffect } from "react";
import { getProducts } from "./apiCore";
import Card from "./Card";
// import Search from "./Search";

import Menu from "./Menu";
import About from "./About";
import HeroSection from "./HeroSection";
import Footer from "./Footer";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold")
      .then((data) => setProductsBySell(data))
      .catch((error) => setError(error));
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt")
      .then((data) => setProductsByArrival(data))
      .catch((error) => setError(error));
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <div>
      <Menu />
      <HeroSection />
      {/* <Search /> */}
      <h2 className="mb-4">Fresh Uploads</h2>
      <div className="row">
        {productsByArrival.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>

      <h2 className="mb-4">Organic</h2>
      <div className="row">
        {productsBySell.map((product, i) => (
          <div key={i} className="col-4 mb-3">
            <Card product={product} />
          </div>
        ))}
      </div>
      <About />
      <Footer />
    </div>
  );
};

export default Home;
