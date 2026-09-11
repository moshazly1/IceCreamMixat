import { useEffect, useState } from "react";
import { GET_OFFERD } from "../API/API";
import axiosInstance from "../API/axiosInstance";

export default function useOfferSection() {
  const [offers, setOffers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getOffers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get(GET_OFFERD);

        setOffers(response.data?.data || null);
      } catch (err) {
        /*
          لو مفيش Offer، الـ API بيرجع 404.
          ده مش Error بالنسبة للـ UI،
          معناه ببساطة إن مفيش Offer حاليًا.
        */

        if (err.response?.status === 404) {
          setOffers(null);
          setError(null);
          return;
        }

        setError(err);
        setOffers(null);

        console.error("Error fetching offers:", err);
      } finally {
        setLoading(false);
      }
    };

    getOffers();
  }, []);

  return {
    offers,
    loading,
    error,
  };
}
