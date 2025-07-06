export interface Product {
    id: number
    title: string
    description: string
    price: number
    rating: number
    category: string
    thumbnail: string
    images: string[]
}

export interface ProductResponse{
    products: Product[]
    total: number
    skip: number
    limit: number
}

export async function fetchProducts(): Promise<ProductResponse> {
  const res = await fetch('https://dummyjson.com/products')
  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }
  return res.json()
}

export async function fetchProductById(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}
