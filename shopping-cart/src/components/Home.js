import React from "react";
import { CartState } from "../context/Context";
import SingleProduct from "./SingleProduct";
import "./Styles.css";
import Filters from "./Filters";
const Home = () => {
  const {
    state: { products },
    filterState: { byStock, byFastDelivery, byRating, sort, searchQuery },
  } = CartState();
  console.log(products);

  const transformProd = () => {
    let sortedProd = products;
    if (sort) {
      sortedProd = sortedProd.sort((a, b) =>
        sort === "lowtoHigh" ? a.price - b.price : b.price - a.price
      );
    }
    if (!byStock) {
      sortedProd = sortedProd.filter((prod) => prod.inStock);
    }
    if (byFastDelivery) {
      sortedProd = sortedProd.filter((prod) => prod.fastDelivery);
    }
    if (byRating) {
      sortedProd = sortedProd.filter((prod) => prod.ratings >= byRating);
    }
    if (searchQuery) {
      sortedProd = sortedProd.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProd;
  };

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProd().map((prod) => {
          return <SingleProduct prod={prod} key={prod.id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
