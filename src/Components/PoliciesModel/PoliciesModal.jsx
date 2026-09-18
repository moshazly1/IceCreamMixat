import { useState } from "react";
import "./PoliciesModal.css";

export default function PoliciesModal({ onClose, requireAcceptance = false }) {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (requireAcceptance && !accepted) return;

    onClose();
  };

  return (
    <div className="policies-overlay">
      <div className="policies-modal">
        {/* Header */}
        <div className="policies-header">
          <div className="policies-icon">
            <i className="bi bi-flag-fill"></i>
          </div>

          <h2>Terms and Conditions</h2>
        </div>

        {/* Content */}
        <div className="policies-content">
          <section className="policy-section">
            <h3>Terms and Conditions</h3>

            <p>
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy
            </p>
          </section>

          <section className="policy-section">
            <h3>Terms and Conditions</h3>

            <p>
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy
            </p>
          </section>

          <section className="policy-section">
            <h3>Terms and Conditions</h3>

            <p>
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy
            </p>
          </section>

          <section className="policy-section">
            <h3>Terms and Conditions</h3>

            <p>
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy
            </p>
          </section>

          {/* Agreement */}
          {requireAcceptance && (
            <label className="policy-agreement">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />

              <span>I have read and agree to the Terms and Conditions.</span>
            </label>
          )}
        </div>

        {/* Footer */}
        <div className="policies-footer">
          <button
            className="policies-accept-btn"
            disabled={requireAcceptance && !accepted}
            onClick={handleAccept}
          >
            {requireAcceptance ? "Accept" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
