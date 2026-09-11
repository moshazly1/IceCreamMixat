import { useEffect, useState } from "react";

const CURRENCY_KEY = "selected_currency";

export default function useCurrency() {
  const [currency, setCurrency] = useState(
    localStorage.getItem(CURRENCY_KEY) || "USD",
  );

  const [rate, setRate] = useState(1);
  const [loading, setLoading] = useState(false);

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem(CURRENCY_KEY, newCurrency);
  };

  useEffect(() => {
    const fetchRate = async () => {
      // USD لا يحتاج تحويل
      if (currency === "USD") {
        setRate(1);
        return;
      }

      try {
        setLoading(true);

        const response = await fetch(
          `https://api.frankfurter.dev/v2/rate/USD/${currency}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch exchange rate");
        }

        const data = await response.json();

        setRate(data.rate);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        setRate(1);
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
  }, [currency]);

  const convertPrice = (price) => {
    return (Number(price) * rate).toFixed(2);
  };

  return {
    currency,
    changeCurrency,
    rate,
    loading,
    convertPrice,
  };
}
