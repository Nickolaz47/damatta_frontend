// Hooks
import { useState, useEffect } from "react";
// CSS
import "./Message.css";

const Message = ({
  msg,
  type,
}: {
  msg: string | null;
  type: string | null;
}) => {
  const [message, setMessage] = useState(msg);
  const [warningType, setWarningType] = useState(type);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
      setWarningType("d-none");
    }, 5000);
  }, [msg]);

  return (
    <div className={`message ${warningType}`}>
      <p>{message}</p>
    </div>
  );
};

export default Message;
