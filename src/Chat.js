import * as React from 'react';
import styled from 'styled-components';
import CryptoJS from 'crypto-js';
import NickNameModal from './NickNameModal'

const Header = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  flex: 0 0 70px;
`;

const ChatView = styled.div`
  margin-left: 20px;
  margin-bottom: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background: #ececec;
  flex: 1 1 auto;
  box-shadow: inset 3px 3px 5px 0 #4c4c4c;
  padding: 20px;
  overflow-y: scroll;
`;

const Footer = styled.div`
  flex: 0 0 70px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding-left: 20px;
`;

const Input = styled.input`
  flex: 1 1 auto;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: #ececec;
  transition: 300ms ease-in-out;
  outline: none;
  box-shadow: inset 3px 3px 5px 0 #4c4c4c;
`;

const Form = styled.form`
  flex: 0 0 auto;
  display: flex;
  flex-flow: row;
`;

const Submit = styled.button`
  flex: 0 0 auto;
  padding: 10px 20px;
  box-shadow: none;
  background: #50bf59;
  color: #ececec;
  text-transform: uppercase;
  margin: auto 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 3px 3px 5px 0 #4c4c4c;
  font-weight: 600;
  transition: 300ms ease-in-out;
  border: 2px solid #ececec;
  &:hover {
    background: #ececec;
    color: #50bf59;
    border: 2px solid #50bf59;
  }
`;

const Line = styled.div`
`;

let ws;

export default function Chat(props) {
  const [state, setState] = React.useState({
    chat: [],
    message: '',
    nick: undefined
  });
  const {uuid, pass} = props;

  const encrypt = (message) => {
    return CryptoJS.AES.encrypt(message, pass).toString();
  };

  const decrypt = (message) => {
    return CryptoJS.AES.decrypt(message, pass).toString(CryptoJS.enc.Utf8);
  };

  const init = () => {
    if (ws) {
      ws.onerror = ws.onopen = ws.onclose = null;
      ws.close();
    }

    ws = new WebSocket(`ws://localhost:6969?uuid=${uuid}&pass=${CryptoJS.SHA512(pass).toString(CryptoJS.enc.Base64)}`);
    ws.onopen = () => {
      console.log('Connection opened!');
    }
    ws.onmessage = ({ data }) => {
      setState((actState) => {
        let newChat = [...actState.chat];
        newChat.push(decrypt(data));
        return {...actState, chat: newChat}
      });
    }
    ws.onclose = () => {
      ws = null;
    }
  };

  if (!ws) {
    init();
  }

  React.useEffect(() => {
    const element = document.getElementById('chatView');
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [state.chat]);

  return (
    <React.Fragment>

      {
        !state.nick &&
        <NickNameModal
          setNick={(nick) => {
            const msg = `${nick} just entered room ...`;
            let newChat = [...state.chat];
            newChat.push(msg);
            setState({...state, nick, chat: newChat});
            ws.send(encrypt(msg));
          }}
        />
      }

      <Header>
        <div style={{
          flex: '1 1 100%',
          color: '#ffffff',
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center'
        }}>
          <div style={{
            flex: '0 0 auto',
            marginLeft: '20px',
            fontSize: '30px'
          }}>
            LetterBox
          </div>
          <div style={{
            flex: '0 0 auto',
            marginLeft: '20px',
            fontSize: '12px'
          }}>
            End-to-end encrypted chatroom
          </div>
        </div>
        <img
          src='/letter.jpg'
          alt='letter'
          onClick={() => props.goHome()}
          style={{
            flex: '0 0 auto',
            width: '80px',
            height: '50px',
            margin: 'auto 20px',
            cursor: 'pointer'
          }}
        />
      </Header>

      <ChatView
        id='chatView'
      >
        {
          state.chat.map((item, key) => {
            return <Line key={key}>{item}</Line>;
          })
        }
      </ChatView>

      <Footer>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            ws.send(encrypt(`${state.nick}: ${state.message}`));
            let newChat = [...state.chat];
            newChat.push(`${state.nick}: ${state.message}`);
            setState({...state, message: '', chat: newChat});
          }}
        >
          <Input
            placeholder="Write your message here ..."
            value={state.message}
            autoFocus={state.nick}
            onChange={(e) => setState({...state, message: e.target.value})}
          />
          <Submit
            typ='submit'
          >
            Send
          </Submit>
        </Form>
      </Footer>
    </React.Fragment>
  )
};