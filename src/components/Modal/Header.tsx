import React from 'react';

export interface ModalHeaderProps{
    header?: string;
}

const ModalHeader: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="modal-header">
    <div className='modalheader-div'>{children || "Modal Header"}</div>
  </div>
);

export default ModalHeader;
