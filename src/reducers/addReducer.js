import { FaSmile } from "react-icons/fa";
import fakeStoreApi from "../APIS/fakeStoreApi";

const INITIAL_STATE = {
  item: [],
  items: [],
  products: [],
  product: [],
  realitems: [],
  totalQuantity: 0,
  sort: "highToLow",
  byStock: false,
  byFastDelivery: false,
  byRating: 0,
  loading: false,
};
export const fetchProducts = () => async (dispatch) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  const data = await response.json();
  dispatch({ type: "FETCH_PRODUCTS", payload: data });
};
export const selectedProduct = (id) => async (dispatch) => {
  console.log(id, "IDDDDDS");
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  const data = await response.json();
  dispatch({ type: "SELECTED_PRODUCT", payload: data });
};
function addReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_ITEM":
      console.log(action, "ahghsgda");
      return {
        ...state,
        item: [...state.item, action.name],
        products: [...state.products, { name: action.name }],
      };
    case "REMOVE_ITEM":
      console.log(action, "REMOPVE");
      return {
        ...state,
        item: state.item.filter((inditem) => inditem !== action.name),
      };
    case "RESET_ITEM":
      console.log(action, "REMOPVE");
      return { ...state, item: [] };
    case "FETCH_PRODUCTS":
      console.log(action, "REMOPVE");
      return {
        ...state,
        loading: true,
        products: action.payload,
      };
    case "SELECTED_PRODUCT":
      console.log(action, "REMOPVE");
      return {
        ...state,

        product: action.payload,
      };
    case "REMOVE_PRODUCT":
      console.log(action, "REMOPVE");
      return {
        ...state,
        product: {},
      };

    case "ADD_PRODUCT":
      console.log("Addd");
      state.loading = false;
      const newItem = action.payload;
      const existingItem = state.items?.find((item) => item.id === newItem.id);
      console.log(existingItem, "exx");
      state.totalQuantity++;

      if (!existingItem) {
        return {
          ...state,

          items: [
            ...state.items,

            {
              id: newItem.id,
              name: newItem.name,
              quantity: 1,
            },
          ],
        };
      } else {
        state.loading = false;
        return {
          ...state,
          items: state.items,
          quantity: existingItem.quantity++,
        };
      }
    case "REMOVE_CART":
      state.loading = false;
      console.log(action, "REMOPVrrrrrrrrrrrrrE");
      const id = action.payload;
      const existingItem1 = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem1.quantity === 1) {
        return {
          ...state,
          items: state.items.filter((inditem) => inditem.id !== id),
        };
      } else {
        return {
          ...state,
          items: state.items,
          quantity: existingItem1.quantity--,
        };
      }
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };
    default:
      return state;
  }
}

export default addReducer;
