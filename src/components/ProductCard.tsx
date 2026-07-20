import type Product  from '../types/Product';

// This defines what data ProductCard NEEDS to be given to work.
// Think of this as the "parameters" of the component-function.
interface ProductCardProps {
  product: Product;
}

// Destructuring { product } straight out of props means we can write `product.name`
// instead of `props.product.name` everywhere below — just a shorthand.
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="relative border border-bakery-pink/20 rounded-xl bg-white overflow-hidden hover:shadow-md transition-shadow">

      {/* SOLD OUT RIBBON — only renders when is_available is false.
          The `&&` trick: in JavaScript, `false && <X />` evaluates to `false` and renders nothing;
          `true && <X />` evaluates to <X /> and renders it. This is the standard React
          pattern for "show this only if a condition is true." */}
      {!product.is_available && (
        <div className="absolute top-3 -right-8 bg-red-500 text-white text-xs font-semibold px-8 py-1 rotate-45 shadow">
          SOLD OUT
        </div>
      )}

      {/* PHOTO — falls back to a plain pink block with an icon-free placeholder if main_image is null,
          instead of showing a broken image icon. */}
      <div className="aspect-square bg-bakery-pink/10 flex items-center justify-center overflow-hidden">
        {product.main_image ? (
          <img
            src={product.main_image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-bakery-pink/40 font-script text-2xl">Lizzy's Bakery</span>
        )}
      </div>

      {/* TEXT CONTENT */}
      <div className="p-4">
        <p className="text-xs text-bakery-brown/50 uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-bakery-brown mb-1">{product.name}</h3>
        <p className="text-bakery-pink-dark font-medium">
          {/* Number() converts the string "1500.00" from Django into an actual number
              so toLocaleString() can add the thousands comma — "1,500" instead of "1500" */}
          KES {Number(product.base_price).toLocaleString()}
        </p>
      </div>
    </div>
  );
}