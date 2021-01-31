import * as React from 'react';
import styled from 'styled-components';
import {Paper, Form, WelcomeText} from './App';

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000000;
  opacity: .5;
`;

const Wrapper = styled.div`
  background: none;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column;
  position: absolute;
  left: 0;
  top: 0;
`;

const Button = styled.button`
  margin: 0px auto 50px;
  padding: 10px 50px;
  cursor: pointer;
  background: #50bf59;
  color: #ececec;
  text-transform: uppercase;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  outline: none;
  transition: 300ms ease-in-out;
  &:hover {
    background: #409e48;
    color: #ffffff;
  }
`;

const NickNameInput = styled.input`
  margin: 30px auto 30px;
  padding: 5px 10px;
  border: 2px solid #50bf59;
  border-radius: 5px;
  background: #ececec;
  text-align: center;
  transition: 300ms ease-in-out;
  &:focus {
    border: 2px solid #409e48 !important;
    outline: none;
  }
`;

export default function NickNameModal ({setNick}) {

  const [state, setState] = React.useState({
    nick: ''
  });

  return (
    <React.Fragment>
      <Background />
      <Wrapper>
        <Paper>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              setNick(state.nick);
            }}
          >
            <WelcomeText>
              Please, choose your nickname
            </WelcomeText>
            <NickNameInput
              autoFocus
              placeholder='Nickname'
              value={state.nick}
              onChange={(e) => setState({...state, nick: e.target.value})}
            />
            <Button
              type='submit'
            >
              Ok
            </Button>
          </Form>
        </Paper>
      </Wrapper>
    </React.Fragment>
  );
}