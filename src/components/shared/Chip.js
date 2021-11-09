import React from "react";
import SVGIcon from "./SVGIcon";

const Chip = (props) => {
    const {content,handleDelete}=props
  return (
    <div className="chip">
        {content}
      <SVGIcon className="chip__close" name="close" onClick={handleDelete}/>
    </div>
  )
};

export default Chip;
