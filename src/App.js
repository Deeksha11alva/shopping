import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "./reducers/addReducer";
import ProductDetail from "./components/ProductDetail";
import { Link, useParams } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import Cart from "./Cart";
function App() {
  const [name, setName] = useState("");
  const [searchTerm, setSearchterm] = useState("");
  const [detail, setDetail] = useState(false);
  const dispatch = useDispatch();
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  // const { productId = "1" } = useParams();
  const data = useSelector((state) => state.add);
  // const products = useSelector((state) => state.add.products);
  // console.log(productId, "Ppsppppppppppppppppp");
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  //   console.log(name);
  // if (data.length == 0) {
  //   return <p>No data</p>;
  // }

  const addProduct = (prod) => {
    console.log("0000000000000");
    dispatch({ type: "ADD_PRODUCT", payload: prod });
  };

  const Submithandler = () => {
    dispatch({ type: "ADD_ITEM", name });
    setName("");
  };
  const handleSearch = (e) => {
    setSearchterm(e.target.value);
  };

  const reset = () => {
    dispatch({ type: "RESET_ITEM", searchTerm });
  };
  const transformProducts = () => {
    let sortedProducts = data.products;

    if (data.sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        data.sort === "highToLow"
          ? a.address.geo.lat - b.address.geo.lat
          : b.address.geo.lat - a.address.geo.lat
      );
    }
    return sortedProducts;
  };

  return (
    <div className="App">
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <header className="headerstyle">
        <h1>Shopping cart</h1>
        <button>
          {data.totalQuantity}
          <FaCartArrowDown
            onClick={showCartHandler}
            style={{ height: "57px", width: "36px" }}
          ></FaCartArrowDown>
        </button>
      </header>

      <input value={searchTerm} onChange={(e) => handleSearch(e)} />
      {/* <button onClick={() => submitSerach()}>search</button> */}
      <button onClick={() => reset()}>reset</button>
      <input value={name} onChange={handleChange} />
      <button onClick={Submithandler}>Add</button>
      <div style={{ display: "flex" }}>
        <div className="filters">
          <span>
            <p>Ascending</p>
            <input
              inline
              label="Ascending"
              name="group1"
              type="radio"
              id={`inline-1`}
              onChange={() =>
                dispatch({
                  type: "SORT_BY_PRICE",
                  payload: "lowToHigh",
                })
              }
              checked={data.sort === "lowToHigh" ? true : false}
            />
          </span>
          <span>
            <p>Descending</p>
            <input
              inline
              name="group1"
              type="radio"
              id={`inline-2`}
              onChange={() =>
                dispatch({
                  type: "SORT_BY_PRICE",
                  payload: "highToLow",
                })
              }
              checked={data.sort === "highToLow" ? true : false}
            />
          </span>
        </div>
        {data.item.length === 0 && <p>no item</p>}
        {data?.item
          .filter((item) => item.toLowerCase().includes(searchTerm))
          .map((dta, i) => {
            return (
              <div>
                {dta}
                <button
                  onClick={() => dispatch({ type: "REMOVE_ITEM", name: dta })}
                >
                  Remove
                </button>
              </div>
            );
          })}
        <Routes>
          <Route
            path="/products/:productId"
            element={<ProductDetail />}
            exact
          />
        </Routes>
        {data.loading && <h1>Loading.............</h1>}
        <div className="container">
          {transformProducts()
            .filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((prdt, i) => {
              return (
                <div className="item">
                  <Link to={`/products/${prdt.id}`}>{prdt.name}</Link>
                  {prdt?.company?.name && (
                    <p>{prdt?.company?.name || "hgfh"}</p>
                  )}
                  {prdt?.address?.geo?.lat && (
                    <p>{prdt?.address?.geo?.lat || "kljh"}</p>
                  )}
                  <button className="button" onClick={() => addProduct(prdt)}>
                    ADD TO CART
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;

// import React from "react";
// import Cart from "./components/Cart";
// import { Layout } from "./components/Layout";
// import { MainHeader } from "./components/MainHeader";
// import Products from "./components/Products";
// import { useSelector } from "react-redux";
// import "./App.css";
// function App() {
//   const hide = useSelector((state) => state.ui.toggleVisible);
//   return (
//     <Layout>
//       {hide && <Cart />}
//       <Products />
//     </Layout>
//   );
// }

// export default App;
