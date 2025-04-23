import { createContext, useState, useContext, useEffect } from "react";

// Create the context
const AuthContext = createContext(null);

// Create a provider component
export function AuthProvider({ children }) {
const API_URL = import.meta.env.VITE_BE_URL;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuthStatus = () => {
      const savedToken = localStorage.getItem("token");
    //   const savedUser = localStorage.getItem("user");
      
      if (savedToken && savedUser) {
        setToken(savedToken);
        // setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // This is where you would connect to your backend
      // For this example, we'll simulate receiving a JWT token
      
      // In a real app, you would do something like:
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      // Simulate successful login with token
     
      
      // Save the token and user data
      localStorage.setItem("token", data.token);
    //   localStorage.setItem("user", JSON.stringify(mockResponse.user));
      
      // Update state
      setToken(data.token);

      setIsAuthenticated(true);
      
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  // Register function
  const register = async (email, password) => {
    try {
      // Similar to login, this would connect to your backend in a real app
      
      // Simulate successful registration with token
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if(response.status==201){
    
        return true;
      }
      
     
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    // localStorage.removeItem("user");
    setToken(null);
    // setUser(null);
    setIsAuthenticated(false);
  };

  // Create the value object with all the context data
  const value = {
    isAuthenticated,
    token,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};