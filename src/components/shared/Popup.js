import React, { useEffect, useRef, useState } from 'react';

const Popup = (props) => {
const {isOpen,setIsOpen}=props;
  const popoverRef = useRef(null);


//   useEffect(() => {
//     const handleMousedown = (e) => {
//       // if (!popoverRef.current.contains(e.target)) setIsOpen(false);
//     };

//     document.addEventListener('mousedown', handleMousedown);
//     return () => {
//       document.removeEventListener('mousedown', handleMousedown);
//     };
//   }, []);

  return (
    <div className='popover-root' ref={popoverRef}>
      {props.root}

      {isOpen && (
        <div className={`popover ${props.type ? props.type : ''}`}>
          {props.children}
        </div>
      )}
    </div>
  );
};

export default Popup;
