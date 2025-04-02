type NoticeMessageProps = {
  message: string;
};

const NoticeMessage = ({ message }: NoticeMessageProps) => {
  if (!message) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: "rgb(211, 211, 211)",
        border: "2px solid rgb(56, 126, 36)",
        borderRadius: "5px",
        color: "rgb(71, 131, 51)",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      {message}
    </div>
  );
};

export default NoticeMessage;
