type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: "rgb(211, 211, 211)",
        border: "2px solid rgb(234, 51, 36)",
        borderRadius: "5px",
        color: "rgb(234, 51, 36)",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
