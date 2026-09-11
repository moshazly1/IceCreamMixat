import { useState } from "react";
import {
  GET_DASHBOARD_EXTRAS,
  GET_DASHBOARD_EXTRA,
  CREATE_DASHBOARD_EXTRA,
  DELETE_DASHBOARD_EXTRAS,
  EDIT_DASHBOARD_EXTRA,
} from "../../API/API";

import dashboardAxiosInstance from "../../API/dashboardAxiosInstance";

export default function useExtraDashbord() {
  const [extras, setExtras] = useState([]);
  const [extra, setExtra] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // =========================
  // GET DASHBOARD EXTRAS
  // =========================

  const getDashboardExtras = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      console.log("========== EXTRAS REQUEST ==========");
      console.log("Method:", "POST");
      console.log("URL:", GET_DASHBOARD_EXTRAS);
      console.log("Page:", page);
      console.log("====================================");

      const response = await dashboardAxiosInstance.post(GET_DASHBOARD_EXTRAS, {
        page,
      });

      console.log("========== EXTRAS RESPONSE ==========");
      console.log("Status:", response.status);
      console.log("Response:", response);
      console.log("Response Data:", response.data);

      console.log(
        "Response Data JSON:",
        JSON.stringify(response.data, null, 2),
      );

      console.log("=====================================");

      const data = response.data?.data;

      setExtras(Array.isArray(data) ? data : []);

      // =========================
      // PAGINATION
      // =========================

      setCurrentPage(response.data?.currentPage || 1);
      setTotalPages(response.data?.totalPages || 1);
      setHasNext(response.data?.hasNext || false);
      setHasPrevious(response.data?.hasPrevious || false);

      return response.data;
    } catch (err) {
      console.error("========== EXTRAS ERROR ==========");
      console.error("Error:", err);
      console.error("Status:", err?.response?.status);
      console.error("Error Data:", err?.response?.data);
      console.error("===================================");

      setError(err?.response?.data || err?.message || "Something went wrong");

      setExtras([]);
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
  // GET SINGLE DASHBOARD EXTRA
  // =========================

  const getDashboardExtra = async (extraId) => {
    try {
      setLoading(true);
      setError(null);

      console.log("========== SINGLE EXTRA REQUEST ==========");
      console.log("Method:", "GET");
      console.log("URL:", `${GET_DASHBOARD_EXTRA}${extraId}/`);
      console.log("Extra ID:", extraId);
      console.log("===========================================");

      const response = await dashboardAxiosInstance.get(
        `${GET_DASHBOARD_EXTRA}${extraId}/`,
      );

      console.log("========== SINGLE EXTRA RESPONSE ==========");
      console.log("Status:", response.status);
      console.log("Response:", response);
      console.log("Response Data:", response.data);

      console.log(
        "Response Data JSON:",
        JSON.stringify(response.data, null, 2),
      );

      console.log("============================================");

      const data = response.data?.data;

      setExtra(data || null);

      return response.data;
    } catch (err) {
      console.error("========== SINGLE EXTRA ERROR ==========");
      console.error("Error:", err);
      console.error("Status:", err?.response?.status);
      console.error("Error Data:", err?.response?.data);
      console.error("=========================================");

      setError(err?.response?.data || err?.message || "Something went wrong");

      setExtra(null);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CREATE DASHBOARD EXTRA
  // =========================

  const createDashboardExtra = async ({
    nameEn,
    nameRu,
    nameTr,
    namePl,
    nameIt,
    price,
    available,
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

      formData.append("price", price ?? "");

      formData.append("available", available ? "True" : "False");

      console.log("========== CREATE EXTRA REQUEST ==========");
      console.log("Method:", "POST");
      console.log("URL:", CREATE_DASHBOARD_EXTRA);

      console.log("FormData:");

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      console.log("==========================================");

      const response = await dashboardAxiosInstance.post(
        CREATE_DASHBOARD_EXTRA,
        formData,
      );

      console.log("========== CREATE EXTRA RESPONSE ==========");
      console.log("Status:", response.status);
      console.log("Response:", response);
      console.log("Response Data:", response.data);

      console.log(
        "Response Data JSON:",
        JSON.stringify(response.data, null, 2),
      );

      console.log("===========================================");

      return response.data;
    } catch (err) {
      console.error("========== CREATE EXTRA ERROR ==========");
      console.error("Error:", err);
      console.error("Status:", err?.response?.status);
      console.error("Error Data:", err?.response?.data);

      console.error("========================================");

      setError(err?.response?.data || err?.message || "Something went wrong");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE DASHBOARD EXTRA
  // =========================

  const deleteDashboardExtra = async (ids) => {
    try {
      setLoading(true);
      setError(null);

      console.log("========== DELETE EXTRA REQUEST ==========");
      console.log("Method:", "DELETE");
      console.log("URL:", DELETE_DASHBOARD_EXTRAS);
      console.log("IDs:", ids);
      console.log("==========================================");

      const response = await dashboardAxiosInstance.delete(
        DELETE_DASHBOARD_EXTRAS,
        {
          data: {
            ids,
          },
        },
      );

      console.log("========== DELETE EXTRA RESPONSE ==========");
      console.log("Status:", response.status);
      console.log("Response:", response);
      console.log("Response Data:", response.data);

      console.log(
        "Response Data JSON:",
        JSON.stringify(response.data, null, 2),
      );

      console.log("===========================================");

      return response.data;
    } catch (err) {
      console.error("========== DELETE EXTRA ERROR ==========");
      console.error("Error:", err);
      console.error("Status:", err?.response?.status);
      console.error("Error Data:", err?.response?.data);

      console.error("========================================");

      setError(err?.response?.data || err?.message || "Something went wrong");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // EDIT DASHBOARD EXTRA
  // =========================

  const editDashboardExtra = async ({
    extraId,
    nameEn,
    nameRu,
    nameTr,
    namePl,
    nameIt,
    price,
    available,
  }) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();

      // =========================
      // EXTRA ID
      // =========================

      formData.append("extraId", extraId);

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

      formData.append("price", price ?? "");

      // =========================
      // AVAILABLE
      // =========================

      formData.append("available", available ? "True" : "False");

      console.log("========== EDIT EXTRA REQUEST ==========");
      console.log("Method:", "PUT");
      console.log("URL:", EDIT_DASHBOARD_EXTRA);

      console.log("FormData:");

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      console.log("========================================");

      const response = await dashboardAxiosInstance.put(
        EDIT_DASHBOARD_EXTRA,
        formData,
      );

      console.log("========== EDIT EXTRA RESPONSE ==========");
      console.log("Status:", response.status);
      console.log("Response:", response);
      console.log("Response Data:", response.data);

      console.log(
        "Response Data JSON:",
        JSON.stringify(response.data, null, 2),
      );

      console.log("=========================================");

      return response.data;
    } catch (err) {
      console.error("========== EDIT EXTRA ERROR ==========");
      console.error("Error:", err);
      console.error("Status:", err?.response?.status);
      console.error("Error Data:", err?.response?.data);

      console.error("=======================================");

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
    extras,
    extra,

    currentPage,
    totalPages,
    hasNext,
    hasPrevious,

    getDashboardExtras,
    getDashboardExtra,

    createDashboardExtra,
    deleteDashboardExtra,
    editDashboardExtra,

    loading,
    error,
  };
}
