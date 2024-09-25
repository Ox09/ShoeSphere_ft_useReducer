import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import useStore from "@/hooks/useStore";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { cardData } from "@/data/data";

const cardVariants = (isLeftColumn: boolean) => ({
  hidden: {
    x: isLeftColumn ? -200 : 200, // Left column comes from the left, right column from the right
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 70, // Add a spring effect for more dynamics
      damping: 12, // Damping to smoothen the end
    },
  },
  exit: {
    x: isLeftColumn ? -200 : 200,
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.5,
    },
  },
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Stagger the entrance of each card
    },
  },
};

export default function Explore() {
  const [activeGender, setActiveGender] = useState("Men");
  const { state, dispatch } = useStore({ key: "cart" });

  const genderFilters = ["Men", "Women", "Kids"];
  const filteredCards = cardData.filter((card) => card.gender === activeGender);

  return (
    <div className="p-4 h-screen">
      <h1 className="text-2xl font-semibold mb-4">Discover products</h1>
      <div className="flex space-x-4 mb-6">
        {genderFilters.map((gender) => (
          <Button
            key={gender}
            className={`px-4 py-2 rounded-lg hover:bg-black hover:text-white ${
              activeGender === gender
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            }`}
            onClick={() => setActiveGender(gender)}
          >
            {gender}
          </Button>
        ))}
      </div>
      {/* Products */}
      <div className="h-full overflow-y-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-4 pb-72"
        >
          <AnimatePresence>
            {filteredCards.map((card, index) => {
              const isLeftColumn = index % 2 === 0;
              const isFavourite = state.favourites.some(
                (i) => i.id === card.id
              );
              return (
                <motion.div
                  key={card.id}
                  variants={cardVariants(isLeftColumn)}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                >
                  <Card className=" relative w-44 h-72  overflow-hidden select-none cursor-pointer shadow-lg">
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
                    <Link to={`/${card.id}`} state={{ product: card }}>
                      <img
                        src={card.imgSrc}
                        alt={`Product ${card.id}`}
                        className="h-48 w-full object-cover rounded-[20px] p-2"
                      />
                      <div className="px-4 ">
                        <p className="text-lg font-semibold">${card.price}</p>
                        <p className="text-base leading-5 font-medium text-gray-500">
                          {card.description}
                        </p>
                      </div>
                    </Link>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
