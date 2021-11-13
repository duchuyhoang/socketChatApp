import React, { useState } from 'react';
import { CreateGroupChat } from '../../components/CreateGroupChat';
import Popup from '../../shared/Popup';
import SVGIcon from '../../shared/SVGIcon';
import Search from './Search';
import TabListFriend from './TabListFriend';
import TabMessage from './TabMessage';

const TabsRoute = (props) => {
  const [newGroupChatPopupOpen, setNewGroupChatPopupOpen] = useState(false);
  const {
    match: { params },
  } = props;

  let tabSelect;
  if (params.tab === 'message') tabSelect = <TabMessage />;
  if (params.tab === 'list-friend') tabSelect = <TabListFriend />;

  return (
    <div className='tabs'>
      <div className='tabs__top'>
        <Search />
        <div className='tabs__top__item'>
          <SVGIcon name='addUser' />
        </div>
        <div className='tabs__top__item'>
          <Popup
            isOpen={newGroupChatPopupOpen}
            type={'addGroupWrapper'}
            root={
              <SVGIcon
                name='multipleUser'
                onClick={() => {
                  setNewGroupChatPopupOpen((prev) => !prev);
                }}
              />
            }
          >
            <>
              <SVGIcon
                name='close'
                width='25'
                height='25'
                className='closeIcon'
                onClick={() => {
                  setNewGroupChatPopupOpen(false);
                }}
              />
              <div className=''>
                <p className='title'>Create group chat</p>
                <CreateGroupChat />
              </div>
            </>
          </Popup>
        </div>
      </div>
      <div className='tabs__content'>{tabSelect}</div>
    </div>
  );
};

export default TabsRoute;
