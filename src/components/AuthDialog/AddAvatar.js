import React, { useState } from "react";
import { makeStyles, Box, Typography, Avatar, Button } from "@material-ui/core";
import clsx from "clsx";

const AddAvatar = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState("");

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedFile(reader.result);
      reader.readAsDataURL(e.target.files[0]);
      e.target.value = "";
    }
  };
  return (
    <>
      <Box className={classes.contentAvatar}>
        <Typography className={classes.avatarText}>Ảnh đại diện</Typography>
        <Avatar src={selectedFile} className={classes.avatar} />
        <Button
          variant="contained"
          size="large"
          htmlFor="edit-crop-image"
          className={clsx("dark-blue-button", classes.uploadImageBtn)}
        >
          <Typography className={classes.uploadImageBtnText}>
            Chọn avatar
          </Typography>
        </Button>
        <input
          id="edit-crop-image"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={onSelectFile}
        />
      </Box>
    </>
  );
};

export default AddAvatar;

const useStyles = makeStyles(theme => ({
  contentAvatar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  avatar: {
    height: 104,
    width: 104,
    [theme.breakpoints.down("xs")]: {
      height: 88,
      width: 88,
    },
    margin: theme.spacing(2, 0, 2, 0),
  },
  uploadImageBtn: {
    borderRadius: "100px !important",
    minWidth: 100,
    [theme.breakpoints.down("xs")]: {},
  },
  uploadImageBtnText: {
    fontSize: 12,
  },
}));
