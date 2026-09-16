import { useEffect, useState } from "react";
import {
  Table,
  Pagination,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import "./Category.css";
import useCategoryDashbord from "../hooks/useCategoryDashbord";

export default function Categories() {
  const navigate = useNavigate();

  const {
    categories,
    getDashboardCategories,
    deleteDashboardCategories,
    loading,
    error,
  } = useCategoryDashbord();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // =========================
  // GET CATEGORIES
  // =========================

  const fetchCategories = async (page) => {
    try {
      const response = await getDashboardCategories(page);

      setTotalPages(Number(response?.totalPages ?? 1));
    } catch (err) {
      console.error("Categories Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

  // =========================
  // DELETE CATEGORY
  // =========================

  const handleDeleteClick = async (id) => {
    try {
      const response = await deleteDashboardCategories([id]);

      // بعد نجاح الحذف نعيد جلب البيانات
      await fetchCategories(currentPage);
    } catch (err) {
      console.error("Delete Category Error:", err);
    }
  };

  // =========================
  // EDIT CATEGORY
  // =========================

  const handleEditClick = (id) => {
    navigate(`/dashboard/categories/edit/${id}`);
  };

  return (
    <div className="categories-page">
      {/* ================= HEADER ================= */}

      <div className="categories-header">
        <div>
          <h1>Categories</h1>
          <p>Manage your store categories.</p>
        </div>

        <button
          type="button"
          className="categories-add-btn"
          onClick={() => navigate("/dashboard/categories/add")}
        >
          Add
        </button>
      </div>

      {/* ================= TABLE ================= */}

      <div className="categories-table-container">
        {loading ? (
          <div className="categories-loading">
            <Spinner animation="border" />
            <span>Loading categories...</span>
          </div>
        ) : error ? (
          <div className="categories-error">
            <span>Unable to load categories.</span>

            <button type="button" onClick={() => fetchCategories(currentPage)}>
              Try Again
            </button>
          </div>
        ) : (
          <Table responsive className="categories-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Products</th>
                <th className="tools-column">Tools</th>
              </tr>
            </thead>

            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => {
                  const categoryId = category.id;
                  const categoryName = category.name ?? "—";
                  const productsCount = category.productCount ?? 0;

                  return (
                    <tr key={categoryId}>
                      <td className="category-name">{categoryName}</td>

                      <td className="products-count">{productsCount}</td>

                      <td>
                        <div className="category-tools">
                          {/* ================= DELETE ================= */}

                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Delete</Tooltip>}
                          >
                            <button
                              type="button"
                              className="category-tool-btn delete-btn"
                              onClick={() => handleDeleteClick(categoryId)}
                              disabled={loading}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </OverlayTrigger>

                          {/* ================= EDIT ================= */}

                          <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Edit</Tooltip>}
                          >
                            <button
                              type="button"
                              className="category-tool-btn edit-btn"
                              onClick={() => handleEditClick(categoryId)}
                              disabled={loading}
                            >
                              <FontAwesomeIcon icon={faPen} />
                            </button>
                          </OverlayTrigger>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3" className="categories-empty">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </div>

      {/* ================= PAGINATION ================= */}

      {!loading && !error && categories.length > 0 && (
        <div className="categories-pagination-wrapper">
          <Pagination className="categories-pagination">
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage((prev) => prev - 1);
                }
              }}
            />

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <Pagination.Item
                  key={page}
                  active={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Pagination.Item>
              ),
            )}

            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => {
                if (currentPage < totalPages) {
                  setCurrentPage((prev) => prev + 1);
                }
              }}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
}
