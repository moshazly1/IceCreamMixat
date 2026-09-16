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

      const response = await dashboardAxiosInstance.post(
        GET_DASHBOARD_CATEGORIES,
        {
          page,
        },
      );

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

      const response = await dashboardAxiosInstance.get(
        `${GET_DASHBOARD_CATEGORY}${categoryId}/`,
      );

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

      const response = await dashboardAxiosInstance.delete(
        DELETE_DASHBOARD_CATEGORIES,
        {
          data: {
            ids,
          },
        },
      );

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

      const response = await dashboardAxiosInstance.post(
        CREATE_DASHBOARD_CATEGORY,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

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

      const response = await dashboardAxiosInstance.put(
        EDIT_DASHBOARD_CATEGORY,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

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
