import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [message, setMessage] = useState("Loading");

  useEffect(() => {
    // Fetch data from the Node.js backend
    axios
      .get("http://localhost:8080")
      .then(response => {
        setMessage(response.data.mssg);
        console.log(response.data.mssg);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="text-center flex flex-col gap-4">
      <h1 className="text-2xl">Node js and Next js</h1>

      <p className="font-normal">{message}</p>
    </div>
  );
}
