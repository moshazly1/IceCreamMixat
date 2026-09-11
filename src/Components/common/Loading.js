import "./Loading.css";

export default function Loading({ text }) {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>

      {text && <p>{text}</p>}
    </div>
  );
}
