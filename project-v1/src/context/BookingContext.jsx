import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const BookingContext = createContext();
export const useBookings = () => useContext(BookingContext);

const API_URL = "https://hotel-json-server-production.up.railway.app/bookings";

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get(API_URL);
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete booking
  const deleteBooking = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  // Update booking
  const updateBooking = async (updatedBooking) => {
    try {
      const res = await axios.put(`${API_URL}/${updatedBooking.id}`, updatedBooking);
      setBookings((prev) =>
        prev.map((b) => (b.id === updatedBooking.id ? res.data : b))
      );
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        deleteBooking,
        updateBooking, // <- make sure to export this
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
