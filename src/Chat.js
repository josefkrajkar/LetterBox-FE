import * as React from 'react';
import styled from 'styled-components';

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

export default function Chat(props) {

  return (
    <React.Fragment>

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

      <ChatView />

      <Footer>
        <Form>
          <Input
            placeholder="Write your message here ..."
          />
          <Submit>
            Send
          </Submit>
        </Form>
      </Footer>
    </React.Fragment>
  )
};