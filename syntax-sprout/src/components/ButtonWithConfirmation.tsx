import React, { useState } from 'react';
import ConfirmationDialog from './ConfirmationDialog'; // Assuming you already have a confirmation dialog component
import Tooltip from '../utils/Tooltip';

interface ButtonWithConfirmationProps {
  action: () => void          // The action to confirm (e.g., deleting a tree)
  buttonText: string         // The text of the button (e.g., "Delete")
  confirmationMessage: string // Custom message to show in the confirmation dialog
  className?: string
  tooltip?: string       // Optional: Add any additional classes to the button
}

const ButtonWithConfirmation: React.FC<ButtonWithConfirmationProps> = ({
  action,
  buttonText,
  confirmationMessage,
  className,
  tooltip
}) => {
  const [isDialogVisible, setDialogVisible] = useState(false);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    setDialogVisible(true) // Show confirmation dialog
  }

  const handleConfirm = () => {
    action()               // Perform the action
    setDialogVisible(false) // Close the dialog
  }

  const handleCancel = () => {
    setDialogVisible(false) // Close the dialog without doing anything
  }

  return (
    <>
    <Tooltip text={tooltip ? tooltip : null}>
      <button
        className={className ? className : "px-4 py-2 bg-red-600 text-white rounded"}
        onClick={handleButtonClick}
      >
        {buttonText}
      </button>
    </Tooltip>
      {isDialogVisible && (
        <ConfirmationDialog
          message={confirmationMessage}
          isVisible={isDialogVisible}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default ButtonWithConfirmation;