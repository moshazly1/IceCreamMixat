import { Offcanvas } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidbar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faHouse,
  faTableCellsLarge,
  faBoxOpen,
  faIceCream,
  faTags,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../Auth/AuthContext";
import dashboardAxiosInstance from "../../API/dashboardAxiosInstance";
import { LOGOUT } from "../../API/API";

export default function Sidebar({ show, onClose }) {
  const navigate = useNavigate();

  const { clearAuth } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await dashboardAxiosInstance.post(LOGOUT);
      clearAuth();
      onClose?.();

      navigate("/dashboard/login", { replace: true });
    } catch (err) {
      // Clear local authentication even if backend logout fails
      clearAuth();
      onClose?.();

      navigate("/dashboard/login", { replace: true });
    }
  };

  const navLinksMain = [
    {
      to: "/dashboard/orders",
      icon: faClipboardList,
      label: "Orders",
    },
    {
      to: "/dashboard/completed-orders",
      icon: faClipboardList,
      label: "Completed Orders",
    },
    {
      to: "/dashboard/categories",
      icon: faTableCellsLarge,
      label: "Categories",
    },
    {
      to: "/dashboard/products",
      icon: faBoxOpen,
      label: "Products",
    },
    {
      to: "/dashboard/flavors",
      icon: faIceCream,
      label: "Flavors",
    },
    {
      to: "/dashboard/extras",
      icon: faTags,
      label: "Extras",
    },
  ];

  const navLinksOther = [
    {
      to: "/",
      icon: faHouse,
      label: "Website",
    },
  ];

  const renderNavLinks = (links) =>
    links.map((link) => (
      <NavLink
        key={link.to}
        to={link.to}
        end={link.to === "/"}
        onClick={onClose}
        className={({ isActive }) =>
          `dashboard-nav-link ${isActive ? "active" : ""}`
        }
      >
        <span className="dashboard-nav-icon">
          <FontAwesomeIcon icon={link.icon} />
        </span>

        <span className="dashboard-nav-label">{link.label}</span>
      </NavLink>
    ));

  return (
    <>
      {/* ================= DESKTOP ================= */}

      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-brand">
          <div className="dashboard-brand-name">IceCreamMixat.</div>
        </div>

        <div className="dashboard-sidebar-main">
          <div className="dashboard-section-title">Main</div>

          <nav className="dashboard-nav">{renderNavLinks(navLinksMain)}</nav>
        </div>

        <div className="dashboard-sidebar-other">
          <div className="dashboard-section-title">Other</div>

          <nav className="dashboard-nav">
            {renderNavLinks(navLinksOther)}

            <button
              type="button"
              className="dashboard-nav-link dashboard-logout"
              onClick={handleLogout}
            >
              <span className="dashboard-nav-icon">
                <FontAwesomeIcon icon={faRightFromBracket} />
              </span>

              <span className="dashboard-nav-label">Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* ================= MOBILE ================= */}

      <Offcanvas
        show={show}
        onHide={onClose}
        placement="start"
        className="dashboard-sidebar-offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <span className="mobile-brand-name">IceCreamMixat.</span>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <div className="dashboard-section-title">Main</div>

          <nav className="dashboard-nav">{renderNavLinks(navLinksMain)}</nav>

          <div className="dashboard-mobile-other">
            <div className="dashboard-section-title">Other</div>

            <nav className="dashboard-nav">
              {renderNavLinks(navLinksOther)}

              <button
                type="button"
                className="dashboard-nav-link dashboard-logout"
                onClick={handleLogout}
              >
                <span className="dashboard-nav-icon">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </span>

                <span className="dashboard-nav-label">Logout</span>
              </button>
            </nav>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
