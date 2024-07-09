import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CheckcircleIcon from '@mui/icons-material/CheckCircle'
import { decrementQuantity, deleteItem,incrementQuantity,resetCart } from '../redux/amazonSlice'
import { emptyCart } from '../assets'
import { ToastContainer, toast} from "react-toastify"

import StripeCheckout from 'react-stripe-checkout';

import axios from "axios"

function Cart() {
    // this dispatch is for the delete
    const dispatch = useDispatch()
    const products = useSelector((state) => state.amazon.products)
    const userInfo = useSelector((state) => state.amazon.userInfo)
    const [payNow, setPayNow] =useState(false)

    const [totalPrice, setTotalPrice] = useState('')

    useEffect(() =>{
        let Total = 0
        products.map((item) => { 
            Total += item.price * item.quantity
            return setTotalPrice(Total.toFixed(2))
         })
    }, [products])

    // handle checkout

    const handleCheckOut =()=> {
       if(userInfo){
        setPayNow(true)
       }else{
        toast.error("Please sign in to Checkout")
       }
    }

    // payment token from the server
    const payment = async(token)=>{
    await axios.post("http://localhost:8000/pay", {
        amount: totalPrice * 100,
        token: token,
    })
    }
    return (
        <div className='w-full bg-gray-100 p-4'>
           {
            products.length > 0 ? (
                <div className='container mx-auto h-auto grid grid-cols-5 gap-8'>
                <div className='w-full h-full bg-white px-4 col-span-4'>
                    <div className='font-titleFont flex items-center justify-between border-b-[1px]
                    border-b-gray-400 py-3'>
                        <h2 className='text-3xl font-medium'>Shopping Cart</h2>
                        <h4 className='text-xl font-normal'>Subtitle</h4>
                    </div>
                    {/* products */}
                    <div>
                        {
                            products.map((item)=>(
                               <div key={item.id} className='w-full border-b-[1px] border-b-gray-300 p-4 flex
                               items-center gap-6'>
                                 <div  className='w-full flex items-center justify-center gap-6'>
                                 <div className='w-1/5' >
                                    <img 
                                    className='w-full h-44 object-contain'
                                    alt='imageItem'
                                     src={item.image}  /> 
                                </div>
                                {/* decsriptio */}
                                <div className='w-4/5' >
                                    <h2 className='font-semibold text-lg'>{item.title}</h2>
                                    <p className='text-sm'>{item.description.substring(0,100)}</p>
                                    <p className='text-base'>
                                        Unit Price <span className='font-semibold'>${item.price}</span>
                                    </p>
                                    <div className='bg-[#f0f2f2] flex justify-center items-center 
                                    gap-1 w-24 py-1 text-center drop-shadow-lg rounded-md'>
                                        <p>Qty:</p>
                                        <p onClick={() => dispatch(decrementQuantity(item.id))} className='cursor-pointer bg-gray-300 px-1 rounded-md
                                        hover:bg-gray-400 duration-300'>
                                            -
                                            </p>
                                        <p>{item.quantity}</p>
                                        <p onClick={()=>dispatch(incrementQuantity(item.id))} className='cursor-pointer bg-gray-300 px-1 rounded-md
                                        hover:bg-gray-400 duration-300'>
                                            +
                                            </p>
                                    </div>
                                    <button onClick={()=>dispatch(deleteItem(item.id))} className='bg-red-500 w-36 py-1 rounded-lg text-white mt-2 
                                    hover:bg-red-700 active:bg-red-900 duration-300'>
                                        Delete Item
                                        </button>
                                </div>
                           {/* total price */}
                                <div>
                                    <p className='text-lg font-titleFont font-semibold'>
                                       ${item.price*item.quantity}
                                        </p>
                                </div>

                                 </div>
                               </div>
                              
                            ))
                        }
                    </div>

                    <div onClick={()=> dispatch(resetCart())} className='w-full py-2'>
                        <button className='px-10 py-2 bg-red-500 hover:bg-red-600 active:bg-red-500
                        text-white rounded-lg font-titlefont font-semibold text-lg tracking-wide'>Clear Cart</button>
                    </div>
                </div>
                <div className='lg:w-full w-[150%] ml-12 lg:m-0 h-52 bg-green-600 lg:col-span-1 col-span-2 lg:flex flex-col justify-center items-center p-2'>
                    <div>
                        <p className='flex ga-2 items-start text-sm'>
                            <span>
                          <CheckcircleIcon className='bg-white text-green-500 rounded-full' />
                            </span>{" "}
                            Your order qualifies for FREE shipping Choose this option at checkout.
                            See details....
                            </p>
                    </div>
                    <div>
                        <p className='font-semibold px-3 lg:px-10 py-1 flex items-center gap-2 justify-between
                        '>Total: <span className='text-lg font-bold'>${totalPrice}</span></p>
                    </div>
                    <button onClick={handleCheckOut} className='w-full font-titleFont font-medium text-base bg-gradient-to-tr
                    from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-50
                    border-yellow-500 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500
                    duration-200 py-1.5 rounded-md mt-3'>Proceed to pay</button>
                    {
                        payNow && <div className='w-full mt-6 flex items-center justify-center'>
                        <StripeCheckout
                        stripeKey='sk_test_51PYzTxRpU8xePhxGbOEa3ottA76N75wpUnY13RRBDsYXRXQ6XI9N4B2fGxyzoty95CV4hq85BeTN5qYGdADzc6HT00pOuCt9Fd'
                        name='Amazon store clone'
                        amount={totalPrice * 100}
                        label='Pay to Princewill'
                        description={`Your Payment amount is $${totalPrice}`}
                        token={payment}
                        email={userInfo.email}
                        />
                        </div>
                    }
                </div>
            </div>

            ):<motion.div 
            initial={{y: 70, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 0.5, duration: 0.5}}
             className='flex justify-center items-center ga-4 py-10'>
                <div>
                    <img
                    className='w-80 rounded-lg p-4 mx-auto'
                     src={emptyCart} alt="emptycart" />
                </div>
                <div className='w-96 p-4 bg-white flex flex-col items-center rounded-md shadow-lg'>
                    <h1 className='font-titleFont text-xl font-bold'>Your Cart is Empty</h1>
                    <p className='text-sm text-center'>Give your Cart purpose- fill it ....</p>
                   <Link to="/">
                   <button className='mt-6 bg-yellow-400 rounded-md cursor-pointer
                    hover:bg-yellow-500 active:bg-yellow-700 px-8 py-2 font-titleFont font-semibold
                    text-lg'>Continue Shopping</button>
                   </Link>
                </div>
            </motion.div>
           }

         <ToastContainer
            position="top-left"
            autoClose ={2000}
            hideProgressBar ={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
        </div>
    )
}

export default Cart
