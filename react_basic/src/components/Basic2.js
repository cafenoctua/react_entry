import React, { useState } from 'react'

const Basic2 = () => {

    const [products, setProducts] = useState([])

    const newProducts = () => {
        setProducts([...products, {
            id: products.length,
            name: "Hello React",

        }])
    }

    return (
        <div>
            <button onClick={newProducts}>Add New Product</button>
            <ul>
                {products.map(products => (
                    <li key={products.id}>{ products.name } id: {products.id}</li>
                ))}
            </ul>
        </div>
    )
}

export default Basic2
