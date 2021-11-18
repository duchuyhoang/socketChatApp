/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, useMemo } from "react";
import { CONVERSATION_SOCKET, CALL_SOCKET } from "../../../socket/socket";
import { useParams } from "react-router";
import Peer from "peerjs";
import {
  SOCKET_EMIT_ACTIONS,
  SOCKET_ON_ACTIONS,
  SOCKET_CHAT_HOST,
  SOCKET_NAMESPACE,
  PEERJS_SERVER,
} from "../../../common/constant";
import { useSocketConnection } from "../../../hooks/useSocketConnection";
import { baseConfig } from "../../../socket/baseConfig";
import useWindowUnloadEffect from "../../hooks/useWindowRefresh";
import SVGIcon from "../../shared/SVGIcon";
import { useHistory } from "react-router";
import Grid from "../../shared/Grid";
import { useSelector } from "react-redux";
import { getCookie, parseJwt } from "../../../common/functions";

const getClassResponsiveByPeople = (amount, isSelectedRepresenting = false) => {
  if (isSelectedRepresenting) {
    return {
      col: 1,
      myVideoClass: "myVideoWrapper-lg-amount-people",
      videoClass: "videoContainer-lg-amount-people",
    };
  }

  if (amount >= 12) {
    return {
      col: 4,
      myVideoClass: "myVideoWrapper-lg-amount-people",
      videoClass: "videoContainer-lg-amount-people",
    };
  }

  if (amount >= 7) {
    return {
      col: 3,
      myVideoClass: "myVideoWrapper-md-amount-people",
      videoClass: "videoContainer-md-amount-people",
    };
  }

  if (amount >= 3) {
    return {
      col: 2,
      myVideoClass: "myVideoWrapper-sm-amount-people",
      videoClass: "videoContainer-sm-amount-people",
    };
  }

  return {
    col: 2,
    myVideoClass: "myVideoWrapper",
    videoClass: "videoContainer",
  };
};

const Video =
  // React.memo(
  (props) => {
    const { socketId, call, socket, mic, video, type, userInfo, stream } =
      props.connection;
    const { videoClass, setCurrentFullScreenVideo, id, selected } = props;
    const videoRef = useRef(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    // const [videoStream, setVideoStream] = useState(null);
    // useEffect(() => {
    //   call.on("stream", (remoteStream) => {
    //     if (videoRef.current) {
    //       videoRef.current.srcObject = remoteStream;
    //       // setVideoStream(remoteStream);
    //     }
    //   });
    // }, [call]);

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // setVideoStream(remoteStream);
      }
    }, [stream]);

    return (
      <div
        className={`${videoClass} ${
          isFullScreen ? "videoContainerFullScreen" : ""
        }`}
        onDoubleClick={() => {
          setCurrentFullScreenVideo((prev) => (!prev ? id : null));
          // setIsFullScreen((prev) => !prev);
        }}
      >
        <div className="videoControlWrapper">
          <div className="videoHelper">
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

            {video ? (
              <span className="userInfo">
                {userInfo.type === "call" ? (
                  <>{userInfo?.name || ""}</>
                ) : (
                  <>{userInfo?.name || ""}'s Screen</>
                )}
              </span>
            ) : (
              <></>
            )}
          </div>

          <div className="videoHelper fullscreenIcon">
            {selected !== id ? (
              <SVGIcon
                name="fullscreen"
                width={"18"}
                height={"18"}
                style={{ fill: "#fff" }}
                onClick={() => {
                  setCurrentFullScreenVideo(id);

                  // setIsFullScreen(true);
                }}
              />
            ) : (
              <SVGIcon
                name="smallscreen"
                width={"18"}
                height={"18"}
                style={{ fill: "#fff" }}
                onClick={() => {
                  setCurrentFullScreenVideo(null);

                  // setIsFullScreen(false);
                }}
              />
            )}
          </div>
        </div>
        {video ? (
          <video ref={videoRef} autoPlay></video>
        ) : (
          <div className="videoDisabledContainer">
            <strong className="videoName">{userInfo.name || "Anomyous"}</strong>
          </div>
        )}
        {/* <div>Video {video ? <>Enable</> : "Disabled"}</div> */}
      </div>
    );
  };
