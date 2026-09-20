import { useState } from "react";
import "./PoliciesModal.css";
import useLanguage from "../../hooks/useLanguage";

export default function PoliciesModal({ onClose, requireAcceptance = false }) {
  const [accepted, setAccepted] = useState(false);

  const { t } = useLanguage();

  const handleAccept = () => {
    if (requireAcceptance && !accepted) return;

    onClose();
  };

  return (
    <div className="policies-overlay">
      <div className="policies-modal">
        {/* ================= HEADER ================= */}

        <div className="policies-header">
          <div className="policies-icon">
            <i className="bi bi-shield-check"></i>
          </div>

          <h2>{t("policiesTitle")}</h2>
        </div>

        {/* ================= CONTENT ================= */}

        <div className="policies-content">
          {/* ================= TERMS & CONDITIONS ================= */}

          <section className="policy-section">
            <h3>{t("termsTitle")}</h3>

            <p>{t("termsWelcome")}</p>

            <p>{t("termsIntro")}</p>

            <h4>{t("termsOrdersTitle")}</h4>

            <p>{t("termsOrdersText")}</p>

            <p>{t("termsOrdersConfirmation")}</p>

            <h4>{t("termsProductsTitle")}</h4>

            <p>{t("termsProductsText")}</p>

            <p>{t("termsProductsPreparation")}</p>

            <h4>{t("termsPricesTitle")}</h4>

            <p>{t("termsPricesText")}</p>

            <p>{t("termsPricesChanges")}</p>

            <p>{t("termsPayment")}</p>

            <h4>{t("termsCancellationTitle")}</h4>

            <p>{t("termsCancellationText")}</p>

            <p>{t("termsCancellationPreparation")}</p>

            <p>{t("termsCancellationDelivery")}</p>

            <h4>{t("termsDeliveryTitle")}</h4>

            <p>{t("termsDeliveryText")}</p>

            <p>{t("termsDeliveryUnavailable")}</p>

            <h4>{t("termsFoodTitle")}</h4>

            <p>{t("termsFoodText")}</p>

            <p>{t("termsFoodReturn")}</p>

            <h4>{t("termsChangesTitle")}</h4>

            <p>{t("termsChangesText")}</p>

            <p>{t("termsChangesAcceptance")}</p>

            <h4>{t("termsContactTitle")}</h4>

            <p>{t("termsContactText")}</p>
          </section>

          {/* ================= REFUND POLICY ================= */}

          <section className="policy-section">
            <h3>{t("refundTitle")}</h3>

            <p>{t("refundIntro")}</p>

            <h4>{t("refundOrderCancellationTitle")}</h4>

            <p>{t("refundOrderCancellationText")}</p>

            <p>{t("refundOrderCancellationStarted")}</p>

            <h4>{t("refundAfterPreparationTitle")}</h4>

            <p>{t("refundAfterPreparationText")}</p>

            <h4>{t("refundErrorTitle")}</h4>

            <p>{t("refundErrorText")}</p>

            <p>{t("refundErrorResolution")}</p>

            <h4>{t("refundDeliveryDamageTitle")}</h4>

            <p>{t("refundDeliveryDamageText")}</p>

            <h4>{t("refundRefundsTitle")}</h4>

            <p>{t("refundRefundsText")}</p>

            <p>{t("refundNoRefundText")}</p>
          </section>

          {/* ================= PRIVACY POLICY ================= */}

          <section className="policy-section">
            <h3>{t("privacyTitle")}</h3>

            <p>{t("privacyIntro")}</p>

            <h4>{t("privacyInformationTitle")}</h4>

            <p>{t("privacyInformationText")}</p>

            <ul>
              <li>{t("privacyName")}</li>
              <li>{t("privacyPhone")}</li>
              <li>{t("privacyAddress")}</li>
              <li>{t("privacyOrderDetails")}</li>
              <li>{t("privacyContact")}</li>
            </ul>

            <h4>{t("privacyUseTitle")}</h4>

            <p>{t("privacyUseText")}</p>

            <ul>
              <li>{t("privacyUseOrders")}</li>
              <li>{t("privacyUseDelivery")}</li>
              <li>{t("privacyUseCommunication")}</li>
              <li>{t("privacyUseSupport")}</li>
              <li>{t("privacyUseImprove")}</li>
            </ul>

            <h4>{t("privacyPaymentTitle")}</h4>

            <p>{t("privacyPaymentText")}</p>

            <p>{t("privacyPaymentCard")}</p>

            <h4>{t("privacyProtectionTitle")}</h4>

            <p>{t("privacyProtectionText")}</p>

            <h4>{t("privacySharingTitle")}</h4>

            <p>{t("privacySharingText")}</p>

            <p>{t("privacySharingProviders")}</p>

            <h4>{t("privacyContactTitle")}</h4>

            <p>{t("privacyContactText")}</p>
          </section>

          {/* ================= BUSINESS INFORMATION ================= */}

          <section className="policy-section business-policy">
            <h3>{t("businessTitle")}</h3>

            <h4>{t("businessAddressTitle")}</h4>

            <p>{t("businessAddress")}</p>
          </section>

          {/* ================= AGREEMENT ================= */}

          {requireAcceptance && (
            <label className="policy-agreement">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />

              <span>{t("policyAgreement")}</span>
            </label>
          )}
        </div>

        {/* ================= FOOTER ================= */}

        <div className="policies-footer">
          <button
            className="policies-accept-btn"
            disabled={requireAcceptance && !accepted}
            onClick={handleAccept}
          >
            {requireAcceptance ? t("accept") : t("close")}
          </button>
        </div>
      </div>
    </div>
  );
}
