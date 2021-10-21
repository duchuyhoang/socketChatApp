import React, { useEffect, useState } from 'react';

function Select(props) {
  const { onChange = () => {}, options = [], defaultOption, value } = props;
  const [currentSelect, setCurrentSelect] = useState(defaultOption);
  const [openSelect, setOpenSelect] = useState(false);
  useEffect(() => {
    onChange(currentSelect);
  }, [currentSelect, onChange]);

  return (
    <div className='select-custom'>
      <div
        className={`select-custom__select ${openSelect ? 'open' : ''}`}
        onClick={() => setOpenSelect((prev) => !prev)}
      >
        <span>{value ? options[value] : options[currentSelect]}</span>
        <ul className='select-custom__option'>
          {props.options.map((item, index) => (
            <li
              className={index === currentSelect ? 'active' : ''}
              key={index}
              onClick={() => setCurrentSelect(index)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Select;
