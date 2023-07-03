export const ConfirmationDialog = ({ title, message, onSubmit, onCancel }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          padding: 20,
          position: "absolute",
          backgroundColor: "white",
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4>{title}</h4>
        <p>{message}</p>
        <div>
          <button onClick={onSubmit}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};
