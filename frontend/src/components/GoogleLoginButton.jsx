// src/components/GoogleLoginButton.jsx
import { useEffect } from 'react';

const GoogleLoginButton = () => {
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "949608820757-v9vijujjqveikb7ofe59hck4g27tgs9k.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("google-signin"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const res = await fetch("http://localhost:4000/api/google/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();
      console.log("Backend response:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = '/';  
        alert("Login Successful!");
      } else {
        console.error("No token received:", data);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return <div  id="google-signin"></div>;
};

export default GoogleLoginButton;
