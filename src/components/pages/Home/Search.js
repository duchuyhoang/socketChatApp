import React, { useEffect, useState } from 'react';
import MessageItem from '../../components/MessageItem';
import SVGIcon from '../../shared/SVGIcon';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchUser, UserAction } from '../../../redux/reducer/user';
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
      <MessageItem item={item} key={item.id_user} />
    ));
  }

  return (
    <div className='tabs__top__search'>
      <input
        type='text'
        id=''
        placeholder='Tìm kiếm'
        onFocus={() => {
          setIsShowResult(true);
        }}
        onBlur={() => {
          setIsShowResult(false);
        }}
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
      />
      <SVGIcon name='search' />

      {isShowResult && (
        <div className='tabs__top__search__result'>{result}</div>
      )}
    </div>
  );
};

export default Search;
