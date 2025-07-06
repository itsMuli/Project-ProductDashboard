import { fetchProductById, fetchProducts } from '@/lib/api'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  params: { id: string }
}

export default async function ProductDetailsPage({ params }: Props) {
  const id = params?.id

  if (!id) return notFound()

  try {
    const product = await fetchProductById(id)
    const allProducts = await fetchProducts()

    const related = allProducts.products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 3)

    return (
      <main className="container py-6 px-4 space-y-10 text-foreground">
        {/* Product Detail Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Product Image Card */}
          <div className="border border-border rounded-lg bg-card text-card-foreground p-4 shadow-md">
            <div className="relative w-full h-64 sm:h-60 md:h-96 rounded-xl overflow-hidden shadow">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-3 text-sm sm:text-base text-card-foreground">
            <h1 className="text-xl sm:text-2xl font-bold">{product.title}</h1>
            <p className="text-muted-foreground">{product.description}</p>

            <div className="flex items-center gap-4">
              <p className="text-green-600 dark:text-green-400 font-semibold text-lg sm:text-2xl">
                ${product.price}
              </p>
              <p className="text-yellow-500">⭐ {product.rating}</p>
            </div>

            <button className="mt-4 w-fit px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm sm:text-base">
              Add to Cart
            </button>
          </div>
        </section>

        {/* Related Products */}
        {related.length > 0 && (
          <section>
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-foreground">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="border border-border rounded-lg p-4 hover:shadow-md transition bg-card text-card-foreground"
                >
                  <div className="relative w-full h-36 sm:h-40 mb-3 rounded overflow-hidden">
                    <Image
                      src={p.thumbnail}
                      alt={p.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="text-md font-semibold">{p.title}</h3>
                  <p className="text-sm text-green-600 dark:text-green-400">${p.price}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return notFound()
  }
}
