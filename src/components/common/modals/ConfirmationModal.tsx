import React from "react";
import Modal from "./Modal";

interface confirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<confirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-bold">
        Are you sure you want to delete this application?
      </h2>
      <div
        className="flex justify-end
                            space-x-4 mt-4"
      >
        <button
          className="px-4 py-2 bg-gray-500
                               text-white rounded-lg"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-red-500
                               text-white rounded-lg"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
