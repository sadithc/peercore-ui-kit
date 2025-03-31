// ModalBody.js
import React from 'react';

const ModalBody: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="modal-body">
    {children || "Modal Body Content"}
  </div>
);

export default ModalBody;
