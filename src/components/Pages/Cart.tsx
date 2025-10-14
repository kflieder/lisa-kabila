import React from 'react'
import { db } from '../../firebase.config'

function Cart() {
  console.log(db);
  return (
    <div className="fixed top-20 right-0 w-[80vw] h-[8vh] flex items-center justify-center border bg-white">
      Cart page
    </div>
  )
}

export default Cart
