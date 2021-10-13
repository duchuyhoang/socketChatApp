import React from 'react';

function Grid({ col = '', mdCol = '', smCol = '', gap = '0', ...rest }) {
  const style = {
    gap: gap,
  };
  return (
    <div
      className={`grid grid-col-${col} grid-col-sm-${smCol} grid-col-md-${mdCol}`}
      style={style}
    >
      {rest.children}
    </div>
  );
}

export default Grid;
