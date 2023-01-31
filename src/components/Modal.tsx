/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from "react";
import { PropsModal } from "../types/types";

const Modal = (props: PropsModal) => {
  const { visible, cancel, children } = props;

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: Event) => {
      const element = e.target as HTMLElement;
      if (visible && modalRef.current && !modalRef.current.contains(element))
        cancel();
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [visible]);

  return (
    <>
      {visible && (
        <div className="modal-bg">
          <div ref={modalRef} className="modal-container">
            <button onClick={cancel}>close</button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
