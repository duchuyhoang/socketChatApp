import React, { useEffect, useRef, useState } from 'react';

const Popover = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  const handleClick = () => {
    // setIsOpen((prev) => !prev);
    setIsOpen(true);

  };

  useEffect(() => {
    const handleMousedown = (e) => {
      // if (!popoverRef.current.contains(e.target)) setIsOpen(false);
    };

    document.addEventListener('mousedown', handleMousedown);
    return () => {
      document.removeEventListener('mousedown', handleMousedown);
    };
  }, []);

  return (
    <div className='popover-root' onClick={handleClick} ref={popoverRef}>
      {props.root}

      {isOpen && (
        <div className={`popover ${props.type ? props.type : ''}`}>
          {props.children}
        </div>
      )}
    </div>
  );
};

export default Popover;
