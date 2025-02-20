import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div>
            <div className='text-white flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-customGreen py-5 items-center bottom-0 left-0 w-full h-[20vh]' style={{background:"#37AFE1"}}>
                <Link href="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl">BookHive</span>
                </Link>
                <p className='text-sm text-customBlue-200'>All rights reserved. Copyright @book-hive</p>

                <div className='flex'>
                    <div className="footer-content-right text-customBlue-200">
                        <h2>Get in touch</h2>
                        <ul>
                            <li>99XXXXXXXX</li>
                            <li>libathon.vercel.app</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer