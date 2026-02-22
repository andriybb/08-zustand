"use client";
import { useEffect } from "react";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}
let modalRoot: HTMLElement | null = null;

if (typeof document !== 'undefined') {
  modalRoot = document.querySelector('#modal-root') || document.body;
}
export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
    };
}, [onClose]);

const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
        onClose();
    }
};
  
  if (!modalRoot) return null;

  return createPortal(
    <div
  className={css.backdrop}
  role="dialog"
  aria-modal="true"
  onClick={handleBackdropClick}
>
  <div className={css.modal}>
  {children}
  </div>
</div>, modalRoot);
}