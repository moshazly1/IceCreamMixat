import { useEffect } from "react";
import { Table, Pagination, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import "./Product.css";
import useProductDashbord from "../hooks/useProductDashbord";

export default function Products() {
  const navigate = useNavigate();

  const {
    products,
    getDashboardProducts,
    deleteDashboardProducts,
    currentPage,
    totalPages,
    hasNext,
    hasPrevious,
    loading,
    error,
  } = useProductDashbord();

  // =========================
  // GET PRODUCTS
  // =========================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await getDashboardProducts(1);
      } catch (err) {
        console.error("Products Fetch Error:", err);
      }
    };

    fetchProducts();
  }, []);

  // =========================
  // PAGINATION
  // =========================

  const handlePreviousPage = () => {
    if (hasPrevious && !loading) {
      getDashboardProducts(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNext && !loading) {
      getDashboardProducts(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (!loading && page !== currentPage) {
      getDashboardProducts(page);
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDeleteClick = async (id) => {
    if (loading) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      await deleteDashboardProducts([id]);

      await getDashboardProducts(currentPage);
    } catch (err) {
      console.error("Delete Product Failed:", err);
    }
  };

  // =========================
  // EDIT
  // =========================

  const handleEditClick = (id) => {
    navigate(`/dashboard/products/edit/${id}`);
  };

  return (
    <div className="products-page">
      {/* ================= HEADER ================= */}

      <div className="products-header">
        <div className="products-title">
          <h1>Products</h1>

          <button
            type="button"
            className="products-add-btn"
            onClick={() => navigate("/dashboard/products/add")}
          >
            Add
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}

      <div className="products-table-container">
        <Table responsive className="products-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Base Price</th>
              <th>Category</th>
              <th className="products-center">Available</th>
              <th className="products-center">Offer</th>
              <th className="products-center">Offer Percent</th>
              <th className="products-tools-heading">Tools</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center">
                  Loading products...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" className="text-center">
                  Unable to load products.
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  {/* NAME */}

                  <td className="product-name">{product.name || "-"}</td>

                  {/* BASE PRICE */}

                  <td className="product-price">{product.basePrice ?? "-"}</td>

                  {/* CATEGORY */}

                  <td className="product-category">
                    {product.category || "-"}
                  </td>

                  {/* AVAILABLE */}

                  <td className="products-center">
                    <span
                      className={`product-status-dot ${
                        product.available ? "is-available" : "is-unavailable"
                      }`}
                    />
                  </td>

                  {/* OFFER */}

                  <td className="products-center">
                    <span
                      className={`product-status-dot ${
                        product.offer ? "is-available" : "is-unavailable"
                      }`}
                    />
                  </td>

                  {/* OFFER PERCENT */}

                  <td className="products-center product-offer-percent">
                    {product.offer_precent ?? "-"}
                  </td>

                  {/* TOOLS */}

                  <td>
                    <div className="products-tools">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Delete</Tooltip>}
                      >
                        <button
                          type="button"
                          className="products-tool-btn products-delete-btn"
                          onClick={() => handleDeleteClick(product.id)}
                          disabled={loading}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </OverlayTrigger>

                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Edit</Tooltip>}
                      >
                        <button
                          type="button"
                          className="products-tool-btn products-edit-btn"
                          onClick={() => handleEditClick(product.id)}
                          disabled={loading}
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                      </OverlayTrigger>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* ================= PAGINATION ================= */}

      <div className="products-pagination-wrapper">
        <Pagination className="products-pagination">
          <Pagination.Prev
            disabled={!hasPrevious || loading}
            onClick={handlePreviousPage}
          />

          {Array.from(
            {
              length: totalPages,
            },
            (_, index) => {
              const page = index + 1;

              return (
                <Pagination.Item
                  key={page}
                  active={page === currentPage}
                  disabled={loading}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </Pagination.Item>
              );
            },
          )}

          <Pagination.Next
            disabled={!hasNext || loading}
            onClick={handleNextPage}
          />
        </Pagination>
      </div>
    </div>
  );
}
