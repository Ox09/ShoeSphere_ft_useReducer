import { useState } from "react";
import { Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useParams, useNavigate } from "react-router-dom";
import useStore, { CartItems } from "@/hooks/useStore";
import { cardData } from "@/data/data";

export default function ProductDetails() {
  const { state, dispatch } = useStore({ key: "cart" });
  const { productId } = useParams();
  const product =
    cardData.find((i) => productId && i.id === Number(productId)) ||
    ({} as CartItems);
  const [selectedDetalis, setSelectedDetails] = useState<CartItems>({
    ...product,
    colors: product?.colors[0] ?? "Black",
    sizes: product?.sizes[0] ?? "Universal",
    quantity: 1,
  });
  const navigate = useNavigate();
  const isInCart = state.cartItems?.some(
    (i: CartItems) => i.id === selectedDetalis.id
  );
  console.log(product?.id, Number(productId));
  return (
    <div className="p-6 pb-28 h-full overflow-y-auto">
      <div className="flex items-center mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-6 h-6 text-gray-600 cursor-pointer" />
        <h2 className="text-lg font-semibold ml-4">Product Details</h2>
      </div>

      <div className="mb-6">
        <img
          src={product?.imgSrc}
          alt={product?.description}
          className="w-full h-auto rounded-lg"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Select Color:</h3>
        <RadioGroup
          defaultValue={product?.colors?.[0]}
          onValueChange={(val) => {
            setSelectedDetails(
              (prev) => ({ ...prev, colors: val } as CartItems)
            );
          }}
          className="flex space-x-2"
        >
          {product?.colors?.map((color: string) => (
            <div key={color} className="flex items-center space-x-2">
              <RadioGroupItem value={color} id={`color-${color}`} />
              <Label htmlFor={`color-${color}`}>{color}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Select Size:</h3>
        <RadioGroup
          defaultValue={selectedDetalis.sizes?.[0]}
          onValueChange={(val) => {
            setSelectedDetails(
              (prev) => ({ ...prev, sizes: val } as CartItems)
            );
          }}
          className="flex flex-wrap gap-2"
        >
          {product?.sizes?.map((size: string) => (
            <div key={size} className="flex items-center">
              <RadioGroupItem
                value={size}
                id={`size-${size}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`size-${size}`}
                className="px-3 py-2 rounded-md border border-gray-200 cursor-pointer  peer-data-[state=checked]:bg-orange-200 peer-data-[state=checked]:text-red-600"
              >
                {size}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <h1 className="text-2xl font-bold mb-2">{product?.description}</h1>
      <p className="text-sm text-gray-600 mb-4">
        {product?.detailedDescription}
      </p>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm font-semibold">
            {product?.rating.toFixed(1)}
          </span>
          <span className="ml-2 text-sm text-gray-500">
            ({product?.reviewsCount} reviews)
          </span>
        </div>
        <div className="text-xl font-bold">${product?.price.toFixed(2)}</div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-semibold">Brand: {product?.brand}</span>
        <span className="text-sm font-semibold">Gender: {product?.gender}</span>
      </div>

      {isInCart ? (
        <Button
          className="w-full py-3 text-lg font-semibold"
          onClick={() => navigate("/cart")}
        >
          Check out
        </Button>
      ) : (
        <Button
          className="w-full py-3 text-lg font-semibold"
          onClick={() =>
            dispatch({
              type: "toggleCartItem",
              payload: selectedDetalis as CartItems,
            })
          }
        >
          Add to Cart - ${product?.price.toFixed(2)}
        </Button>
      )}
    </div>
  );
}
