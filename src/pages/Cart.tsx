import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import useStore from "@/hooks/useStore";
import { Checkbox } from "@radix-ui/react-checkbox";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Minus, Plus, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const { state, dispatch } = useStore({ key: "cart" });
  const navigate = useNavigate();
  const subtotal = state?.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = state?.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="p-4 pb-28 h-full overflow-y-auto">
      <div className="flex justify-between">
        <ArrowLeft
          className="w-5 h-5 text-gray-600 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <Button
          variant={"ghost"}
          className=" text-gray-600"
          onClick={() => dispatch({ type: "clearEverything" })}
        >
          Clear all
        </Button>
      </div>
      <Accordion type="multiple" defaultValue={["item-2"]}>
        <AccordionItem value="item-1" data-state="open">
          <AccordionTrigger className="text-xl">
            Favourites ({state.favourites.length})
          </AccordionTrigger>
          <AccordionContent>
            <div className="mt-4 space-y-4">
              {state?.favourites?.map((item, id) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="border-b pb-3"
                >
                  <Link
                    to={`/${item.id}`}
                    className="flex items-center space-x-4  pb-4 cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden">
                      <img
                        src={item.imgSrc}
                        alt={`Product ${id}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.description}</h3>
                      <p className="font-bold">${item.price}</p>
                    </div>
                    <Heart
                      className="h-5 w-5 cursor-pointer"
                      fill="#ff345d"
                      strokeWidth={0}
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch({ type: "toggleFavourites", payload: item });
                      }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-500 text-lg ">
              Your Favourites{" "}
              <Heart
                className="h-5 w-5 cursor-pointer"
                fill="#585858"
                strokeWidth={0}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-xl">Cart ({state.cartItems.length})</AccordionTrigger>
          <AccordionContent>
            <div className="mt-4 space-y-4">
              {state?.cartItems?.map((item, id) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="border-b pb-3"
                >
                  <Link
                    to={`/${item.id}`}
                    className="flex items-center space-x-4  pb-4 cursor-pointer"
                  >
                    {" "}
                    <Checkbox />
                    <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden">
                      <img
                        src={item.imgSrc}
                        alt={`Product ${id}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.description}</h3>
                      <p className="font-bold">
                        ${item.price}{" "}
                        <span className=" font-normal text-gray-500 ml-2">
                          {item.sizes}
                        </span>
                        <span className=" font-normal text-gray-500 ml-2">
                          {item.colors}
                        </span>
                      </p>
                    </div>
                  </Link>
                  <div className="flex gap-3 justify-end">
                    {" "}
                    <div className="flex items-center space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          dispatch({ type: "decrementItem", payload: item })
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() =>
                          dispatch({ type: "incrementItem", payload: item })
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        dispatch({ type: "toggleCartItem", payload: item })
                      }
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="font-semibold">Subtotal:</span>
              <span className="font-bold">${subtotal?.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-4">Buy Now ({totalItems})</Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>{" "}
    </div>
  );
}
