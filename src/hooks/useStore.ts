import { useEffect, useReducer } from "react";

type StorageKey = "cart";

export interface ProductProps {
  id: number;
  imgSrc: string;
  price: number;
  description: string;
  gender: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviewsCount: number;
  detailedDescription: string;
  brand: string;
  quantity: number;
}

type ReplaceTypes<T> = {
  [K in keyof T]: K extends "sizes" | "colors" ? string : T[K];
};
export type Favourites = Omit<ProductProps, "quantity">;
export type CartItems = ReplaceTypes<ProductProps>;

export interface InitialValue {
  cartItems: Array<CartItems>;
  favourites: Array<Favourites>;
}

interface ActionType {
  type:
  | "incrementItem"
  | "decrementItem"
  | "toggleFavourites"
  | "toggleCartItem"
  | "clearEverything"
  | "cartItems";
  payload?: CartItems | Favourites;
}

const initialValue: InitialValue = {
  cartItems: [],
  favourites: [],
};

const useStore = ({ key }: { key: StorageKey }) => {
  const st = localStorage.getItem(key);
  const updatedData = st !== null ? JSON.parse(st) : initialValue;
  const [state, dispatch] = useReducer(reducer, updatedData);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  function reducer(state: InitialValue, action: ActionType) {
    switch (action.type) {
      case "incrementItem":
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.id === action.payload?.id
              ? {
                ...i,
                quantity: i.quantity + 1,
              }
              : i
          ),
        };

      case "decrementItem":
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.id === action.payload?.id
              ? {
                ...i,
                quantity: i.quantity === 0 ? 0 : i.quantity - 1,
              }
              : i
          ),
        };

      case "toggleFavourites":
        return {
          ...state,
          favourites: state.favourites.some((i) => i.id === action.payload?.id)
            ? state.favourites.filter((i) => i.id !== action.payload?.id)
            : [...state.favourites, action.payload as Favourites],
        };

      case "toggleCartItem":
        return {
          ...state,
          cartItems: state.cartItems.some((i) => i.id === action.payload?.id)
            ? state.cartItems.filter((i) => i.id !== action.payload?.id)
            : [
              ...state.cartItems,
              { ...(action.payload as CartItems), quantity: 1 },
            ],
        };

      case "clearEverything":
        localStorage.removeItem(key);
        return {
          ...state,
          cartItems: [],
          favourites: [],
        };

      default:
        return state;
    }
  }

  return { state, dispatch };
};

export default useStore;
