import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SVGIcon from "../shared/SVGIcon";
import Chip from "../shared/Chip";

import { ConversationAction } from "../../redux/reducer/conversation";
import { useRouteMatch } from "react-router";
import TextField from "../shared/TextField";
export const CreateGroupChat = (props) => {
  const listSearchUserField = useRef(null);
  const [searchedUser, setSearchedUser] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const [roomName, setRoomName] = useState("");
  const listFriend = useSelector((state) => state.user.listFriend) || [];
  const listUserInRoom =
    useSelector((state) => state.conversation.mainConversationInfo?.listUser) ||
    [];
  const handleSearchChange = (keyword) => {
    setKeyword(keyword);
  };

  const match = useRouteMatch();

  const handleCreateRoom = () => {
    const listUser = selectedUsers.map((user) => user.id_user);

    dispatch(
      ConversationAction.createGroupChat({
        // id_room: match.params.idConversation,
        title:roomName,
        list_user: listUser,
      })
    );
    setSelectedUsers([]);
  };

  useEffect(() => {
    const existSearchUserId = selectedUsers.map((user) => user.id_user);
    const searchUser = listFriend
      .filter(
        (friend) =>
          (friend.phone || "").toLowerCase().indexOf(keyword.toLowerCase()) !==
            -1 ||
          (friend.name || "").toLowerCase().indexOf(keyword.toLowerCase()) !==
            -1 ||
          (friend.email || "").toLowerCase().indexOf(keyword.toLowerCase()) !==
            -1
      )
      .filter((friend) => existSearchUserId.indexOf(friend.id_user) === -1)
      .filter(
        (friend) =>
          !listUserInRoom.find((_friend) => _friend.id_user === friend.id_user)
      );

    setSearchedUser([...searchUser]);
  }, [keyword]);

  const handleAddUser = (user) => {
    setSelectedUsers((prev) => [...prev, user]);
    setSearchedUser([
      ...searchedUser.filter((_user) => _user.id_user !== user.id_user),
    ]);
  };
  const handleDeleteUser = (user) => {
    setSelectedUsers([
      ...selectedUsers.filter((_user) => _user.id_user !== user.id_user),
    ]);
    if (
      (user.phone || "").toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ||
      (user.name || "").toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ||
      (user.email || "").toLowerCase().indexOf(keyword.toLowerCase()) !== -1
    ) {
      setSearchedUser((prev) => [...prev, user]);
    }
  };

  // const handle

  return (
    <>
      <TextField
        label={"Title"}
        value={roomName}
        inputChange={(e) => {
          setRoomName(e.target.value);
        }}
      />
      <div className="tabs__top__search" style={{ marginTop: 10 }}>
        <input
          type="text"
          id=""
          placeholder="Tìm kiếm"
          onChange={(e) => handleSearchChange(e.target.value)}
          //   value={}
          value={keyword}
          //   style={{ marginLeft: 5 }}
        />
        <SVGIcon name="search" width="17" height="17" />
      </div>

      <div className="search_friend">
        {searchedUser.map((user) => (
          <div
            className="search_friend__item"
            key={"search_" + user.id_user}
            onClick={() => handleAddUser(user)}
          >
            <img className="avatar" src={user.avatar} />
            <div className="search_friend__item__name">{user.name}</div>
          </div>
        ))}
      </div>

      <div className="searcWrapper">
        {selectedUsers.map((user) => (
          <Chip
            key={"snackbar_" + user.id_user}
            content={user.name}
            handleDelete={() => {
              handleDeleteUser(user);
            }}
          />
        ))}
      </div>
      <div style={{ width: "100%", textAlign: "center", marginTop: 10 }}>
        <button className="addUserBtn" onClick={handleCreateRoom}>
          Submit
        </button>
      </div>
    </>
  );
};
