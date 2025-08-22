"use client"

import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import FaceDetection from "@/components/FaceDetection"
import { useRouter } from "next/router"
import { Check } from "lucide-react"

const Login = () => {
  const router = useRouter()
  const [faceDescriptor, setFaceDescriptor] = useState(null)
  const [message, setMessage] = useState("")
  const [rno, setRno] = useState("")
  const [sname, setSname] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleLogin = async () => {
    if (!faceDescriptor) {
      alert("No face detected")
      return
    }

    try {
      const response = await fetch("/api/newLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          faceDescriptor: faceDescriptor ? Array.from(faceDescriptor) : [],
        }),
      })

      if (!response.ok) throw new Error("Authentication failed")

      const data = await response.json()
      setRno(data.rno)
      setSname(data.sname)

      localStorage.setItem("token", data.token || "")
      localStorage.setItem("rno", data.rno)
      localStorage.setItem("sname", data.sname)

      setMessage("Login successful!")
      setIsSuccess(true)
      toast.success("Logged in successfully 👍", { autoClose: 2000 })

      setTimeout(() => {
        router.push(`/?rno=${data.rno}`)
      }, 1000)
    } catch (error) {
      setMessage("Authentication failed")
      setIsSuccess(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <ToastContainer />

      {/* Profile Icon */}
      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 shadow-md">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Face Recognition Login</h3>
          <p className="text-sm text-gray-600">Position your face in the camera to authenticate</p>
        </div>

        {/* Face Detection Component */}
        <div className="mb-6">
          <FaceDetection onFaceDetected={setFaceDescriptor} />
        </div>

        {/* Login Button */}
        <div className="space-y-4">
          <button
            onClick={handleLogin}
            disabled={isSuccess}
            className={`w-full flex items-center justify-center gap-2 font-semibold py-3 px-4 rounded-lg transition-all duration-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2
              ${isSuccess
                ? "bg-green-600 text-white focus:ring-green-500"
                : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
              }`}
          >
            {isSuccess ? <Check className="w-6 h-6 animate-scale-in" /> : "Login to BookHive"}
          </button>

          {message && (
            <div
              className={`text-center text-sm font-medium ${
                message.includes("successful") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-xs text-gray-500">Secure face recognition powered by advanced AI technology</p>
      </div>
    </div>
  )
}

export default Login
