import { useState } from "react";
import {
  GET_DASHBOARD_CATEGORIES,
  GET_DASHBOARD_CATEGORY,
  DELETE_DASHBOARD_CATEGORIES,
  CREATE_DASHBOARD_CATEGORY,
  EDIT_DASHBOARD_CATEGORY,
} from "../../API/API";

import dashboardAxiosInstance from "../../API/dashboardAxiosInstance";

export default function useCategoryDashbord() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // =========================
  // GET CATEGORIES
  // =========================
  const getDashboardCategories = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      console.log("========== CATEGORY REQUEST ==========");
      console.log("Method: POST");
      console.log("URL:", GET_DASHBOARD_CATEGORIES);
      console.log("Page:", page);

      const response = await dashboardAxiosInstance.post(
        GET_DASHBOARD_CATEGORIES,
        {
          page,
        },
      );

      console.log("========== CATEGORY RESPONSE ==========");
      console.log("Status:", response.status);
      console.log("Response:", response);
      console.log("Response Data:", response.data);
      console.log(
        "Response Data JSON:",
        JSON.stringify(response.data, null, 2),
      );
      console.log("=======================================");

      const data = response.data?.data;

      if (Array.isArray(data)) {
        setCategories(data);
      } else if (Array.isArray(data?.results)) {
        setCategories(data.results);
      } else {
        setCategories([]);
      }

      return response.data;
    } catch (err) {
      console.error("========== CATEGORY ERROR ==========");
      console.error("Error:", err);
      console.error("Status:", err?.response?.status);
      console.error("Error Data:", err?.response?.data);
      console.error("===================================");

      setError(err?.response?.data || err?.message || "Something went wrong");

      setCategories([]);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GET SINGLE CATEGORY
  // =========================
  const getDashboardCategory = async (categoryId) => {
    try {
      setLoading(true);
      setError(null);

      console.log("========== SINGLE CATEGORY REQUEST ==========");
      console.log("Method:", "GET");
      console.log("URL:", `${GET_DASHBOARD_CATEGORY}${categoryId}/`);
      console.log("Category ID:", categoryId);

      const response = await dashboardAxiosInstance.get(
        `${GET_DASHBOARD_CATEGORY}${categoryId}/`,
      );

      console.log("========== SINGLE CATEGORY RESPONSE ==========");
      console.log("Status:", response.status);
      console.log("Response:", response);
      console.log("Response Data:", response.data);
      console.log(
        "Response Data JSON:",
        JSON.stringify(response.data, null, 2),
      );
      console.log("==============================================");

      return response.data;
    } catch (err) {
      console.error("========== SINGLE CATEGORY ERROR ==========");
      console.error("Error:", err);
      console.error("Status:", err?.response?.status);
      console.error("Error Data:", err?.response?.data);
      console.error("===========================================");

      setError(err?.response?.data || err?.message || "Something went wrong");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE CATEGORIES
  // =========================
  const deleteDashboardCategories = async (ids) => {
    try {
      setLoading(true);
      setError(null);

      console.log("========== CATEGORY DELETE REQUEST ==========");
      console.log("Method:", "DELETE");
      console.log("URL:", DELETE_DASHBOARD_CATEGORIES);
      console.log("IDs:", ids);

      const response = await dashboardAxiosInstance.delete(
        DELETE_DASHBOARD_CATEGORIES,
        {
          data: {
            ids,
          },
        },
      );

      console.log("========== CATEGORY DELETE RESPONSE ==========");
      console.log("Status:", response.status);
      console.log("Response:", response);
      console.log("Response Data:", response.data);
      console.log("===============================================");

      return response.data;
    } catch (err) {
      console.error("========== CATEGORY DELETE ERROR ==========");
      console.error("Error:", err);
      console.error("Status:", err?.response?.status);
      console.error("Error Data:", err?.response?.data);
      console.error("===========================================");

      setError(err?.response?.data || err?.message || "Something went wrong");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CREATE CATEGORY
  // =========================
  const createDashboardCategory = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      console.log("========== CATEGORY CREATE REQUEST ==========");
      console.log("Method:", "POST");
      console.log("URL:", CREATE_DASHBOARD_CATEGORY);
      console.log("FormData:", formData);

      const response = await dashboardAxiosInstance.post(
        CREATE_DASHBOARD_CATEGORY,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("========== CATEGORY CREATE RESPONSE ==========");
      console.log("Status:", response.status);
      console.log("Response:", response);
      console.log("Response Data:", response.data);
      console.log("==============================================");

      return response.data;
    } catch (err) {
      console.error("========== CATEGORY CREATE ERROR ==========");
      console.error("Error:", err);
      console.error("Status:", err?.response?.status);
      console.error("Error Data:", err?.response?.data);
      console.error("===========================================");

      setError(err?.response?.data || err?.message || "Something went wrong");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // EDIT CATEGORY
  // =========================
  const editDashboardCategory = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      console.log("========== CATEGORY EDIT REQUEST ==========");
      console.log("Method:", "PUT");
      console.log("URL:", EDIT_DASHBOARD_CATEGORY);
      console.log("FormData:", formData);

      const response = await dashboardAxiosInstance.put(
        EDIT_DASHBOARD_CATEGORY,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("========== CATEGORY EDIT RESPONSE ==========");
      console.log("Status:", response.status);
      console.log("Response:", response);
      console.log("Response Data:", response.data);
      console.log("============================================");

      return response.data;
    } catch (err) {
      console.error("========== CATEGORY EDIT ERROR ==========");
      console.error("Error:", err);
      console.error("Status:", err?.response?.status);
      console.error("Error Data:", err?.response?.data);
      console.error("==========================================");

      setError(err?.response?.data || err?.message || "Something went wrong");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    getDashboardCategories,
    getDashboardCategory,
    deleteDashboardCategories,
    createDashboardCategory,
    editDashboardCategory,
    loading,
    error,
  };
}
