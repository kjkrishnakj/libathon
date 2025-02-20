import React, { useEffect } from 'react' 
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import "aos/dist/aos.css";
import AOS from "aos";

import Head from "next/head";
 
import { useRouter } from 'next/router'
const Signup = (rnum) => {
    const router = useRouter()

    useEffect(() => {
        AOS.init();
        // if (localStorage.getItem('token')) {
        //     router.push('/')
        // }
    }, [])
    const [name, setName] = useState('');
    const [rno, setRno] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        if (e.target.name == 'name') {
            setName(e.target.value);
        }
        else if (e.target.name == 'rno') {
            setRno(e.target.value);
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { name: name, rno, password }
        rnum=rno;
        // console.log("rnum ",rnum);
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        
        let response = await res.json()
        // console.log(response);
        setRno('')
        
        setName('')
        setPassword('')
        // toast.success("welcome " + name + " 🙃", { autoClose: 1000 })
        setTimeout(() => {
            router.push('/login')
        }, 1000)

    }

    return (
        <div>
            {/* <ToastContainer /> */}
            <Head><title>lib | Signup</title></Head>
            <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mt-16  sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <Image className='mx-auto' src={logo} alt="" style={{ height: "4rem", width: "6rem" }}></Image> */}
                    <h2 data-aos="zoom-in" className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up for your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" data-aos="zoom-in">
                    <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <div className="mt-2">
                                <input value={name} onChange={handleChange} id="name" name="name" type="text" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="rno" className="block text-sm font-medium leading-6 text-gray-900">registration</label>
                            <div className="mt-2">
                                <input value={rno} onChange={handleChange} id="rno" name="rno" type="string" autoCmplete="rno" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>


                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?
                        <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup
