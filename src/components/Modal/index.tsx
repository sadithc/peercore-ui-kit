import React, { useEffect, useMemo, useState } from "react";
import "./style.scss";
import ModalHeader from "./Header";
import ModalBody from "./Body";
import ModalFooter from "./Footer";
import { Icon } from "@iconify/react";

export interface ModalProps {
  isDraggable?: boolean;
  isOutsideScrollable?: boolean;
  onCloseFunc?: () => void;
  showHeader?: boolean;
  showFooter?: boolean;
  width?: string;
  height?: string;
  disableCloseButton?: boolean;
  customClass?: string;
  isOutsideScroll?: boolean;
  isOpen: boolean;
  children?: React.ReactNode;
}
const Modal = ({ isDraggable = true, isOutsideScrollable = true, isOpen = false, onCloseFunc, width = "600px", height = "400px", showHeader = true, isOutsideScroll = true, showFooter = true, disableCloseButton = false, customClass = '', children }: ModalProps): React.ReactElement => {
  // const [isOpen, setIsOpen] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(isOpen);
  const [modalPosition, setModalPosition] = useState({ top: 50, left: 50 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  {console.log(isOpenModal)}
  const handleClose = () => {
         setIsOpenModal(false); 
    }

  // Close the modal when the background is clicked
  const handleOutsideClick = (e: any) => {
    handleClose();
    onCloseFunc?.();
  };

  const handleDragStart = (e: any) => {
    if (isDraggable) {
      setDragging(true);
      const { left, top } = e.target.getBoundingClientRect();
      setOffset({ x: e.clientX - left, y: e.clientY - top });
    }
  };

  const handleDrag = (e: any) => {
    if (dragging) {
      const newLeft = e.clientX - offset.x;
      const newTop = e.clientY - offset.y;
      setModalPosition({
        left: newLeft,
        top: newTop,
      });
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleCloseClick = () => {
    handleClose();
    onCloseFunc?.();
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = isOutsideScroll ? 'auto' : 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpenModal, isOutsideScroll]);

  useEffect(() => {
    const centerModal = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const modalWidth = parseInt(width, 10);
      const modalHeight = parseInt(height, 10);

      const centeredTop = (windowHeight - modalHeight) / 3;
      const centeredLeft = (windowWidth - modalWidth) / 2;

      setModalPosition({
        top: centeredTop,
        left: centeredLeft,
      });
    };

    if (!isOpenModal) {
      centerModal();
      // Optionally, listen for window resizing
      window.addEventListener('resize', centerModal);
    }

    return () => {
      window.removeEventListener('resize', centerModal);
    };
  }, [ isOpenModal, width, height]);

  // if (isOpenModal) return null;

  const header = useMemo(() => {
    return React.Children.toArray(children).find((child: any) => child.type === ModalHeader) || null;
  }, [children]);

  const body = useMemo(() => {
    return React.Children.toArray(children).find((child: any) => child.type === ModalBody) || null;
  }, [children]);

  const footer = useMemo(() => {
    return React.Children.toArray(children).find((child: any) => child.type === ModalFooter) || null;
  }, [children]);


  return (
    <>
      {isOpen && (
        <>
          <div className={`modal-wrapper ${isOutsideScrollable ? 'scrollable' : 'non-scrollable'}`} onClick={handleOutsideClick} >
            <span className="modal-close-overlayer" ></span>
            <div className={`modal-container ${isDraggable ? 'mouse' : ''} ${customClass}`} style={{
              width, height, position: 'absolute', top: `${modalPosition.top}px`,
              left: `${modalPosition.left}px`
            }}
              onMouseDown={handleDragStart}
              onMouseMove={handleDrag}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
            >
              <div className=" close-btn">
                {!disableCloseButton && (
                  <button className="modal-close" onClick={handleCloseClick}><Icon icon="mingcute:close-fill" /></button>
                )}
              </div>
              {
                showHeader && (
                  <ModalHeader>
                    {header}
                  </ModalHeader>
                )
              }

              <ModalBody>
                {body}
              </ModalBody>

              {showFooter && (
                <ModalFooter>
                  {footer}
                </ModalFooter>
              )}

            </div>

          </div>
        </>
      )}
    </>
  );
};

export default Modal;
