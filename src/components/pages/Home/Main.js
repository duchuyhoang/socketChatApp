import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import man from '../../../assets/images/man.png';
import woman from '../../../assets/images/woman.png';
import {
  ConversationAction,
  selectMainConversation,
} from '../../../redux/reducer/conversation';
import CardChat from '../../components/CardChat';
import Avatar from '../../shared/Avatar';
import Popover from '../../shared/Popover';
import SVGIcon from '../../shared/SVGIcon';

const Main = ({ match }) => {
  const {
    params: { idConversation },
  } = match;
  const dispatch = useDispatch();

  const { conversationInfo = {}, listUser = [] } =
    useSelector(selectMainConversation) || {};

  const avatar = conversationInfo.creator_avatar
    ? conversationInfo.creator_avatar
    : conversationInfo.creator_sex
    ? man
    : woman;

  useEffect(() => {
    dispatch(
      ConversationAction.getSpecificConversation({ id: idConversation })
    );
  }, [idConversation, dispatch]);

  return (
    <main className='main'>
      <div className='main__top'>
        <Avatar img={avatar} isOnline={true} />
        <div className='main__top__title'>
          <h3>{conversationInfo.creator_name}</h3>
          <small>Truy cập 4 giờ trước</small>
        </div>
        <div className='main__top__action'></div>
      </div>
      <div className='main__content'>
        <ul className='chat-list'>
          <li className='chat-list__item'>
            <CardChat createTime={Date.now()}>Alo</CardChat>
          </li>
        </ul>
      </div>
      <div className='main__bottom'>
        <div className='main__bottom__action'>
          <div className='main__action__item'>
            <Popover root={<SVGIcon name='sticker' width='24px' />}></Popover>
          </div>
          <div className='main__action__item'>
            <SVGIcon name='image' width='24px' />
          </div>
          <div className='main__action__item'>
            <SVGIcon name='attachment' width='24px' />
          </div>
        </div>
        <form>
          <div className='chat-box'>
            <input type='text' />
            <div className='chat-box__action'>
              <button>
                <div className='main__action__item'>
                  <SVGIcon name='like' width='24px' />
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Main;
