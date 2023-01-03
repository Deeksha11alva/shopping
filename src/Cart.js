import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
const Cart = (props) => {
  const dispatch = useDispatch();
  const cartproducts = useSelector((state) => state.add);
  console.log(cartproducts, "PPP");
  return (
    <Modal onClose={props.onClose}>
      {!cartproducts.items.length && <p>noProducts</p>}
      {cartproducts.items.map((data) => {
        return (
          <>
            <p>{data.name}</p>
            <p>quantity:{data.quantity}</p>
            <button
              className="button"
              onClick={() =>
                dispatch({ type: "REMOVE_CART", payload: data.id })
              }
            >
              REMOVE PRODUCT
            </button>
            <hr />
          </>
        );
      })}
    </Modal>
  );
};

export default Cart;
