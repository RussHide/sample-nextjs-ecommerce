import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { ProductsContext } from '@/context/ProductsContext'

export default function Checkout() {
    const { selectedProducts, setSelectedProducts } = useContext(ProductsContext)
    const [products, setProducts] = useState([])
    const [clientData, setClientData] = useState({
        address: '',
        city: '',
        name: '',
        email: ''
    })
    useEffect(() => {
        const uniqIds = [...new Set(selectedProducts)]
        fetch('/api/products?ids=' + uniqIds.join(','))
            .then(response => response.json())
            .then(json => setProducts(json))
    }, [selectedProducts])

    function addQuantity(id) {
        setSelectedProducts(prev => [...prev, id])
    }

    function subtractQuantity(id) {
        const pos = selectedProducts.indexOf(id)
        if (pos !== -1) {
            setSelectedProducts(prev => {
                return prev.filter((value, index) => index !== pos)
            }
            )
        }
    }
    console.log(products);
    const deliveryPrice = 5
    let subtotal = 0

    if (selectedProducts?.length) {
        for (let id of selectedProducts) {
            const itemPrice = products.find(p => p._id === id)?.price || 0
            subtotal += itemPrice
        }
    }

    const total = subtotal + deliveryPrice

    return (
        <Layout>
            {!products.length && (<div>No products in your shopping cart</div>)}
            {
                products.length && products.map(product => {
                    const amount = selectedProducts.filter(id => id === product._id).length
                    if (amount === 0) return
                    return (
                        <div className='flex mb-5' key={product._id}>
                            <div className='bg-gray-100 p-3 rounded-xl shrink-0'>
                                <img src={product.picture} className='w-24' alt="" />
                            </div>
                            <div className='pl-4'>
                                <h3 className='font-bold text-lg'>{product.name}</h3>
                                <p className='text-sm leading-4 text-gray-500 '>{product.description}</p>
                                <div className='flex'>
                                    <div className='grow'>${product.price}</div>
                                    <div>
                                        <button onClick={() => subtractQuantity(product._id)} className='border-2 border-emerald-300 rounded-lg px-2'>-</button>
                                        <span className='px-2'>
                                            {selectedProducts.filter(id => id === product._id).length}
                                        </span>
                                        <button onClick={() => addQuantity(product._id)} className='bg-emerald-300 text-white rounded-lg px-2'>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )

                })
            }
            <form action="/api/checkout" method='POST'>
                <div className='mt-4'>
                    <input name="name" value={clientData.name} onChange={(e) => setClientData(prev => ({ ...prev, name: e.target.value }))} type="text" className='bg-gray-200 w-full rounded-lg px-4 py-2 mb-2' placeholder='Your name' />
                    <input name="address" value={clientData.address} onChange={(e) => setClientData(prev => ({ ...prev, address: e.target.value }))} type="text" className='bg-gray-200 w-full rounded-lg px-4 py-2 mb-2' placeholder='Street address, number' />
                    <input name="city" value={clientData.city} onChange={(e) => setClientData(prev => ({ ...prev, city: e.target.value }))} type="text" className='bg-gray-200 w-full rounded-lg px-4 py-2 mb-2' placeholder='City and postal code' />
                    <input name="email" value={clientData.email} onChange={(e) => setClientData(prev => ({ ...prev, email: e.target.value }))} type="text" className='bg-gray-200 w-full rounded-lg px-4 py-2 mb-2' placeholder='Email address' />
                </div >
                <div className='mt-4'>
                    <div className='flex my-3  '>
                        <h3 className='grow font-bold text-gray-400'>Subtotal:</h3>
                        <h3 className='font-bold'>${subtotal}</h3>
                    </div>
                </div>
                <div className='mt-4'>
                    <div className='flex my-3  '>
                        <h3 className='grow font-bold text-gray-400'>Delivery:</h3>
                        <h3 className='font-bold'>${deliveryPrice}</h3>
                    </div>
                </div>
                <div className='mt-4'>
                    <div className='flex my-3 border-t-2 pt-3 border-dashed border-emerald-500 '>
                        <h3 className='grow font-bold text-gray-400'>Subtotal:</h3>
                        <h3 className='font-bold'>${total}</h3>
                    </div>
                </div>
                <input type="hidden" name='products' value={selectedProducts.join(',')} />
                <button type='submit' className='bg-emerald-500 px-5 text-white w-full py-2 rounded-xl my-2 shadow-emerald-300 shadow-lg'>Pay ${total}</button>
            </form>

        </Layout>
    )
}
