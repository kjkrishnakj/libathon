 
import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const FaceDetection = ({ onFaceDetected }) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [loading, setLoading] = useState(true);
  let streamRef = useRef(null); // Store the stream reference

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
      setLoading(false);
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream; // Store the stream for cleanup
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error(err));
  };

  const stopVideo = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      console.log("Camera stopped.");
    }
  };

  const detectFace = async () => {
    if (loading) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors();

    if (detections.length > 0) {
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

      // Pass the face descriptor to the parent component
      onFaceDetected(detections[0].descriptor);
    }
  };

  useEffect(() => {
    startVideo();
    const interval = setInterval(detectFace, 100);

    return () => {
      clearInterval(interval);
      stopVideo(); // Stop the camera when unmounting
    };
  }, [loading]);

  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      height: "80vh", 
      margin: "0" 
    }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="665"
        height="480"
          className="block mr-2 border-[15px] border-cyan-500 rounded-lg"
      />
      <canvas 
  ref={canvasRef} 
  width="320" 
  height="480" 
  className="w-[320px] h-[480px] border-[15px] border-cyan-500 rounded-lg bg-black"
/>

    </div>
  );
};

export default FaceDetection;