//   (currentProps, nextProps) => {
//     return (
//       currentProps.mic === nextProps.mic &&
//       currentProps.video === nextProps.video &&
//       nextProps.changeCount === currentProps.changeCount
//     );
//   }
// );

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
  const myVideoRef = useRef(null);
  const [refresh, setRefresh] = useState(false);
  const [iceServer, setIceServer] = useState(null);
  const streamRef = useRef(null);
  const history = useHistory();
  const [selectedVideoFullScreen, setSelectedVideoFullScreen] = useState(null);
  console.log(listCallConnection);
  const classInfoResposive = useMemo(
    () =>
      getClassResponsiveByPeople(
        listCallConnection.length + 1,
        selectedVideoFullScreen
      ),
    [listCallConnection, selectedVideoFullScreen]
  );

  const _userInfo =
    useSelector((state) => state.auth.user) ||
    parseJwt(getCookie("cn11_access_token") || "");
  useEffect(() => {
    if (!_userInfo) history.push("/login");
  }, [_userInfo]);
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

  // handle another user reload page and you are selecting his or her screen
  useEffect(() => {
    if (selectedVideoFullScreen !== null) {
      if (
        !listCallConnection.find(
          (callConnection) =>
            callConnection.type + "_" + callConnection.socketId ===
            selectedVideoFullScreen
        )
      )
        setSelectedVideoFullScreen(null);
    }
  }, [listCallConnection]);

  useWindowUnloadEffect(() => {
    CALL_SOCKET.emit("socketLeave", {
      id_room: id_conversation,
      socketId: CALL_SOCKET.id,
    });
    if (myStream) {
      myStream.getTracks()[0].stop();
      stopShare();
    }
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

  useEffect(() => {
    // if(myStream)
    const listener = history.listen((location) => {
      if (history.action === "POP") {
        if (myStream) {
          const listTrack = myStream.getTracks();
          listTrack.forEach((track) => {
            track.stop();
          });
        }

        // myStream.getTracks()[0].stop();
        setMyStream(null);
        stopShare();
      }
    });
    return () => {
      listener();
    };
  }, [myStream, myScreenShare]);

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
    if (myVideoRef.current) myVideoRef.current.appendChild(video);
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
        myVideoRef.current.textContent = "";
        gotMedia(stream);
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
        if (streamRef?.current) {
          const videoScreen = document.createElement("video");
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

        // myVideoRef.current.classList.toggle("bottomToggleVideo");
      })
      .catch((err) => {
        console.error("Error:" + err);
      });
  };

  const addCallConnection = (userSocketId, peerId, userInfo, type) => {
    // Need to pass this user info

    const call = myPeer.call(peerId, myStream, {
      metadata: {
        userInfo: _userInfo,
        socketId: CALL_SOCKET.id,
        mic: myStream.getAudioTracks()[0].enabled,
        video: myStream.getVideoTracks()[0].enabled,
        type,
      },
    });
    return call;
  };

  const stopShare = () => {
    if (myScreenShare && CALL_SOCKET && myVideoRef) {
      streamRef.current.textContent = "";
      myScreenShare.getVideoTracks()[0].stop();
      // myVideoRef.current.classList.toggle("bottomToggleVideo");
      setScreenShare(null);
      CALL_SOCKET.emit("stop share", {
        socketId: CALL_SOCKET.id,
        id_room: id_conversation,
      });
    }
  };

  // useEffect(() => {
  //   window.onload = function () {
  //     let xhr = new XMLHttpRequest();
  //     xhr.onreadystatechange = function ($evt) {
  //       if (xhr.readyState == 4 && xhr.status == 200) {
  //         let res = JSON.parse(xhr.responseText);
  //         setIceServer(res.v);
  //       }
  //     };
  //     xhr.open(
  //       "PUT",
  //       "https://global.xirsys.net/_turn/duchuyhoang.github.io",
  //       true
  //     );
  //     xhr.setRequestHeader(
  //       "Authorization",
  //       "Basic " + btoa("huyhoang:41988f64-3b31-11ec-8906-0242ac130002")
  //     );
  //     xhr.setRequestHeader("Content-Type", "application/json");
  //     xhr.send(JSON.stringify({ format: "urls" }));

  //     // iceServers=
  //   };

  //   return () => {
  //     // if (myStream) {
  //     //   myStream.getTracks()[0].stop();
  //     //   stopShare();
  //     // }
  //   };
  // }, []);

  useEffect(
    () => {
      // if(iceServer){
      CALL_SOCKET.connect();
      const newPeer = new Peer({
        key: "peerjs",
        host: PEERJS_SERVER,
        secure: true,
        port: 443,
        config: {
          iceServers: [
            {
              username:
                "Bebl4LMhW9gs7INGS4VxdYtc6nCT6-VBAHXQRpOSekXCI2k9WuA76Oai2HAr5ekyAAAAAGGBXjFodXlob2FuZw==",
              credential: "8e819244-3bf4-11ec-86f5-0242ac120004",
              urls: [
                "stun:hk-turn1.xirsys.com",
                "turn:hk-turn1.xirsys.com:80?transport=udp",
                "turn:hk-turn1.xirsys.com:3478?transport=udp",
                "turn:hk-turn1.xirsys.com:80?transport=tcp",
                "turn:hk-turn1.xirsys.com:3478?transport=tcp",
                "turns:hk-turn1.xirsys.com:443?transport=tcp",
                "turns:hk-turn1.xirsys.com:5349?transport=tcp",
              ],
            },
          ],
        },
      });
      const newStreamPeer = new Peer({
        key: "peerjs",
        host: PEERJS_SERVER,
        secure: true,
        port: 443,
        config: {
          iceServers: [
            {
              username:
                "Bebl4LMhW9gs7INGS4VxdYtc6nCT6-VBAHXQRpOSekXCI2k9WuA76Oai2HAr5ekyAAAAAGGBXjFodXlob2FuZw==",
              credential: "8e819244-3bf4-11ec-86f5-0242ac120004",
              urls: [
                "stun:hk-turn1.xirsys.com",
                "turn:hk-turn1.xirsys.com:80?transport=udp",
                "turn:hk-turn1.xirsys.com:3478?transport=udp",
                "turn:hk-turn1.xirsys.com:80?transport=tcp",
                "turn:hk-turn1.xirsys.com:3478?transport=tcp",
                "turns:hk-turn1.xirsys.com:443?transport=tcp",
                "turns:hk-turn1.xirsys.com:5349?transport=tcp",
              ],
            },
          ],
        },
      });
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
      // }

      return () => {
        if (iceServer)
          CALL_SOCKET.emit("socketLeave", {
            id_room: id_conversation,
            socketId: CALL_SOCKET.id,
          });
      };
    },
    [
      // iceServer
    ]
  );

  // Handle share screen
  useEffect(() => {
    if (CALL_SOCKET && myStreamPeer && _userInfo) {
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
              ..._userInfo,
              type: "call",
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
    if (CALL_SOCKET && myScreenShare && _userInfo) {
      CALL_SOCKET.on("user accepted share screen", ({ socketId, peerId }) => {
        myStreamPeer.call(peerId, myScreenShare, {
          metadata: {
            userInfo: {
              ...(_userInfo || { name: "Anomyous", avatar: null }),
              type: "screen",
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

        call.on("stream", (remoteStream) => {
          setListCallConnection((oldList) => [
            ...oldList,
            {
              call,
              stream: remoteStream,
              mic: false,
              video: true,
              type: "shareScreen",
              userInfo: call.metadata.userInfo,
              changeCount: 0,
              socketId: call.metadata.socketId,
            },
          ]);
        });

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
    if (myPeerId && myStream && myStreamPeer && _userInfo) {
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
              ..._userInfo,
              type: "call",
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

          call.on("stream", (remoteStream) => {
            setListCallConnection((oldList) => [
              ...oldList.filter(
                (connection) => connection.socketId !== callerSocketId
              ),
              {
                socketId: callerSocketId,
                stream: remoteStream,
                call,
                userInfo,
                mic,
                video,
                type,
                changeCount: 0,
              },
            ]);
          });

          // if other join and this user is currently streaming
          if (myScreenShare && myStreamPeer && _userInfo) {
            myStreamPeer.call(streamPeerId, myScreenShare, {
              metadata: {
                userInfo: {
                  ..._userInfo,
                  type: "screen",
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
        call.on("stream", (remoteStream) => {
          setListCallConnection((oldList) => {
            const newList = oldList.filter(
              (connection) => connection.socketId !== call.metadata.socketId
            );
            return [
              ...newList,
              {
                socketId: call.metadata?.socketId || "",
                call,
                stream: remoteStream,
                userInfo: call.metadata.userInfo || { name: "", age: 0 },
                mic: call.metadata.mic,
                video: call.metadata.video,
                type: "videoChat",
                changeCount: 0,
              },
            ];
          });
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
    <section className="chatVideoWrapperContainer">
      {/* {!selectedVideoFullScreen ? ( */}
      <section
        className={`${
          !selectedVideoFullScreen ? "intialWrapper" : "listUserVideoWrapper"
        }`}
      >
        <Grid col={!selectedVideoFullScreen ? classInfoResposive.col : 1}>
          <div
            className={
              selectedVideoFullScreen !== "call_myStream"
                ? classInfoResposive.videoClass
                : "videoSelectedContainer"
            }
            ref={myVideoRef}
          ></div>
          {myScreenShare ? (
            <div
              ref={streamRef}
              className={
                selectedVideoFullScreen !== "stream_myStream"
                  ? classInfoResposive.videoClass
                  : "videoSelectedContainer"
              }
            ></div>
          ) : (
            <></>
          )}

          {listCallConnection.map((callConnection, index) => (
            <Video
              connection={callConnection}
              key={callConnection.type + "_" + callConnection.socketId}
              socket={CALL_SOCKET}
              mic={callConnection.mic}
              video={callConnection.video}
              userInfo={callConnection.callConnection}
              videoClass={
                selectedVideoFullScreen !==
                callConnection.type + "_" + callConnection.socketId
                  ? classInfoResposive.videoClass
                  : "videoSelectedContainer"
              }
              setCurrentFullScreenVideo={(id) => {
                setSelectedVideoFullScreen(id);
              }}
              selected={selectedVideoFullScreen}
              id={callConnection.type + "_" + callConnection.socketId}
              // id={callConnection.type + "_" + callConnection.socketId}
            />
          ))}
        </Grid>
      </section>

      {/* ) 
      : ( */}
      {/* <section className="listUserVideoWrapper">
          <div className="myVideoWrapper" ref={myVideoRef}></div> */}
      {/* {listCallConnection.map((callConnection, index) => (
            <div style={{ marginTop: 10 }}>
              <Video
                connection={callConnection}
                key={callConnection.type + "_" + callConnection.socketId}
                socket={CALL_SOCKET}
                mic={callConnection.mic}
                video={callConnection.video}
                userInfo={callConnection.callConnection}
                setCurrentFullScreenVideo={(id) => {
                  setSelectedVideoFullScreen(id);
                }}
                id={callConnection.type + "_" + callConnection.socketId}
              />
            </div>
          ))} */}
      {/* </section>
      )} */}

      {/* <div>
  
</div> */}

      <section className="videoChatActionContainer">
        <div
          className="_iconContainer"
          onClick={() => {
            if (myStream) {
              if (myStream.getVideoTracks()[0].enabled) toggleVideo();
              else makeNew();
            }
          }}
        >
          {myStream ? (
            <>
              {myStream.getVideoTracks()[0].enabled ? (
                <SVGIcon
                  name="callcamera"
                  style={{ fill: "#fff" }}
                  width={"30"}
                  height={"30"}
                />
              ) : (
                <SVGIcon
                  name="offvideo"
                  style={{ fill: "#fff" }}
                  width={"30"}
                  height={"30"}
                />
              )}
            </>
          ) : (
            <></>
          )}
        </div>

        <div
          className="_iconContainer"
          onClick={() => {
            if (myScreenShare) stopShare();
            else screenShare();
          }}
        >
          {myScreenShare ? (
            <SVGIcon
              name="stopshare"
              style={{ fill: "#fff" }}
              width={"30"}
              height={"30"}
            />
          ) : (
            <SVGIcon
              name="sharescreen"
              style={{ fill: "#fff" }}
              width={"30"}
              height={"30"}
            />
          )}
        </div>

        <div className="_iconContainer" onClick={toggleSound}>
          {audioTrack ? (
            <SVGIcon
              name="microphone"
              style={{ fill: "#fff" }}
              width={"30"}
              height={"30"}
            />
          ) : (
            <SVGIcon
              name="micoff"
              style={{ fill: "red" }}
              width={"30"}
              height={"30"}
            />
          )}
        </div>

        <div
          className="_iconContainer disconnectIcon"
          onClick={() => {
            CALL_SOCKET.emit("socketLeave", {
              id_room: id_conversation,
              socketId: CALL_SOCKET.id,
            });
            history.push("/home/message");
          }}
        >
          <SVGIcon
            name="calldisconnect"
            style={{ fill: "#fff" }}
            width={"30"}
            height={"30"}
          />
        </div>
      </section>

      {/* <div>{audioTrack ? "Mic on" : "Mic off"}</div> */}

      {/* <button onClick={toggleSound}>Audio</button> */}

      {/* {myScreenShare ? (
        <button onClick={stopShare}>Stop share</button>
      ) : (
        <button onClick={screenShare}>Share screen</button>
      )} */}
    </section>
  );
};

export default ChatVideo;
