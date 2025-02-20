
import React, { useState } from "react";
import FaceDetection from "@/components/FaceDetection";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [faceDescriptor, setFaceDescriptor] = useState(null);
  const [message, setMessage] = useState("");
  const [rno, setRno] = useState(""); // Manage rno using state
  const [sname, setSname] = useState(""); // Manage rno using state

  const handleLogin = async () => {
    if (!faceDescriptor) {
      alert("No face detected");
      return;
    }

    try {
      const response = await fetch("/api/newLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          faceDescriptor: Array.from(faceDescriptor), // Convert Float32Array to array
        }),
      });

      if (!response.ok) throw new Error("Authentication failed");

      const data = await response.json();
      const rno = data.username; // Get rno from the response
      const username = data.sname;
      console.log(data);
      
      setRno(rno); // Set the state
      setSname(username); // Set the state

      // Set localStorage items
      localStorage.setItem("token", data.token || ""); // Assuming token exists in response
      localStorage.setItem("rno", rno);
      localStorage.setItem("sname", sname);

      // Redirect or set a success message
      setMessage("Login successful!");
      router.push(`/?rno=${rno}`);
    } catch (error) {
      setMessage("Authentication failed");
    }
  };

  return (
    <div>
      <FaceDetection onFaceDetected={setFaceDescriptor} />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
};

export default Login;
