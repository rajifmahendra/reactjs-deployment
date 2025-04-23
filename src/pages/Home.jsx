// import { useState } from "react";
// import TodoItem from "../components/TodoItem";

// function Home() {
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState("");

//   const addTodo = () => {
//     if (newTodo.trim()) {
//       setTodos([
//         ...todos,
//         { id: Date.now(), text: newTodo, completed: false },
//       ]);
//       setNewTodo("");
//     }
//   };

//   const toggleTodo = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   };

//   return (
//     <div className="p-4">
//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Add a new task..."
//           value={newTodo}
//           onChange={(e) => setNewTodo(e.target.value)}
//           className="border p-2 flex-1"
//         />
//         <button
//           onClick={addTodo}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Add
//         </button>
//       </div>
//       <div>
//         {todos.map((todo) => (
//           <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;

import { useState } from "react";
import { useAuth } from "../context/authContext";

function Home() {
  const [orderName, setOrderName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { token, logout } = useAuth();
  
  const API_URL = import.meta.env.VITE_BE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError(null);
    setSuccess(false);
    
    // Validation
    if (!orderName.trim()) {
      setError("Order name is required");
      return;
    }
    
    if (quantity < 1) {
      setError("Quantity must be at least 1");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/api/order`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: orderName,
          quantity: Number(quantity)
        })
      });
      
      if (!response.ok) {
        // If unauthorized (401), logout the user
        if (response.status === 401) {
          logout();
          throw new Error("Session expired. Please login again.");
        }
        throw new Error("Failed to create order");
      }
      
      const data = await response.json();
      setSuccess(true);
      setOrderName("");
      setQuantity(1);
      console.log("Order created:", data);
    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error("Error creating order:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Create New Order</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Order created successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Order Name
          </label>
          <input
            type="text"
            value={orderName}
            onChange={(e) => setOrderName(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter order name"
            disabled={loading}
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            disabled={loading}
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          disabled={loading}
        >
          {loading ? "Creating Order..." : "Create Order"}
        </button>
      </form>
      
      <div className="mt-4 text-right">
        <button 
          onClick={logout}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;