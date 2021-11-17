import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import SVGIcon from "../shared/SVGIcon";
import callSound from "../../assets/sounds/callSound.mp3";
export const ConfirmVideoCall = (props) => {
  const history = useHistory();
  const [callAudio] = useState(new Audio(callSound));
  const { currentCallInfo, handleClose } = props;

  useEffect(() => {
    if (callAudio) callAudio.play();
    if (callAudio) {
      callAudio.addEventListener("ended", () => {
        callAudio.play();
      });
    }

    return () => {
      if (callAudio) {
        callAudio.pause();
        callAudio.removeEventListener("ended", () => {
          callAudio.pause();
        });
      }
    };
  }, [callAudio]);

  return (
    <div className="confirmWrapper">
      <h2 className="callUserName">
        <div className="nameContainer">
          <p>{currentCallInfo?.userInfo?.name || ""}</p>
          <span style={{ marginLeft: 5 }}>is calling</span>
        </div>

        <SVGIcon name="close" width="20" height="20" onClick={handleClose} />
      </h2>
      <div className="callButtonContainer">
        <button
          className="confirmButton"
          onClick={() => {
            if (currentCallInfo.newIdRoom)
              history.push(`/call/${currentCallInfo.newIdRoom}`);
          }}
        >
          <SVGIcon name="phone" width="20" height="20" /> Confirm
        </button>
        <button
          onClick={() => {
            handleClose();
          }}
          className="rejectButton"
        >
          <SVGIcon name="close" width="15" height="15" /> Reject
        </button>
      </div>
    </div>
  );
};
