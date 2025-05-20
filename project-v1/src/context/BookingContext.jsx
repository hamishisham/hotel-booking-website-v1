import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // تأكدي إن المسار صحيح حسب مشروعك

// Create the context
export const BookingContext = createContext();

// Custom hook to use the context
export const useBookings = () => useContext(BookingContext);

// API URL
const API_URL = "https://hotel-json-server-production.up.railway.app/bookings";

// Generate a random 3-digit room number that is not already used
const generateRandomRoomNumber = (existingRoomNumbers) => {
  let roomNumber;
  do {
    roomNumber = Math.floor(100 + Math.random() * 900);
  } while (existingRoomNumbers.includes(roomNumber));
  return roomNumber;
};

// Provider component
export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
const { user } = useAuth();

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

  // Create a new booking
  const createBooking = async (newBooking) => {
    try {
      const existingRoomNumbers = bookings.map((b) => b.roomNumber);
      const randomRoomNumber = generateRandomRoomNumber(existingRoomNumbers);

      const bookingWithDefaults = {
        ...newBooking,
        roomNumber: randomRoomNumber,
        status: newBooking.status || "pending",
        userId: user?.id, // Automatically attach the userId
      };

      const res = await axios.post(API_URL, bookingWithDefaults);
      setBookings((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  // Delete a booking
  const deleteBooking = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  // Update an existing booking
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

  // Fetch bookings when component mounts
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        createBooking,
        deleteBooking,
        updateBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
