import React from 'react';
import Avatar from '../shared/Avatar';
import SVGIcon from '../shared/SVGIcon';

const UpdateProfile = ({ profile, onclose, ...rest }) => {
  return (
    <div className='profile'>
      <div className='profile__top'>
        <div className='profile__top__title'>Cập nhật thông tin</div>
        <SVGIcon name='close' width='14px' />
      </div>
      <div className='profile__content'>
        <div className='profile__content__avatar'>
          <Avatar img={profile.avatar} />
        </div>
        <div className='profile__content__flex'>
          <div className='profile__content__name'></div>
          <div className='profile__content__email'></div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
