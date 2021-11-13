import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Google } from '../../assets/icons/google.svg';
import { ReactComponent as Eye } from '../../assets/icons/eye.svg';
import { ReactComponent as EyeHidden } from '../../assets/icons/eye-hidden.svg';
import { ReactComponent as Message } from '../../assets/icons/message.svg';
import { ReactComponent as Book } from '../../assets/icons/book.svg';
import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as Signout } from '../../assets/icons/signout.svg';
import { ReactComponent as AddUser } from '../../assets/icons/add-user.svg';
import { ReactComponent as MultipleUser } from '../../assets/icons/multiple-user.svg';
import { ReactComponent as Search } from '../../assets/icons/search.svg';
import { ReactComponent as Attachment } from '../../assets/icons/attachment.svg';
import { ReactComponent as Image } from '../../assets/icons/image.svg';
import { ReactComponent as Sticker } from '../../assets/icons/sticker.svg';
import { ReactComponent as Like } from '../../assets/icons/like.svg';
import { ReactComponent as Success } from '../../assets/icons/success.svg';
import { ReactComponent as Error } from '../../assets/icons/error.svg';
import { ReactComponent as Warning } from '../../assets/icons/warning.svg';
import { ReactComponent as Info } from '../../assets/icons/info.svg';
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import { ReactComponent as MicroPhone } from '../../assets/icons/microphone.svg';
import { ReactComponent as MicroPhoneOff } from '../../assets/icons/micoff.svg';
import { ReactComponent as Phone } from '../../assets/icons/phone.svg';
import { ReactComponent as Video } from '../../assets/icons/video.svg';
import { ReactComponent as Bell } from '../../assets/icons/bell.svg';

const mapIcon = {
  google: Google,
  eye: Eye,
  eyeHidden: EyeHidden,
  message: Message,
  book: Book,
  user: User,
  signout: Signout,
  addUser: AddUser,
  multipleUser: MultipleUser,
  search: Search,
  attachment: Attachment,
  image: Image,
  sticker: Sticker,
  like: Like,
  success: Success,
  error: Error,
  warning: Warning,
  close: Close,
  info: Info,
  microphone: MicroPhone,
  micoff: MicroPhoneOff,
  phone: Phone,
  video: Video,
  bell: Bell,
};

const SVGIcon = ({ name, width = '16px', height = width, ...rest }) => {
  const MatchIcon = mapIcon[name] || null;
  if (!MatchIcon) return null;
  return <MatchIcon width={width} height={height} {...rest} />;
};

SVGIcon.propTypes = {
  name: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default SVGIcon;
