import type { Product } from "../types/product";
import { ProductCard } from "./ProductCard";
type ProductListProps = {
    products: Product[] 
}
export function ProductList({products}:ProductListProps){
    return(
        <div className="products">
            {products.map((product)=>(
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    )
}