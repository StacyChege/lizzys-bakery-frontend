// This matches ProductListSerializer (the lighter version used for the menu grid,
// NOT ProductDetailSerializer, which has more fields — we don't need those yet).
export default interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;       // StringRelatedField sends the category NAME as plain text, not an object
  base_price: string;     // Django DecimalField comes through JSON as a string, not a number — important!
  main_image: string | null;
  is_available: boolean;
}