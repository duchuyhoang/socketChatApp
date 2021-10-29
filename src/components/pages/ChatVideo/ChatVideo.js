import React, { useEffect, useState, useRef, useCallback } from "react";
import { CONVERSATION_SOCKET, CALL_SOCKET } from "../../../socket/socket";
import { useParams } from "react-router";
import Peer from "peerjs";
import {
  SOCKET_EMIT_ACTIONS,
  SOCKET_ON_ACTIONS,
  SOCKET_CHAT_HOST,
  SOCKET_NAMESPACE,
} from "../../../common/constant";
import { useSocketConnection } from "../../../hooks/useSocketConnection";
import { baseConfig } from "../../../socket/baseConfig";
import useWindowUnloadEffect from "../../hooks/useWindowRefresh";
import SVGIcon from "../../shared/SVGIcon";

const Video = React.memo(
  (props) => {
    const { socketId, call, socket, changeCount, mic, video, type } =
      props.connection;
    const videoRef = useRef(null);
    const [videoStream, setVideoStream] = useState(null);
    const [smtChange, setSmtChange] = useState(false);
    const [videoAudioTrack, setVideoAudioTrack] = useState(null);
    const [videoScreenTrack, setVideoScreenTrack] = useState(null);
    const [videoEnable, setVideoEnable] = useState(false);
    useEffect(() => {
      call.on("stream", (remoteStream) => {
        videoRef.current.srcObject = remoteStream;
        setVideoStream(remoteStream);
        // if(type==="shareScreen")
        // setVideoAudioTrack();
        // else
        // setVideoAudioTrack(remoteStream.getAudioTracks()[0].muted);
        // setVideoScreenTrack(remoteStream.getVideoTracks()[0].muted);

        // videoRef.current.play();
      });
    }, [call]);

    return (
      <div className="videoContainer">
        <div className="videoControlWrapper">
          <div>
            {mic ? (
              <SVGIcon
                style={{ fill: "#fff" }}
                name="microphone"
                width={"20"}
                height={"20"}
              />
            ) : (
              <SVGIcon
                style={{ fill: "red" }}
                name="micoff"
                width={"20"}
                height={"20"}
              />
            )}
          </div>
          <div>Video {video ? <>Enable</> : "Disabled"}</div>
        </div>
        <video ref={videoRef} autoPlay></video>
      </div>
    );
  },
  (currentProps, nextProps) => {
    return (
      currentProps.mic === nextProps.mic &&
      currentProps.video === nextProps.video &&
      nextProps.changeCount === currentProps.changeCount
    );
  }
);

