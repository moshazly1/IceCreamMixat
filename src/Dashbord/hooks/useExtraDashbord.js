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

      const response = await dashboardAxiosInstance.post(GET_DASHBOARD_EXTRAS, {
        page,
      });

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
      const response = await dashboardAxiosInstance.get(
        `${GET_DASHBOARD_EXTRA}${extraId}/`,
      );
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

      const response = await dashboardAxiosInstance.post(
        CREATE_DASHBOARD_EXTRA,
        formData,
      );

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
      const response = await dashboardAxiosInstance.delete(
        DELETE_DASHBOARD_EXTRAS,
        {
          data: {
            ids,
          },
        },
      );

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

      const response = await dashboardAxiosInstance.put(
        EDIT_DASHBOARD_EXTRA,
        formData,
      );

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
