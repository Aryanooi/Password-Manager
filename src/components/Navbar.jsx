import React from 'react'
import GitHub from "../../public/icons/github.svg"

const Navbar = () => {
    return (
        <nav className=' bg-slate-800  text-white '>
            <div className="myContainer flex justify-between items-center  px-4 !py-5 h-14">
                <h1 className='font-bold text-2xl'>
                    <span className='text-green-700'>
                        &lt;
                    </span>
                    <span >Pass</span>
                    <span className='text-green-700' >OP</span>
                    <span className='text-green-700'>
                        /&gt;
                    </span>
                </h1>
                <button className='flex justify-between items-center bg-green-600 my-1 gap-1 rounded-full px-1'>
                    <img className='invert w-10' src={GitHub} alt="" srcset="" />
                    <span className='font-bold'>GitHub</span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
