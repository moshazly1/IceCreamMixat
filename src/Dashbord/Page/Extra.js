import { useEffect } from "react";
import { Table, Pagination, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import "./Extra.css";
import useExtraDashbord from "../hooks/useExtraDashbord";

export default function Extras() {
  const navigate = useNavigate();

  const {
    extras,
    getDashboardExtras,
    deleteDashboardExtra,
    currentPage,
    totalPages,
    hasNext,
    hasPrevious,
    loading,
    error,
  } = useExtraDashbord();

  // =========================
  // GET EXTRAS
  // =========================

  useEffect(() => {
    const fetchExtras = async () => {
      try {
        await getDashboardExtras(1);
      } catch (err) {
        console.error("Extras Fetch Error:", err);
      }
    };

    fetchExtras();
  }, []);

  // =========================
  // PAGINATION
  // =========================

  const handlePreviousPage = () => {
    if (hasPrevious && !loading) {
      getDashboardExtras(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNext && !loading) {
      getDashboardExtras(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (!loading && page !== currentPage) {
      getDashboardExtras(page);
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDeleteClick = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this extra?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDashboardExtra([id]);

      await getDashboardExtras(currentPage);
    } catch (err) {
      console.error("Delete Extra Error:", err);
    }
  };

  // =========================
  // EDIT
  // =========================

  const handleEditClick = (id) => {
    navigate(`/dashboard/extras/edit/${id}`);
  };

  return (
    <div className="extras-page">
      {/* ================= HEADER ================= */}

      <div className="extras-header">
        <div className="extras-title">
          <h1>Extras</h1>

          <button
            type="button"
            className="extras-add-btn"
            onClick={() => navigate("/dashboard/extras/add")}
          >
            Add
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}

      <div className="extras-table-container">
        <Table responsive className="extras-table">
          <thead>
            <tr>
              <th>Name</th>

              <th>Price</th>

              <th className="extras-center">Available</th>

              <th className="extras-tools-heading">Tools</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center">
                  Loading extras...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="4" className="text-center">
                  Unable to load extras.
                </td>
              </tr>
            ) : extras.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No extras found.
                </td>
              </tr>
            ) : (
              extras.map((extra) => (
                <tr key={extra.id}>
                  {/* NAME */}

                  <td className="extra-name">{extra.name || "-"}</td>

                  {/* PRICE */}

                  <td className="extra-price">{extra.price ?? "-"}</td>

                  {/* AVAILABLE */}

                  <td className="extras-center">
                    <span
                      className={`extra-status-dot ${
                        extra.available ? "is-available" : "is-unavailable"
                      }`}
                    />
                  </td>

                  {/* TOOLS */}

                  <td>
                    <div className="extras-tools">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Delete</Tooltip>}
                      >
                        <button
                          type="button"
                          className="extra-tool-btn extra-delete-btn"
                          onClick={() => handleDeleteClick(extra.id)}
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
                          className="extra-tool-btn extra-edit-btn"
                          onClick={() => handleEditClick(extra.id)}
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

      <div className="extras-pagination-wrapper">
        <Pagination className="extras-pagination">
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
