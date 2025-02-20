// import Image from 'next/image'
import React, { useEffect } from 'react'
import "aos/dist/aos.css";
import AOS from "aos";
import Link from 'next/link' 

import Head from "next/head";
import { useRouter } from 'next/router'
import { useState } from 'react' 
const Login = (rnum) => {
  const router = useRouter()
  useEffect(() => {
    AOS.init();
    // if (localStorage.getItem('token')) {
    //   router.push('/')
    // }
  }, [])
  const [password, setPassword] = useState('');

    const [rno, setRno] = useState('');


  const handleChange = (e) => {

    if (e.target.name == 'rno') {
      setRno(e.target.value);
    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { rno, password }
    rnum=rno;
    console.log('rnum',rnum);
    
    
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()

    setRno('')
    setPassword('')

    if (response.success) {
      localStorage.setItem('token', response.token)
      localStorage.setItem('rno', rno);



      // toast.success("Logged in successfully 👍", { autoClose: 1000 })
      setTimeout(() => {
        console.log(rno);
        
        router.push(`/?rno=${rno}`)
      }, 1000)
    }
    else {
      // toast.error("Invalid Credentials! 🥲", { autoClose: 1000 })

    }
  }
  return (
    <div>
      
      <Head><title>library | Login</title></Head>
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-16  sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <Image className='mx-auto' src={logo} alt="" style={{ height: "4rem", width: "6rem" }}></Image> */}
          <h2 data-aos="zoom-in" className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" data-aos="zoom-in">
          <form onSubmit={handleSubmit} className="space-y-6" method="POST">
            <div>
              <label htmlFor="rno" className="block text-sm font-medium leading-6 text-gray-900">registration no.</label>
              <div className="mt-2">
                <input value={rno} onChange={handleChange} id="rno" name="rno" type="text" autoComplete="rno" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              </div>
              <div className="mt-2">
                <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
              <div className="text-sm my-2">
                <Link href="/forgot" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Signup</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login