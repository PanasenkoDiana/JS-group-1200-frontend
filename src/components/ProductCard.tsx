import type { Product } from "../types/product";
type ProductCardProps = {
    product: Product
}
export function ProductCard({product}: ProductCardProps){
    return(
        <div className="Product-Card">
            <span className="Product-Category">
                {product.category.name}
            </span>
            <h2>{product.name}</h2>
            <p className="Product-Price">
                {product.price} грн
            </p>
        </div>
    )
}