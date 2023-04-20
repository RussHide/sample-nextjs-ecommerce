import { ProductsContext } from "@/context/ProductsContext"
import { useContext } from "react"

const PorductCard = ({product}) => {
    const {_id, name, description, picture, price, category} = product
    const {setSelectedProducts} = useContext(ProductsContext)
    
    function addProduct (id){
        setSelectedProducts(prev => [...prev, _id])
    }
    return (    
        <div className="w-64">
            <div className="bg-blue-100 p-5 rounded-xl">
                <img src={picture} alt="" />
            </div>
            <div className="mt-2">
                <h3 className="font-bold">{name}</h3>
            </div>
            <p className="text-sm mt-1 leading-4">{description}</p>
            <div className="flex mt-1">
                <div className="text-2xl font-bold grow">${price}</div>
                <button onClick={()=> addProduct(_id)} className="bg-emerald-400 text-white py-1 px-3 rounded-xl">+</button>
            </div>
        </div>
    )
}

export default PorductCard