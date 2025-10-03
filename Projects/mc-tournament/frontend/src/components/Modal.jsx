import React from "react";

export default function Modal({ children, onClose }) {
  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        className="modal-content"
        style={{
          background: "#111",
          padding: "20px",
          borderRadius: "12px",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          color: "white",
        }}
      >
        {children}

        {onClose && (
          <button
            onClick={onClose}
            style={{
              marginTop: "15px",
              background: "red",
              padding: "8px 16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              color: "white",
            }}
          >
            ✖ Close
          </button>
        )}
      </div>
    </div>
  );
}
