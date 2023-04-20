import { useState } from "react"
import ProductCard from '../components/PorductCard';
import { initMongoose } from "@/lib/mongoose";
import { findAllProducts } from "./api/products";
import Layout from "@/components/Layout";

export default function Home({ products }) {
  console.log(products);
  /* const [products, setProducts] = useState([]) */
  const [search, setSearch] = useState('')
  /*  useEffect(() => {
     fetch('/api/products')
       .then(response => response.json())
       .then(json => setProducts(json))
   }, []) */
  const categoriesName = [...new Set(products.map(p => p.category))]

  let newProducts
  if (search) {
    newProducts = products.filter(p => p.name.toLowerCase().includes(search))
  } else {
    newProducts = products
  }
  return (
    <Layout>
      <div className="p-5">
        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search for products" className="bg-gray-100 w-full py-2 px-4 rounded-xl" />
        <div>
          {
            categoriesName.map(cat => (
              <div key={cat}>
                {newProducts.find(p => p.category === cat) && (
                  <div>
                    <h2 className="text-2xl capitalize py-5">{cat}</h2>
                    <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                      {newProducts.filter(prod => prod.category === cat).map(product => (
                        <div key={product._id} className="px-5 snap-start">
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          }
          <div className="py-4">

          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await initMongoose()
  const products = await findAllProducts()

  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  }
}
