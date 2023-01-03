import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectedProduct } from "../reducers/addReducer";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const selected = useSelector((state) => state.add);
  console.log(selected, "SELECTED");
  useEffect(() => {
    dispatch(selectedProduct(productId));
    return () => {
      dispatch({ type: "REMOVE_PRODUCT" });
    };
  }, []);
  return <div>{selected.product.name}BNFXHHHHH</div>;
};

export default ProductDetail;
