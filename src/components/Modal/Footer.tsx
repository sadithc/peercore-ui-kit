// ModalFooter.js
import React from 'react';

const ModalFooter: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="modal-footer">
    <div className="modal-footer-div">
    {children || "Modal Footer"}
    </div>
  </div>
);

export default ModalFooter;
