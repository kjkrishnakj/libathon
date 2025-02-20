// import React, { useState } from "react";
// import axios from "axios";
// import FaceDetection from "@/components/FaceDetection";
// import { useRouter } from "next/router";

// const Login = () => {
//   const router = useRouter();
//   const [faceDescriptor, setFaceDescriptor] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleLogin = async () => {
//     if (!faceDescriptor) {
//       alert("No face detected");
//       return;
//     }

//     try {
//       const response = await axios.post("/api/newLogin", {
//         faceDescriptor: Array.from(faceDescriptor), // Convert Float32Array to array
//       });
//       rno = response.data.message
//       console.log(rno);
      
//       // localStorage.setItem('token', response.token)
//         localStorage.setItem('rno', rno);
//         // console.log(rno);
//         // setMessage(response.data.message);
//         // router.push(`/?rno=${rno}`)
//     } catch (error) {
//       setMessage("Authentication failed");
//     }
//   };

//   return (
//     <div>
//       <FaceDetection onFaceDetected={setFaceDescriptor} />
//       <button onClick={handleLogin}>Login</button>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import axios from "axios";
import FaceDetection from "@/components/FaceDetection";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [faceDescriptor, setFaceDescriptor] = useState(null);
  const [message, setMessage] = useState("");
  const [rno, setRno] = useState(""); // Manage rno using state

  const handleLogin = async () => {
    if (!faceDescriptor) {
      alert("No face detected");
      return;
    }

    try {
      const response = await axios.post("/api/newLogin", {
        faceDescriptor: Array.from(faceDescriptor), // Convert Float32Array to array
      });
      
      const rno = response.data.username; // Get rno from the response
      setRno(rno); // Set the state

      // Set localStorage items
      localStorage.setItem('token', response.data.token); // Assuming the token is in the response
      localStorage.setItem('rno', rno);

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