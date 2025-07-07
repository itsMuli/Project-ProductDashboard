'use client'

import Link from 'next/link'
import { Product } from "@/lib/api"
import Image from "next/image"
import { Button } from './ui/button'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  return (
    <div>
      <Link href={`/products/${product.id}`} className="block">
      <div className="bg-card text-card-foreground transition-all duration-300 border border-border rounded-lg shadow-sm hover:shadow-md p-4 flex flex-col w-full h-full group">
        
        {/* Product Image */}
        <div className="relative w-full h-40 sm:h-48 md:h-52 lg:h-56 mb-3 overflow-hidden rounded-lg">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex flex-col flex-grow space-y-1">
          <h2 className="font-semibold text-base md:text-lg text-foreground line-clamp-1">
            {product.title}
          </h2>
          <p className="text-sm text-muted-foreground capitalize">
            {product.category}
          </p>

          <div className="flex items-center justify-between mt-1">
            <p className="text-green-600 dark:text-green-400 font-semibold text-sm md:text-base">
              ${product.price}
            </p>
            <span className="text-yellow-500 text-xs md:text-sm">
              ⭐ {product.rating}
            </span>
          </div>
        </div> <Button
        // onClick={() => addToCart?.(product)}
        className="mt-4 w-full bg-green-600 text-white hover:bg-green-700 transition-colors text-sm sm:text-base"
      >
        Add to Cart
      </Button>
      </div>
    </Link>
    </div>
    
  )
}
