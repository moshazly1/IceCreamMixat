import { useState } from "react";
import {
  GET_DASHBOARD_FLAVORS,
  GET_DASHBOARD_FLAVOR,
  CREATE_DASHBOARD_FLAVOR,
  DELETE_DASHBOARD_FLAVORS,
  EDIT_DASHBOARD_FLAVOR,
} from "../../API/API";

import dashboardAxiosInstance from "../../API/dashboardAxiosInstance";

export default function useFlavorDashbord() {
  const [flavors, setFlavors] = useState([]);
  const [flavor, setFlavor] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // =========================
  // GET DASHBOARD FLAVORS
  // =========================

  const getDashboardFlavors = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const response = await dashboardAxiosInstance.post(
        GET_DASHBOARD_FLAVORS,
        {
          page,
        },
      );

      const data = response.data?.data;

      setFlavors(Array.isArray(data) ? data : []);

      // =========================
      // PAGINATION
      // =========================

      setCurrentPage(response.data?.currentPage || 1);
      setTotalPages(response.data?.totalPages || 1);
      setHasNext(response.data?.hasNext || false);
      setHasPrevious(response.data?.hasPrevious || false);

      return response.data;
    } catch (err) {
      console.error("========== FLAVORS ERROR ==========");
      console.error("Error:", err);
      console.error("Status:", err?.response?.status);
      console.error("Error Data:", err?.response?.data);
      console.error("===================================");

      setError(err?.response?.data || err?.message || "Something went wrong");

      setFlavors([]);
      setCurrentPage(1);
      setTotalPages(1);
      setHasNext(false);
      setHasPrevious(false);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GET SINGLE DASHBOARD FLAVOR
  // =========================

  const getDashboardFlavor = async (flavorId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await dashboardAxiosInstance.get(
        `${GET_DASHBOARD_FLAVOR}${flavorId}/`,
      );

      const data = response.data?.data;

      setFlavor(data || null);

      return response.data;
    } catch (err) {
      console.error("========== SINGLE FLAVOR ERROR ==========");
      console.error("Error:", err);
      console.error("Status:", err?.response?.status);
      console.error("Error Data:", err?.response?.data);
      console.error("==========================================");

      setError(err?.response?.data || err?.message || "Something went wrong");

      setFlavor(null);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CREATE DASHBOARD FLAVOR
  // =========================

  const createDashboardFlavor = async ({
    nameEn,
    nameRu,
    nameTr,
    namePl,
    nameIt,
    extraPrice,
    available,
    image,
  }) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();

      formData.append("nameEn", nameEn || "");
      formData.append("nameRu", nameRu || "");
      formData.append("nameTr", nameTr || "");
      formData.append("namePl", namePl || "");
      formData.append("nameIt", nameIt || "");
      formData.append("extraPrice", extraPrice ?? "");
      formData.append("available", available ? "True" : "False");

      // =========================
      // IMAGE
      // =========================

      if (image) {
        formData.append("image", image);
      }

      const response = await dashboardAxiosInstance.post(
        CREATE_DASHBOARD_FLAVOR,
        formData,
      );

      return response.data;
    } catch (err) {
      console.error("========== CREATE FLAVOR ERROR ==========");
      console.error("Error:", err);
      console.error("Status:", err?.response?.status);
      console.error("Error Data:", err?.response?.data);
      console.error("=========================================");

      setError(err?.response?.data || err?.message || "Something went wrong");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE DASHBOARD FLAVOR
  // =========================

  const deleteDashboardFlavor = async (ids) => {
    try {
      setLoading(true);
      setError(null);

      const response = await dashboardAxiosInstance.delete(
        DELETE_DASHBOARD_FLAVORS,
        {
          data: {
            ids,
          },
        },
      );

      return response.data;
    } catch (err) {
      console.error("========== DELETE FLAVOR ERROR ==========");
      console.error("Error:", err);
      console.error("Status:", err?.response?.status);
      console.error("Error Data:", err?.response?.data);
      console.error("=========================================");

      setError(err?.response?.data || err?.message || "Something went wrong");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // EDIT DASHBOARD FLAVOR
  // =========================

  const editDashboardFlavor = async ({
    flavorId,
    nameEn,
    nameRu,
    nameTr,
    namePl,
    nameIt,
    extraPrice,
    available,
    image,
  }) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();

      // =========================
      // FLAVOR ID
      // =========================

      formData.append("flavorId", flavorId);

      // =========================
      // NAMES
      // =========================

      formData.append("nameEn", nameEn || "");
      formData.append("nameRu", nameRu || "");
      formData.append("nameTr", nameTr || "");
      formData.append("namePl", namePl || "");
      formData.append("nameIt", nameIt || "");

      // =========================
      // PRICE
      // =========================

      formData.append("extraPrice", extraPrice ?? "");

      // =========================
      // AVAILABLE
      // =========================

      formData.append("available", available ? "True" : "False");

      // =========================
      // IMAGE
      // =========================

      if (image) {
        formData.append("image", image);
      }

      const response = await dashboardAxiosInstance.put(
        EDIT_DASHBOARD_FLAVOR,
        formData,
      );

      return response.data;
    } catch (err) {
      console.error("========== EDIT FLAVOR ERROR ==========");
      console.error("Error:", err);
      console.error("Status:", err?.response?.status);
      console.error("Error Data:", err?.response?.data);
      console.error("=========================================");

      setError(err?.response?.data || err?.message || "Something went wrong");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RETURN
  // =========================

  return {
    flavors,
    flavor,

    currentPage,
    totalPages,
    hasNext,
    hasPrevious,

    getDashboardFlavors,
    getDashboardFlavor,

    createDashboardFlavor,
    deleteDashboardFlavor,
    editDashboardFlavor,

    loading,
    error,
  };
}
