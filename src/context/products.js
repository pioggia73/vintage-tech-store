// products context

import React from 'react';
import axios from 'axios';
import url from '../utils/URL';
import {featuredProducts, flattenProducts, paginate} from '../utils/helpers';

export const ProductContext = React.createContext();

export default function ProductProvider({children}) {

    // *********** state values *********** //
    const [loading, setLoading] = React.useState(false);
    const [products, setProducts] = React.useState([]);
    const [featured, setFeatured] = React.useState([]);

    // *********** extra state values ********** //

    const [sorted, setSorted] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [filters, setFilters] = React.useState({
        search: '',
        category: 'all',
        shipping: false,
        price: 'all'
    });

    // ********** data fetching ********** //

React.useEffect(() => {
    setLoading(true);
    axios.get(`${url}/products`)
    .then(response => {
        const featured = featuredProducts(flattenProducts(response.data))
        const products = flattenProducts(response.data)
        setSorted(paginate(products))
        setProducts(products)
        setFeatured(featured)
        setLoading(false)
    })
    return () => {

    }
}, []);

const changePage = (index) => {
    setPage(index)
};

const updateFilters = e => {
    alert(e)
};
    
    return (
        <ProductContext.Provider 
            value={{
                products, 
                loading, 
                featured, 
                sorted, 
                page, 
                filters, 
                changePage, 
                updateFilters}}
        >
            {children}
        </ProductContext.Provider>
    )
}
