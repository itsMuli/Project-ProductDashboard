

import ProductCard from './ProductCard'
import { Product } from '@/lib/api'

type Props = {
  products: Product[]
}

export default function ProductGrid({ products }: Props) {
  if (!products || products.length === 0) {
    return <p className="text-gray-500">No products found.</p>
  }

  return (
    <div className="bg-white dark:bg-secondary text-black dark:text-white transition-all duration-30 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
