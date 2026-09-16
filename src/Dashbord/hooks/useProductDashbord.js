import { useState } from "react";
import {
  GET_DASHBOARD_PRODUCTS,
  GET_DASHBOARD_PRODUCT,
  CREATE_DASHBOARD_PRODUCT,
  EDIT_DASHBOARD_PRODUCT,
  DELETE_DASHBOARD_PRODUCTS,
} from "../../API/API";
import dashboardAxiosInstance from "../../API/dashboardAxiosInstance";

export default function useProductDashbord() {
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const [flavors, setFlavors] = useState([]);
  const [extras, setExtras] = useState([]);

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(false);
  const [itemsLoading, setItemsLoading] = useState(false);

  const [error, setError] = useState(null);
  const [itemsError, setItemsError] = useState(null);

  // =========================================================
  // GET DASHBOARD PRODUCTS
  // =========================================================

  const getDashboardProducts = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const response = await dashboardAxiosInstance.post(
        GET_DASHBOARD_PRODUCTS,
        {
          page,
        },
      );

      const data = response.data?.data;

      setProducts(Array.isArray(data) ? data : []);

      setCurrentPage(response.data?.currentPage || 1);

      setTotalPages(response.data?.totalPages || 1);

      setHasNext(response.data?.hasNext || false);

      setHasPrevious(response.data?.hasPrevious || false);

      return response.data;
    } catch (err) {
      console.error("Get Products Error:", err);

      setError(err?.response?.data || err?.message || "Something went wrong");

      setProducts([]);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // GET PRODUCT ITEMS
  // =========================================================

  const getProductItems = async () => {
    try {
      setItemsLoading(true);
      setItemsError(null);

      const response = await dashboardAxiosInstance.get(
        "api/shop/product-items/",
      );

      const data = response.data?.data;

      const flavorsData = Array.isArray(data?.flavors) ? data.flavors : [];

      const extrasData = Array.isArray(data?.extras) ? data.extras : [];

      setFlavors(flavorsData);
      setExtras(extrasData);

      return response.data;
    } catch (err) {
      console.error("Get Product Items Error:", err);

      setItemsError(
        err?.response?.data || err?.message || "Something went wrong",
      );

      setFlavors([]);
      setExtras([]);

      throw err;
    } finally {
      setItemsLoading(false);
    }
  };

  // =========================================================
  // GET SINGLE PRODUCT
  // =========================================================

  const getDashboardProduct = async (productId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await dashboardAxiosInstance.get(
        `${GET_DASHBOARD_PRODUCT}${productId}/`,
      );

      const data = response.data?.data;

      setProduct(data || null);

      return response.data;
    } catch (err) {
      console.error("========== SINGLE PRODUCT ERROR ==========");

      console.error("Error:", err);

      console.error("Status:", err?.response?.status);

      console.error("Error Data:", err?.response?.data);

      console.error("===========================================");

      setError(err?.response?.data || err?.message || "Something went wrong");

      setProduct(null);

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // CREATE DASHBOARD PRODUCT
  // =========================================================

  const createDashboardProduct = async ({
    nameEn,
    nameRu,
    nameTr,
    namePl,
    nameIt,

    descriptionEn,
    descriptionRu,
    descriptionTr,
    descriptionPl,
    descriptionIt,

    basePrice,
    categoryId,

    available,
    offer,
    offerPrecent,

    flavorsIds,
    extrasIds,

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

      formData.append("descriptionEn", descriptionEn || "");

      formData.append("descriptionRu", descriptionRu || "");

      formData.append("descriptionTr", descriptionTr || "");

      formData.append("descriptionPl", descriptionPl || "");

      formData.append("descriptionIt", descriptionIt || "");

      formData.append("basePrice", basePrice ?? "");

      formData.append("categoryId", categoryId ?? "");

      formData.append("available", available ? "True" : "False");

      formData.append("offer", offer ? "True" : "False");

      // =========================
      // OFFER PERCENT
      // =========================

      formData.append(
        "offerPrecent",
        offerPrecent !== undefined && offerPrecent !== null
          ? String(Number(offerPrecent))
          : "0",
      );

      formData.append(
        "flavorsIds",
        JSON.stringify(Array.isArray(flavorsIds) ? flavorsIds : []),
      );

      formData.append(
        "extrasIds",
        JSON.stringify(Array.isArray(extrasIds) ? extrasIds : []),
      );

      if (image) {
        formData.append("image", image);
      }

      const response = await dashboardAxiosInstance.post(
        CREATE_DASHBOARD_PRODUCT,
        formData,
      );

      return response.data;
    } catch (err) {
      setError(err?.response?.data || err?.message || "Something went wrong");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // EDIT DASHBOARD PRODUCT
  // =========================================================

  const editDashboardProduct = async ({
    productId,

    nameEn,
    nameRu,
    nameTr,
    namePl,
    nameIt,

    descriptionEn,
    descriptionRu,
    descriptionTr,
    descriptionPl,
    descriptionIt,

    basePrice,
    categoryId,

    available,
    offer,
    offerPrecent,

    flavorsIds,
    extrasIds,

    image,
  }) => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();

      // =========================
      // PRODUCT ID
      // =========================

      formData.append("productId", productId);

      // =========================
      // NAMES
      // =========================

      formData.append("nameEn", nameEn || "");

      formData.append("nameRu", nameRu || "");

      formData.append("nameTr", nameTr || "");

      formData.append("namePl", namePl || "");

      formData.append("nameIt", nameIt || "");

      // =========================
      // DESCRIPTIONS
      // =========================

      formData.append("descriptionEn", descriptionEn || "");

      formData.append("descriptionRu", descriptionRu || "");

      formData.append("descriptionTr", descriptionTr || "");

      formData.append("descriptionPl", descriptionPl || "");

      formData.append("descriptionIt", descriptionIt || "");

      // =========================
      // PRODUCT DATA
      // =========================

      formData.append("basePrice", basePrice ?? "");

      formData.append("categoryId", categoryId ?? "");

      formData.append("available", available ? "True" : "False");

      formData.append("offer", offer ? "True" : "False");

      // =========================
      // OFFER PERCENT
      // =========================

      formData.append(
        "offerPrecent",
        offerPrecent !== undefined && offerPrecent !== null
          ? String(Number(offerPrecent))
          : "0",
      );

      // =========================
      // FLAVORS
      // =========================

      formData.append(
        "flavorsIds",
        JSON.stringify(Array.isArray(flavorsIds) ? flavorsIds : []),
      );

      // =========================
      // EXTRAS
      // =========================

      formData.append(
        "extrasIds",
        JSON.stringify(Array.isArray(extrasIds) ? extrasIds : []),
      );

      // =========================
      // IMAGE
      // =========================

      if (image) {
        formData.append("image", image);
      }

      const response = await dashboardAxiosInstance.put(
        EDIT_DASHBOARD_PRODUCT,
        formData,
      );

      return response.data;
    } catch (err) {
      console.error("========== EDIT PRODUCT ERROR ==========");

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

  // =========================================================
  // DELETE DASHBOARD PRODUCTS
  // =========================================================

  const deleteDashboardProducts = async (ids) => {
    try {
      setLoading(true);
      setError(null);

      const response = await dashboardAxiosInstance.delete(
        DELETE_DASHBOARD_PRODUCTS,
        {
          data: {
            ids,
          },
        },
      );

      return response.data;
    } catch (err) {
      setError(err?.response?.data || err?.message || "Something went wrong");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    products,

    currentPage,
    totalPages,
    hasNext,
    hasPrevious,

    flavors,
    extras,

    product,

    getDashboardProducts,
    getProductItems,
    getDashboardProduct,

    createDashboardProduct,
    editDashboardProduct,
    deleteDashboardProducts,

    loading,
    itemsLoading,

    error,
    itemsError,
  };
}
