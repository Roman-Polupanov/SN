import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Messages';
import s from './Dialogs.module.css';



const Dialogs = (props) => {

  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);
  let messagesElements = state.messages.map(m => <Message message={m.message} id={m.id} activeClassName={s.active} />);

  let newMessageElement = React.createRef();

  let onSendMessageClick = () => {
    props.sendMessage();
  }

  let onNewMessageChange = () => {

    let body = newMessageElement.current.value;

    props.updateNewMessage(body);
  }



  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
      </div>
      <div>
        <div>
          <textarea
            placeholder='enter your message'
            onChange={onNewMessageChange}
            ref={newMessageElement}
            value={props.newMessageBody}
          />
        </div>
        <div>
          <button onClick={onSendMessageClick}>send message</button>
        </div>
      </div>


    </div>
  )
}

export default Dialogs;