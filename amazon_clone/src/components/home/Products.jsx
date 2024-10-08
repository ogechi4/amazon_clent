import React from 'react'
import { useLoaderData } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star'
import ApiIcon from "@mui/icons-material/Api"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight"
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useDispatch } from 'react-redux'
import { addTocart } from '../../redux/amazonSlice'

const Products = () => {
  // dispatch product to the store
  const dispatch = useDispatch()
  // this is for fetching data with api
    const data = useLoaderData()
    console.log(data)
    const productData = data.data;
    console.log(productData)
  return (
    
    <div className='max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 mdl:grid-cols-4 xl:gap-10 gap-4 px-4'>
      {
        productData.map((item) => (
          <div 
          key={item.id} 
          className='bg-white h-auto border-[1px] border-gray-200 py-8 z-30
          hover:border-transparent shadow-none hover:shadow-testShadow duration-200 relative
          flex flex-col gap-4'>
             <span className='text-xs capitalize italic absolute top-2 right-2 text-gray-500'>
             {item.category}</span>
           <div className='w-full h-auto flex items-center justify-center relative group'>
            <img 
            className='w-52 h-64 object-contain' 
            src={item.image} />
            {/* the inner div which comes out upon hovering */}
           <ul className='w-full h-36 bg-gray-100 absolute bottom-[-170px] 
           flex flex-col items-end justify-center
            gap-2 font-titleFont px-2 border-1 border-r group-hover:bottom-0 duration-700'>
            <li className="productLi">
             Compare 
             <span><ApiIcon/></span>
            </li>
            <li className="productLi">
             Add to Cart 
             <span><ShoppingCartIcon/></span>
            </li>
            <li className="productLi">
             View Details
             <span><ArrowCircleRightIcon/></span>
            </li>
            <li className="productLi">
             Add to  wish List 
             <span><FavoriteIcon/></span>
            </li>
           </ul>
          </div>

         <div className='px-4 z-10 bg-white '>
            <div className='flex items-center justify-between'>
                <h2 className='font-titleFont tracking-wide text-lg font-medium
                text-amazon_blue'>
                  {item.title.substring(0,20)}
                  </h2>
                <p
                 className='text-sm text-gray-600 font-semibold'>
                  ${item.price}
                  </p>
              </div>

            <div>
                <p className='text-sm'>{item.description.substring(0,80)}...</p>
                    {/* icon */}
                <div className='text-yellow-500'>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
           </div>
            </div> 

          
              <button onClick={()=>dispatch(addTocart({
                id:item.id,
                title:item.title,
                description:item.description,
                price:item.price,
                category: item.category,
                image: item.image,
                quantity: 1,
              }))} className='w-full font-titleFont font-medium text-base bg-gradient-to-tr
              from-yellow-400 to-yellow-200 border hover:from-yellow-300 hover:to-yellow-500
              active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-md mt-3'>
                Add to Cart
                </button>
             

         </div>
          </div>
         
        ))
      }
    </div>
    
  )
}

export default Products