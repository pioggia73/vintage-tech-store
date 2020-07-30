// cart context

import React from 'react';
//import localCart from '../utils/localCart';
import reducer from '../context/reducer';
import {REMOVE} from './actions';

function getCartFromLocalStorage () {
    return localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')) : [];
}

const CartContext = React.createContext();

function CartProvider({children}) {

    const [cart, dispatch] = React.useReducer(reducer, getCartFromLocalStorage());
    const [total, setTotal] = React.useState(0);
    const [cartItems, setCartItems] = React.useState(0);

    React.useEffect(() => {
        // ******* local storage
    localStorage.setItem('cart', JSON.stringify(cart));

        // cart items
    let newCartItems = cart.reduce((total, cartItem) => {
        return (total += cartItem.amount)
    }, 0)
    setCartItems(newCartItems)
    

        // cart total price
        let newCartTotal = cart.reduce((total, cartItem) => {
            return (total += cartItem.price * cartItem.amount)
        }, 0)
        newCartTotal = parseFloat(newCartTotal.toFixed(2))
        setTotal(newCartTotal)
    },[cart]);

    // remove item
    const removeItem = (id) => {
        dispatch({
            type: REMOVE,
            payload: id
        })
        //setCart([...cart].filter(item => item.id !== id))
    }

    // increase amount
    const increaseAmount = (id) => {
        dispatch({
            type: 'INCREASE',
            payload: id
        })
        // const newCart = [...cart].map(item => {
        //    return  item.id === id? {...item, amount: item.amount + 1} : {...item}
        // })
        // setCart(newCart)
    }

    // decrease amount
    const decreaseAmount = (id, amount) => {
            if (amount === 1) {
                dispatch ({type: 'REMOVE', payload: id})
                return;
            } else {
                dispatch ({type: 'DECREASE', payload: id})
            }
        //     removeItem(id);
        //     return
        // } else {
        //     const newCart = [...cart].map(item => {
        //         return item.id === id ? { ...item, amount: item.amount - 1 } : { ...item }
        //     })
        //     setCart(newCart)
        // }
    }

    // add to cart
    const addToCart = product => {
        let item = [...cart].find(item => item.id === product.id);
         if(item) {
             dispatch ({type: 'DECREASE', payload: product.id})
         } else {
             dispatch ({type: 'ADD_TO_CART', payload: product})
         }
       
        // const {id, image, title, price} = product
        // const item = [...cart].find(item => item.id === id);
        // if(item) {
        //     increaseAmount(id);
        //     return
        // } else {
        //     const newItem = {id, image, title, price, amount: 1 }
        //     const newCart = [...cart, newItem];
        //     setCart(newCart);
        // }
    }

    // clear cart
    const clearCart = () => {
        dispatch ({type: 'CLEAR_CART'})
        //setCart([])
    }

    return  <CartContext.Provider value= {{
                    cart, 
                    total, 
                    cartItems, 
                    removeItem, 
                    increaseAmount, 
                    decreaseAmount,
                    addToCart,
                    clearCart 
                    }}>
                {children}
            </CartContext.Provider>
}

export {CartContext, CartProvider};