const ChatVideo = () => {
  const { id_conversation } = useParams();
  const [loading, setLoading] = useState(true);
  const [videoTrack, setVideoTrack] = useState(null);
  const [audioTrack, setAudioTrack] = useState(true);
  const [listCallConnection, setListCallConnection] = useState([]);
  const [myPeer, setMyPeer] = useState(null);
  const [myPeerId, setMyPeerId] = useState(null);
  const [myStreamPeer, setMyStreamPeer] = useState(null);
  const [myStreamPeerId, setMyStreamPeerId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [myScreenShare, setScreenShare] = useState(null);
  const videoGrid = useRef(null);
  const [refresh, setRefresh] = useState(false);
  const streamRef = useRef(null);
  const toggleSound = () => {
    // const newAudioTrack = myStream.getAudioTracks()[0].clone();
    // newAudioTrack.enabled = !audioTrack;

    // const newMediaStream=myStream.clone();

    // myStream.getAudioTracks()[0].enabled = !audioTrack;

    // myStream.removeTrack(myStream.getAudioTracks()[0]);
    // myStream.addTrack(newAudioTrack);
    const newAudioTrack = !audioTrack;
    myStream.getAudioTracks()[0].enabled = newAudioTrack;
    // setMyStream(newMediaStream)
    // audioTrack.enabled = !audioTrack.enabled;
    CALL_SOCKET.emit("make change", {
      id_room: id_conversation,
      socketId: CALL_SOCKET.id,
      mic: newAudioTrack,
      video: videoTrack.enabled,
    });
    setAudioTrack(newAudioTrack);
  };

  useWindowUnloadEffect(() => {
    CALL_SOCKET.emit("socketLeave", {
      id_room: id_conversation,
      socketId: CALL_SOCKET.id,
    });
  }, true);

  useEffect(() => {
    CALL_SOCKET.on("user left", ({ socketId }) => {
      const newListCallConnection = [...listCallConnection];

      setListCallConnection(
        newListCallConnection.filter(
          (connection) => connection.socketId !== socketId
        )
      );
    });
    return () => {
      CALL_SOCKET.off("user left");
    };
  }, [listCallConnection]);

  const toggleVideo = () => {
    if (videoTrack) {
      videoTrack.stop();
      videoTrack.enabled = !videoTrack.enabled;
      setRefresh((refresh) => !refresh);
      // setVideoTrack(videoTrack);
      CALL_SOCKET.emit("make change", {
        id_room: id_conversation,
        socketId: CALL_SOCKET.id,
        mic: audioTrack,
        video: false,
      });
    }
  };

  const gotMedia = (stream) => {
    const video = document.createElement("video");
    video.muted = true;
    if ("srcObject" in video) {
      video.srcObject = stream;
    } else {
      video.src = window.URL.createObjectURL(stream); // for older browsers
    }

    videoGrid.current.appendChild(video);
    video.play();
    setMyStream(stream);

    setAudioTrack(stream.getAudioTracks()[0].enabled);
    // setVideoTrack(stream.getVideoTracks()[0].enabled);

    // setAudioTrack(stream.getAudioTracks()[0]);
    setVideoTrack(stream.getVideoTracks()[0]);
  };

  const makeNew = () => {
    const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia(
      {
        video: true,
        // audio: true,
        audio: {
          autoGainControl: false,
          channelCount: 2,
          echoCancellation: false,
          latency: 0,
          noiseSuppression: false,
          sampleRate: 48000,
          sampleSize: 16,
          volume: 1,
          // googNoiseSuppression:true,
          // googEchoCancellation:true
        },
      },
      (stream) => {
        // clear previous video
        videoGrid.current.textContent = "";
        gotMedia(stream);
        // setMyStream(stream);
      }
    );
  };

  const screenShare = () => {
    navigator.mediaDevices
      .getDisplayMedia({
        video: {
          cursor: "always",
        },
        audio: false,
      })
      .then((stream) => {
        setScreenShare(stream);
        if(streamRef?.current){
          const videoScreen=document.createElement("video");
          if ("srcObject" in videoScreen) {
            videoScreen.srcObject = stream;
          } else {
            videoScreen.src = window.URL.createObjectURL(stream); // for older browsers
          }
          streamRef.current.appendChild(videoScreen);
          videoScreen.play();

        }
        setTimeout(() => {
          CALL_SOCKET.emit("start share screen", {
            id_room: id_conversation,
          });
        }, 500);
      })
      .catch((err) => {
        console.error("Error:" + err);
      });
  };

  const addCallConnection = (userSocketId, peerId, userInfo, type) => {
    // Need to pass this user info

    const call = myPeer.call(peerId, myStream, {
      metadata: {
        userInfo,
        socketId: CALL_SOCKET.id,
        mic: myStream.getAudioTracks()[0].enabled,
        video: myStream.getVideoTracks()[0].enabled,
        type,
      },
    });
    return call;
  };

  const stopShare = () => {
    if (myScreenShare && CALL_SOCKET) {
      streamRef.current.textContent="";
      myScreenShare.getVideoTracks()[0].stop();
      setScreenShare(null);
      CALL_SOCKET.emit("stop share", {
        socketId: CALL_SOCKET.id,
        id_room: id_conversation,
      });
    }
  };

  useEffect(() => {
    CALL_SOCKET.connect();

    const newPeer = new Peer();
    const newStreamPeer = new Peer();
    newPeer.on("open", (id) => {
      setMyPeerId(id);
    });

    newStreamPeer.on("open", (id) => {
      setMyStreamPeerId(id);
    });

    setMyPeer(newPeer);
    setMyStreamPeer(newStreamPeer);

    const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia(
      {
        video: true,
        // audio: true,
        audio: {
          autoGainControl: false,
          channelCount: 2,
          echoCancellation: false,
          latency: 0,
          noiseSuppression: false,
          sampleRate: 48000,
          sampleSize: 16,
          volume: 1,
          // googNoiseSuppression:true,
          // googEchoCancellation:true
        },
      },
      gotMedia
    );

    return () => {
      CALL_SOCKET.emit("socketLeave", {
        id_room: id_conversation,
        socketId: CALL_SOCKET.id,
      });
    };
  }, []);

  // Handle share screen
  useEffect(() => {
    if (CALL_SOCKET && myStreamPeer) {
      CALL_SOCKET.on("share to", ({ socketList }) => {
        socketList.map((socketId) => {
          CALL_SOCKET.emit("request share screen", {
            peerId: myStreamPeer._id,
            callerSocketId: CALL_SOCKET.id,
            receiverSocket: socketId,
            type: "shareScreen",
            mic: false,
            video: true,
            userInfo: {
              name: "Huy hoang",
              age: 100,
            },
          });
        });
      });

      CALL_SOCKET.on(
        "user share screen",
        ({ peerId, callerSocketId, userInfo, mic, video, type }) => {
          CALL_SOCKET.emit("accept share screen", {
            callerSocketId,
            socketId: CALL_SOCKET.id,
            peerId: myStreamPeerId,
          });
        }
      );
    }

    return () => {
      CALL_SOCKET.off("share to");
      CALL_SOCKET.off("request share screen");
      CALL_SOCKET.off("user accepted share screen");
    };
  }, [CALL_SOCKET, myStreamPeer, myStreamPeerId]);

  useEffect(() => {
    if (CALL_SOCKET && myScreenShare) {
      CALL_SOCKET.on("user accepted share screen", ({ socketId, peerId }) => {
        myStreamPeer.call(peerId, myScreenShare, {
          metadata: {
            userInfo: {
              name: "huy",
              age: 111,
            },
            socketId: CALL_SOCKET.id,
            mic: false,
            video: true,
            type: "shareScreen",
          },
        });
      });

      // Handler for click stop sharing button
      myScreenShare.getVideoTracks()[0].addEventListener("ended", () => {
        stopShare();
      });
    }

    return () => {
      CALL_SOCKET.off("user accepted share screen");
      if (myScreenShare) {
        myScreenShare.removeEventListener("ended", () => {});
      }
    };
  }, [CALL_SOCKET, myScreenShare]);

  useEffect(() => {
    if (myStreamPeer) {
      myStreamPeer.on("call", (call) => {
        // Just one way connection
        call.answer();
        setListCallConnection((oldList) => [
          ...oldList,
          {
            call,
            mic: false,
            video: true,
            type: "shareScreen",
            userInfo: call.metadata.userInfo,
            changeCount: 0,
            socketId: call.metadata.socketId,
          },
        ]);

        // call.on("stream",remoteStream=>{
        //   console.log("remoteStream",remoteStream);
        // })
      });
    }

    return () => {
      // myStreamPeer
    };
  }, [myStreamPeer]);

  useEffect(() => {
    if (CALL_SOCKET) {
      CALL_SOCKET.off("something change").on(
        "something change",
        ({ id_room, socketId: changeSocketId, mic, video }) => {
          if (changeSocketId !== CALL_SOCKET.id) {
            const newList = [
              ...listCallConnection
                // .filter((connection)=>connection.socketId!==changeSocketId)
                .map((connection) => {
                  if (connection.socketId === changeSocketId) {
                    return {
                      ...connection,
                      mic,
                      video,
                      changeCount: connection.changeCount + 1,
                    };
                  }
                  return connection;
                }),
            ];
            setListCallConnection(newList);
          }
        }
      );

      CALL_SOCKET.off("user stop share").on(
        "user stop share",
        ({ socketId }) => {
          setListCallConnection((oldList) => [
            ...oldList.filter(
              (call) =>
                !(call.socketId === socketId && call.type === "shareScreen")
            ),
          ]);
        }
      );
    }
  }, [listCallConnection, CALL_SOCKET]);

  useEffect(() => {
    if (myPeerId && myStream && myStreamPeer) {
      CALL_SOCKET.emit(SOCKET_EMIT_ACTIONS.ON_GET_LIST_USER_IN_ROOM, {
        id_conversation,
      });

      CALL_SOCKET.on(SOCKET_ON_ACTIONS.EMIT_LIST_USER_RESPONSE, (list_user) => {
        // const peers = [];
        list_user.socketList.map((userSocketId) => {
          CALL_SOCKET.emit("request call", {
            peerId: myPeerId,
            streamPeerId: myStreamPeer._id,
            callerSocketId: CALL_SOCKET.id,
            receiverSocket: userSocketId,
            type: "videoChat",
            mic: myStream.getAudioTracks()[0].enabled,
            video: myStream.getVideoTracks()[0].enabled,
            userInfo: {
              name: "Huy hoang",
              age: 100,
            },
          });
        });
        // setListPeers(peers);
      });

      CALL_SOCKET.on(
        "user joined",
        ({
          callerSocketId,
          peerId,
          streamPeerId,
          userInfo,
          mic,
          video,
          type,
        }) => {
          const call = addCallConnection(
            callerSocketId,
            peerId,
            userInfo,
            type
          );
          setListCallConnection((oldList) => [
            ...oldList.filter(
              (connection) => connection.socketId !== callerSocketId
            ),
            {
              socketId: callerSocketId,
              call,
              userInfo,
              mic,
              video,
              type,
              changeCount: 0,
            },
          ]);
          // if other join and this user is currently streaming
          if (myScreenShare && myStreamPeer) {
            myStreamPeer.call(streamPeerId, myScreenShare, {
              metadata: {
                userInfo: {
                  name: "huy",
                  age: 111,
                },
                socketId: CALL_SOCKET.id,
                mic: false,
                video: true,
                type: "shareScreen",
              },
            });
          }
        }
      );
    }
    return () => {
      if (myPeerId && myStream) {
        CALL_SOCKET.off(SOCKET_ON_ACTIONS.EMIT_LIST_USER_RESPONSE);
        CALL_SOCKET.off("user joined");
      }
    };
  }, [myPeerId, myStream, myScreenShare, myStreamPeer]);

  // Handle call
  useEffect(() => {
    if (myPeerId && myPeer && myStream) {
      myPeer.on("call", (call) => {
        call.answer(myStream);
        setListCallConnection((oldList) => {
          const newList = oldList.filter(
            (connection) => connection.socketId !== call.metadata.socketId
          );
          return [
            ...newList,
            {
              socketId: call.metadata?.socketId || "",
              call,
              userInfo: call.metadata.userInfo || { name: "", age: 0 },
              mic: call.metadata.mic,
              video: call.metadata.video,
              type: "videoChat",
              changeCount: 0,
            },
          ];
        });
      });
    }
    return () => {
      if (myPeerId && myPeer && myStream) {
        myPeer.off("call");
      }
    };
  }, [myPeerId, myPeer, myStream]);

  return (
    <>
      <div ref={videoGrid}></div>
      <div ref={streamRef}></div>
      {/* {audioTrack ? ( */}
      <div>{audioTrack ? "Mic on" : "Mic off"}</div>
      {/* ) : ( */}
      {/* "Dont see any mic plug in" */}
      {/* )} */}

      <div>Hello adadda</div>
      <button onClick={toggleSound}>Audio</button>

      {myStream ? (
        <>
          {myStream.getVideoTracks()[0].enabled ? (
            <button onClick={toggleVideo}>Off Video</button>
          ) : (
            <button onClick={makeNew}>On video</button>
          )}
        </>
      ) : (
        <></>
      )}

      {myScreenShare ? (
        <button onClick={stopShare}>Stop share</button>
      ) : (
        <button onClick={screenShare}>Share screen</button>
      )}
      {listCallConnection.map((callConnection, index) => (
        <Video
          connection={callConnection}
          key={callConnection.type + "_" + callConnection.socketId}
          socket={CALL_SOCKET}
          mic={callConnection.mic}
          video={callConnection.video}
        />
      ))}
    </>
  );
};

export default ChatVideo;
