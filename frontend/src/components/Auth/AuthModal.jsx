import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ type, close }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = async () => {
    console.log(type, email, password);
    navigate("/dashboard");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">{type === "login" ? "Login" : "Register"}</h2>
        <input type="email" placeholder="Email" className="border p-2 w-full mb-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="border p-2 w-full mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleAuth} className="w-full bg-primary text-white py-2 rounded-lg">{type === "login" ? "Login" : "Sign Up"}</button>
        <button onClick={close} className="w-full mt-2 text-gray-600">Close</button>
      </div>
    </div>
  );
};

export default AuthModal;
