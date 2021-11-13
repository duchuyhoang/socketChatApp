import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendStatus } from '../../../common/functions';
import { selectSearchUser, UserAction } from '../../../redux/reducer/user';
import MessageUser from '../../components/MessageUser';
import Popover from '../../shared/Popover';
import SVGIcon from '../../shared/SVGIcon';

const Search = (props) => {
  const [isShowResult, setIsShowResult] = useState(false);
  const [keyword, setKeyword] = useState('');

  const dispatch = useDispatch();
  const searchUser = useSelector(selectSearchUser) || [];

  useEffect(() => {
    if (!keyword || keyword.trim() === '') return;
    dispatch(UserAction.searchUser({ keyword: keyword.trim() }));
  }, [keyword, dispatch]);

  let result;
  if (keyword.trim() === '' || searchUser.length === 0)
    result = (
      <p style={{ textAlign: 'center', fontWeight: '600', marginTop: '2rem' }}>
        Không tìm thấy kết quả nào!
      </p>
    );
  else {
    result = searchUser.map((item) => (
      <MessageUser item={item} key={item.id_user} />
    ));
  }

  return (
    <Popover
      root={
        <div className='tabs__top__search'>
          <input
            type='text'
            id=''
            placeholder='Tìm kiếm'
            onFocus={() => {
              setIsShowResult(true);
            }}
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          />
          <SVGIcon name='search' />
        </div>
      }
    >
      {isShowResult && (
        <div className='tabs__top__search__result'>{result}</div>
      )}
    </Popover>
  );
};

export default Search;
