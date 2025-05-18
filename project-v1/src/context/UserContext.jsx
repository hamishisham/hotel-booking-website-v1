import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();
export const useUsers = () => useContext(UserContext);

const API_URL = "https://hotel-json-server-production.up.railway.app/users";

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      const response = await axios.put(`${API_URL}/${updatedUser.id}`, updatedUser);
      setUsers((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? response.data : user))
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, loading, deleteUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
