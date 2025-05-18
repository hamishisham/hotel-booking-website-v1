import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

const HotelContext = createContext();

export const useHotels = () => useContext(HotelContext);

const API_URL = "https://hotel-json-server-production.up.railway.app/hotels"; // Adjust port if needed

export const HotelProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);
  const [selectedCity, setSelectedCity] = useState(''); // 🆕 New state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hotels from API based on city
  const fetchHotels = useCallback(async (city = '') => {
    try {
      setLoading(true);
      let response;
      if (city) {
        response = await axios.get(API_URL, { params: { city } });
        setSelectedCity(city); // 🆕 Set selected city
      } else {
        response = await axios.get(API_URL); // Get all hotels
        setSelectedCity(''); // 🆕 Reset city if no filter
      }
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setError("Failed to fetch hotels");
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a hotel (only for admin)
  const deleteHotel = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setHotels((prev) => prev.filter((hotel) => hotel.id !== id));
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  // Add a new hotel (admin functionality)
  const addHotel = async (newHotel) => {
    try {
      const response = await axios.post(API_URL, newHotel);
      setHotels((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error adding hotel:", error);
    }
  };

  useEffect(() => {
    fetchHotels(); // Fetch
    //  all hotels on initial load
  }, [fetchHotels]);


const updateHotel = async (updatedHotel) => {
  try {
    const response = await axios.put(`${API_URL}/${updatedHotel.id}`, updatedHotel);
    setHotels((prev) =>
      prev.map((hotel) => (hotel.id === updatedHotel.id ? response.data : hotel))
    );
  } catch (error) {
    console.error("Error updating hotel:", error);
  }
};

  return (
    <HotelContext.Provider
      value={{
        hotels,
        loading,
        error,
        fetchHotels,
        deleteHotel,
        addHotel,
        updateHotel, 
        selectedCity, // 🆕 Exported
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};
