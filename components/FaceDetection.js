"use client"

import { useRef, useEffect, useState } from "react"
import * as faceapi from "face-api.js"

const FaceDetection = ({ onFaceDetected, isAuthenticated: parentIsAuthenticated }) => {
  const videoRef = useRef()
  const canvasRef = useRef()
  const [modelsLoaded, setModelsLoaded] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [localIsAuthenticated, setLocalIsAuthenticated] = useState(false)
  const streamRef = useRef()

  const isAuthenticated = parentIsAuthenticated || localIsAuthenticated

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ])
      setModelsLoaded(true)
    }
    loadModels()
  }, [])

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} })
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
      }
    }

    if (modelsLoaded) {
      startVideo()
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [modelsLoaded])

  const handleVideoOnPlay = () => {
    setVideoLoaded(true)
    const canvas = canvasRef.current
    const video = videoRef.current

    if (canvas && video) {
      const displaySize = { width: 320, height: 320 }
      faceapi.matchDimensions(canvas, displaySize)

      setInterval(async () => {
        if (video.paused || video.ended) return

        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors()

        const resizedDetections = faceapi.resizeResults(detections, displaySize)

        const context = canvas.getContext("2d")
        context.clearRect(0, 0, canvas.width, canvas.height)

        faceapi.draw.drawDetections(canvas, resizedDetections)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)

        if (detections.length > 0 && onFaceDetected && !localIsAuthenticated) {
          console.log("[v0] Face detected, setting authentication to true")
          setLocalIsAuthenticated(true)
          onFaceDetected(detections[0].descriptor)
        }
      }, 100)
    }
  }

  return (
    <div
      className={`relative w-80 h-80 mx-auto overflow-hidden rounded-full border-4 transition-all duration-700 ease-in-out transform ${
        isAuthenticated
          ? "border-green-500 shadow-lg shadow-green-200 scale-105"
          : "border-blue-500 shadow-lg shadow-blue-200"
      }`}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        onPlay={handleVideoOnPlay}
        width="320"
        height="320"
        className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-500"
      />
      <canvas ref={canvasRef} width="320" height="320" className="absolute top-0 left-0 w-full h-full" />
      {!modelsLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 rounded-full">
          <div className="text-blue-600 font-medium text-center px-4">Loading face detection models...</div>
        </div>
      )}
      {isAuthenticated && (
        <div className="absolute inset-0 rounded-full border-4 border-green-400 animate-pulse opacity-50"></div>
      )}
    </div>
  )
}

export default FaceDetection
