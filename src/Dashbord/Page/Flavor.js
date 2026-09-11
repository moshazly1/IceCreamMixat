import { useEffect } from "react";
import { Table, Pagination, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import "./Flavor.css";
import useFlavorDashbord from "../hooks/useFlavorDashbord";

export default function Flavors() {
  const navigate = useNavigate();

  const {
    flavors,
    getDashboardFlavors,
    deleteDashboardFlavor,
    currentPage,
    totalPages,
    hasNext,
    hasPrevious,
    loading,
    error,
  } = useFlavorDashbord();

  // =========================
  // GET FLAVORS
  // =========================

  useEffect(() => {
    const fetchFlavors = async () => {
      try {
        await getDashboardFlavors(1);
      } catch (err) {
        console.error("Flavors Fetch Error:", err);
      }
    };

    fetchFlavors();
  }, []);

  // =========================
  // PAGINATION
  // =========================

  const handlePreviousPage = () => {
    if (hasPrevious && !loading) {
      getDashboardFlavors(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNext && !loading) {
      getDashboardFlavors(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (!loading && page !== currentPage) {
      getDashboardFlavors(page);
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDeleteClick = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this flavor?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDashboardFlavor([id]);

      await getDashboardFlavors(currentPage);
    } catch (err) {
      console.error("Delete Flavor Error:", err);
    }
  };

  // =========================
  // EDIT
  // =========================

  const handleEditClick = (id) => {
    navigate(`/dashboard/flavors/edit/${id}`);
  };

  return (
    <div className="flavors-page">
      {/* ================= HEADER ================= */}

      <div className="flavors-header">
        <div className="flavors-title">
          <h1>Flavors</h1>

          <button
            type="button"
            className="flavors-add-btn"
            onClick={() => navigate("/dashboard/flavors/add")}
          >
            Add
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}

      <div className="flavors-table-container">
        <Table responsive className="flavors-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Extra Price</th>
              <th className="flavors-center">Available</th>
              <th className="flavors-tools-heading">Tools</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center">
                  Loading flavors...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="4" className="text-center">
                  Unable to load flavors.
                </td>
              </tr>
            ) : flavors.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No flavors found.
                </td>
              </tr>
            ) : (
              flavors.map((flavor) => (
                <tr key={flavor.id}>
                  {/* NAME */}

                  <td className="flavor-name">{flavor.name || "-"}</td>

                  {/* EXTRA PRICE */}

                  <td className="flavor-price">{flavor.extraPrice ?? "-"}</td>

                  {/* AVAILABLE */}

                  <td className="flavors-center">
                    <span
                      className={`flavor-status-dot ${
                        flavor.available ? "is-available" : "is-unavailable"
                      }`}
                    />
                  </td>

                  {/* TOOLS */}

                  <td>
                    <div className="flavors-tools">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Delete</Tooltip>}
                      >
                        <button
                          type="button"
                          className="flavor-tool-btn flavor-delete-btn"
                          onClick={() => handleDeleteClick(flavor.id)}
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
                          className="flavor-tool-btn flavor-edit-btn"
                          onClick={() => handleEditClick(flavor.id)}
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

      <div className="flavors-pagination-wrapper">
        <Pagination className="flavors-pagination">
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
