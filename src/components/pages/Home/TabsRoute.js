import React from 'react';
import SVGIcon from '../../shared/SVGIcon';
import Search from './Search';
import TabListFriend from './TabListFriend';
import TabMessage from './TabMessage';

const TabsRoute = (props) => {
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
          <SVGIcon name='multipleUser' />
        </div>
      </div>
      <div className='tabs__content'>{tabSelect}</div>
    </div>
  );
};

export default TabsRoute;
