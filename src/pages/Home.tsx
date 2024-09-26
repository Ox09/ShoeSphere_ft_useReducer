import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, ShoppingCart, Trash } from "lucide-react";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import useStore from "@/hooks/useStore";
import { cardData } from "@/data/data";

const bgImgSrc = [
  "https://images.unsplash.com/photo-1682985045797-0b781d0c0f7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNob2UlMjBhZHZlbnR1cmV8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHNob2UlMjBhZHZlbnR1cmV8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1528052863036-4f515d9efb0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHNob2UlMjBhZHZlbnR1cmV8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1722973020408-2c7cf449538b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHNob2UlMjBhZHZlbnR1cmV8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1541233033-cbece0bc703f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fHNob2UlMjBhZHZlbnR1cmV8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1510662145379-13537db782dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFkdmVudHVyZXxlbnwwfDF8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1541542684-be0c46417a12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFkdmVudHVyZXxlbnwwfDF8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1485871882310-4ecdab8a6f94?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGFkdmVudHVyZXxlbnwwfDF8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1491494328967-495416eb06ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fGFkdmVudHVyZXxlbnwwfDF8MHx8fDA%3D",
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { state, dispatch } = useStore({ key: "cart" });

  const subtotal = state?.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = state?.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === bgImgSrc.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full">
      <section className=" relative h-[60vh] object-cover w-full px-5 py-4 text-white ">
        <motion.img
          key={currentIndex}
          src={bgImgSrc[currentIndex]}
          alt="Rotating Images"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full absolute inset-0  z-0"
        />
        <header className="relative flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={
                "https://images.unsplash.com/photo-1727224750231-00b06a08e070?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt="Profile"
              className="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <h2 className="text-base font-bold">Paul Martine</h2>
              <span className="text-sm text-gray-500">Premium</span>
            </div>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-[18px] bg-[#fff] p-2 flex items-center gap-2">
                <ShoppingCart color="#404040" className="w-5 h-5" />

                <span className="text-[#404040] text-xl">
                  {state.cartItems.length}
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="absolute right-4 top-4 h-[80%] translate-y-3  w-full max-w-72 overflow-y-auto rounded-lg bg-white shadow-xl sm:right-8 sm:top-8">
              <DialogTitle className="hidden"></DialogTitle>
              <div className="mt-4 space-y-4">
                {state?.cartItems.length > 0 ? (
                  state?.cartItems?.map((item, id) => (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="border-b pb-3"
                    >
                      <div className="flex items-center space-x-4  pb-4">
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
                          <h3 className="text-sm font-semibold">
                            {item.description}
                          </h3>
                          <p className="text-sm font-bold">${item.price}</p>
                        </div>
                      </div>
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
                  ))
                ) : (
                  <div className="flex items-center justify-center gap-2 text-gray-500 text-base ">
                    Your cart is empty !
                  </div>
                )}
              </div>
              <div className="flex flex-col mt-auto items-center">
                <div>
                  <span className="font-semibold">Subtotal:</span>
                  <span className="font-bold">${subtotal?.toFixed(2)}</span>
                </div>
                <Button className="w-full mt-4">Buy Now ({totalItems})</Button>{" "}
              </div>
            </DialogContent>
          </Dialog>
        </header>
        <div className="relative pt-16">
          <h1 className="mt-6 text-4xl text-white font-bold">
            The Ultimate Collection
          </h1>
          <p className="text-gray-300 mb-4">Step into style</p>
        </div>
      </section>
      <section className="bg-[#f9f9f9] rounded-t-[45px] absolute bottom-0 w-full h-[46%]">
        <Carousel
          className="w-full relative -top-20"
          opts={{
            align: "start",
            // loop: true,
          }}
        >
          <CarouselContent className="pl-20 h-[310px]">
            {cardData.map((card) => {
              const isFavourite = state.favourites.some(
                (i) => i.id === card.id
              );
              return (
                <CarouselItem
                  key={card.id}
                  className="flex justify-center basis-auto"
                >
                  {" "}
                  <Card className=" relative w-[8.5rem] h-64  overflow-hidden select-none cursor-pointer shadow-lg">
                    <Button
                      className="absolute right-3 top-3 rounded-full bg-[#fff] p-2 flex items-center gap-2"
                      onClick={() =>
                        dispatch({ type: "toggleFavourites", payload: card })
                      }
                    >
                      {" "}
                      <Heart
                        className="h-5 w-5 cursor-pointer"
                        fill={isFavourite ? "#ff345d" : "transparent"}
                        color={isFavourite ? "#ff345d" : "#585858"}
                      />
                    </Button>{" "}
                    <Link
                      to={`/${card.id}`}
                      state={{ product: card }}
                      className="block h-full"
                    >
                      <img
                        src={card.imgSrc}
                        alt={`Product ${card.id}`}
                        className="h-40 w-full object-cover rounded-[20px] p-2"
                      />
                      <div className="px-4 ">
                        <p className="text-base font-semibold">${card.price}</p>
                        <p className="text-sm leading-5 font-medium text-gray-500">
                          {card.description}
                        </p>
                      </div>
                    </Link>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </section>
    </div>
  );
}
