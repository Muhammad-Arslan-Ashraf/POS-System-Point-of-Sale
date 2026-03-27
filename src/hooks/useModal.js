import { useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const open = (payload = null) => {
    setData(payload);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setData(null);
  };
  return { isOpen, data, open, close };
};
export default useModal;
