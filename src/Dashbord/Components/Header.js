import { NavLink } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../Auth/AuthContext";

import "./HeaderDashbord.css";

export default function Headers({ onMenuClick }) {
  const { user } = useAuth();

  const userEmail = user?.email || "";
  const userRole = user?.role || "";

  const userInitials = userEmail ? userEmail.slice(0, 2).toUpperCase() : "US";

  return (
    <header className="dashboard-header">
      <Navbar className="dashboard-navbar" dir="ltr">
        <Container fluid className="dashboard-header-container">
          {/* ================= LEFT ================= */}

          <div className="dashboard-header-left">
            <button
              type="button"
              className="dashboard-header-menu"
              onClick={onMenuClick}
              aria-label="Open menu"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>

            <Navbar.Brand
              as={NavLink}
              to="/"
              className="dashboard-header-brand"
            >
              <span className="dashboard-header-store-name">
                IceCreamMixat.
              </span>
            </Navbar.Brand>
          </div>

          {/* ================= RIGHT ================= */}

          <div className="dashboard-user">
            <div className="dashboard-user-avatar">
              <span>{userInitials}</span>
            </div>

            <div className="dashboard-user-info">
              <div className="dashboard-user-name">{userEmail}</div>

              <div className="dashboard-user-role">{userRole}</div>
            </div>
          </div>
        </Container>
      </Navbar>
    </header>
  );
}
