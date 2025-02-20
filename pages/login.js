
// import React, { useState } from "react";
// import FaceDetection from "@/components/FaceDetection";
// import { useRouter } from "next/router";

// const Login = () => {
//   const router = useRouter();
//   const [faceDescriptor, setFaceDescriptor] = useState(null);
//   const [message, setMessage] = useState("");
//   const [rno, setRno] = useState(""); // Manage rno using state
//   const [sname, setSname] = useState(""); // Manage rno using state

//   const handleLogin = async () => {
//     if (!faceDescriptor) {
//       alert("No face detected");
//       return;
//     }

//     try {
//       const response = await fetch("/api/newLogin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           faceDescriptor: Array.from(faceDescriptor), // Convert Float32Array to array
//         }),
//       });

//       if (!response.ok) throw new Error("Authentication failed");

//       const data = await response.json();
//       const rno = data.username; // Get rno from the response
//       const username = data.sname;
//       console.log(data);
      
//       setRno(rno); // Set the state
//       setSname(username); // Set the state

//       // Set localStorage items
//       localStorage.setItem("token", data.token || ""); // Assuming token exists in response
//       localStorage.setItem("rno", rno);
//       localStorage.setItem("sname", data.sname);

//       // Redirect or set a success message
//       setMessage("Login successful!");
//       router.push(`/?rno=${rno}`);
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FaceDetection from "@/components/FaceDetection";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [faceDescriptor, setFaceDescriptor] = useState(null);
  const [message, setMessage] = useState("");
  const [rno, setRno] = useState(""); 
  const [sname, setSname] = useState(""); 

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
      console.log(data);

      setRno(data.rno); 
      setSname(data.sname); 

      // Store values in localStorage
      localStorage.setItem("token", data.token || ""); // Ensure token exists
      localStorage.setItem("rno", data.rno);
      localStorage.setItem("sname", data.sname);
     
      // Redirect on success
      setMessage("Login successful!");
      toast.success("Logged in successfully 👍", { autoClose: 2000 })
      setTimeout(() => {
         
      router.push(`/?rno=${data.rno}`);
    }, 1000)
    } catch (error) {
      setMessage("Authentication failed");
    }
  };

  return (
    <div>
      <ToastContainer />

      <FaceDetection onFaceDetected={setFaceDescriptor} />
      <div style={{ 
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center", 
  height: "10vh" 
}}>
  <button 
    onClick={handleLogin} 
    style={{ 
      padding: "10px 20px", 
      fontSize: "16px", 
      fontWeight: "bold", 
      color: "white", 
      backgroundColor: "#007bff", 
      border: "none", 
      borderRadius: "5px", 
      cursor: "pointer", 
      transition: "0.3s", 
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
    }}
    onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
    onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
  >
    Login
  </button>
</div>


      <p>{message}</p>
    </div>
  );
};

export default Login;
