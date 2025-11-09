export const Notice = ({ notice }) => {
  if (!notice) {
    return null;
  }

  return (
    <div
      style={{
        background: "#ddd",
        border: "2px solid",
        borderColor: notice.type === "error" ? "red" : "green",
        color: notice.type === "error" ? "red" : "green",
        margin: "12px 0",
        padding: "12px",
      }}
    >
      {notice.message}
    </div>
  );
};
