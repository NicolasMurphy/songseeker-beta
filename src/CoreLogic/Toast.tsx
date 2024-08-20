import { useState, useEffect } from "react";

interface ToastProps {
  message: string;
  duration: number;
}

const Toast: React.FC<ToastProps> = ({ message, duration }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div className="alert alert-success">
      <span>{message}</span>
    </div>
  );
};

export default Toast;
