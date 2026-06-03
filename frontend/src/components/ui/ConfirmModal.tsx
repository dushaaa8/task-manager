import React from "react";
import Button from "./Button";
import ModalMenu from "./ModalMenu";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string | React.ReactNode;
  confirmText: string;
  onConfirm: () => void;
};

export default function ConfirmModal({
  isOpen,
  onClose,
  title,
  description,
  confirmText,
  onConfirm,
}: Props) {
  return (
    <ModalMenu isOpen={isOpen} onClose={onClose} title={title}>
      <p className="mb-8 text-secondary-gray">{description}</p>

      <div className="flex gap-5">
        <Button onClick={onClose}>No, This was a Mistake</Button>
        <Button
          className={"bg-red-50 text-primary-wine! hover:bg-red-100"}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmText}
        </Button>
      </div>
    </ModalMenu>
  );
}
