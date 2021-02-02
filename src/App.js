import * as React from 'react';
import styled from  'styled-components';
import Loader from './Loader';
import Chat from './Chat';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const Wrapper = styled.div`
  background: #50bf59;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column;
  position: absolute;
  left: 0;
  top: 0;
`;

export const Paper = styled.div`
  position: relative;
  margin: auto;
  width: 300px;
  height: auto;
  display: flex;
  flex-flow: column;
  background: #ececec;
  text-align: center;
  border-radius: 4px;
  box-shadow: 4px 4px 4px 0px #1f1f1f;
`;

const Letter = styled.img`
  width: 100px;
  flex: 0 0 auto;
  margin: 70px auto 0;
`;

export const WelcomeText = styled.h2`
  color: #50bf59;
  margin: 30px auto 0;
`;

const WrongText = styled(WelcomeText)`
  color: #C72A2A;
`;

const PassText = styled(WelcomeText)`
  margin: 30px auto 30px;
`;

const LoadText = styled(WelcomeText)`
  margin: 10px auto 70px;
`;

const Button = styled.button`
  margin: 30px auto 0px;
  cursor: pointer;
  background: #50bf59;
  color: #ececec;
  padding: 10px 20px;
  text-transform: uppercase;
  font-weight: 600;
  border-radius: 10px;
  transition: 300ms ease-in-out;
  border: none;
  outline: none;
  &:hover {
    background: #409e48;
    color: #ffffff;
  }
`;

export const CreateButton = styled(Button)`
  margin: 30px auto 0px;
  padding: 10px 30px;
`;

const SadButton = styled(Button)`
  margin: 30px auto 50px;
`;

const SmallText = styled.p`
  margin-top: 10px;
  margin-bottom: 50px;
  color: #50bf59;
  text-decoration: none;
  transition: 300ms ease-in-out;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: #409e48;
    text-decoration: underline;
  }
`;

export const Input = styled.input`
  padding: 5px 10px;
  border: 2px solid #50bf59;
  border-radius: 5px;
  background: #ececec;
  margin: 10px 20px;
  text-align: center;
  transition: 300ms ease-in-out;
  &:focus {
    border: 2px solid #409e48 !important;
    outline: none;
  }
`;

export const Form = styled.form`
  flex: 0 0 auto;
  display: flex;
  flex-flow: column;
`;

function App() {
  const [state, setState] = React.useState({
    step: 0,
    name: '',
    pass: '',
    uuid: undefined
  });

  const renderContent = () => {
    switch (state.step) {
      case 3: return (
        <React.Fragment>

          <Loader />

          <LoadText>
            Loading
          </LoadText>

        </React.Fragment>
      )
      case 2: return (
        <React.Fragment>

          <PassText>
            Enter existing chatroom
          </PassText>

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              setState((actState) => ({...actState, step: 3}));
              axios.post('https://peaceful-refuge-45943.herokuapp.com/api/enterRoom', {
              // axios.post('http://localhost:3001/api/enterRoom', {
                name: state.name,
                pass: CryptoJS.SHA512(state.pass).toString(CryptoJS.enc.Base64)
              })
              .then(result => {
                setState({...state, step: 4, uuid: result.data.uuid});
              })
              .catch(err => {
                console.error(err);
                setState({
                  ...state,
                  step: -1,
                  name: '',
                  pass: ''
                });
              })
            }}
          >

            <Input
              placeholder='Room name'
              value={state.name}
              autoFocus
              onChange={(e) => setState({...state, name: e.target.value})}
            />

            <Input
              placeholder='Password'
              type='password'
              value={state.pass}
              onChange={(e) => setState({...state, pass: e.target.value})}
            />

            <CreateButton
              type='submit'
            >
              Enter
            </CreateButton>

            <SmallText
              onClick={() => setState({...state, step: 1, pass: '', name: ''})}
            >
              or create new chatroom
            </SmallText>
          </Form>

        </React.Fragment>
      )
      case 1: return (
        <React.Fragment>

          <PassText>
            Set name and password for your new chatroom
          </PassText>

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              setState((actState) => ({...actState, step: 3}));
              axios.post('https://peaceful-refuge-45943.herokuapp.com/api/createRoom', {
              // axios.post('http://localhost:3001/api/createRoom', {
                name: state.name,
                pass: CryptoJS.SHA512(state.pass).toString(CryptoJS.enc.Base64)
              })
              .then(result => {
                setState({...state, step: 4, uuid: result.data.uuid});
              })
              .catch(err => {
                console.error(err);
                setState({
                  ...state,
                  step: -1,
                  name: '',
                  pass: ''
                });
              })
            }}
          >

            <Input
              placeholder='Room name'
              value={state.name}
              autoFocus
              onChange={(e) => setState({...state, name: e.target.value})}
            />

            <Input
              placeholder='Password'
              type='password'
              value={state.pass}
              onChange={(e) => setState({...state, pass: e.target.value})}
            />

            <CreateButton
              type='submit'
            >
              Create
            </CreateButton>

            <SmallText
              onClick={() => setState({...state, step: 2, pass: '', name: ''})}
            >
              or enter existing room
            </SmallText>

          </Form>
        </React.Fragment>
      );
      case -1: return (
        <React.Fragment>

          <WrongText>
            Sorry, but entered values are not valid
          </WrongText>

          <SadButton
            onClick={() => setState({...state, step: 0})}
          >
            Sad But True
          </SadButton>

        </React.Fragment>
      )
      case -2: return (
        <React.Fragment>

          <WrongText>
            Sorry, your room is closed
          </WrongText>

          <SadButton
            onClick={() => setState({...state, step: 0})}
          >
            onClick
          </SadButton>

        </React.Fragment>
      )
      default: return (
        <React.Fragment>

          <WelcomeText>
            Welcome to LetterBox
          </WelcomeText>

          <Button
            onClick={() => setState({...state, step: 1})}
          >
            New encrypted chatroom
          </Button>

          <SmallText
            onClick={() => setState({...state, step: 2})}
          >
            or enter existing room
          </SmallText>

        </React.Fragment>
      )
    }
  }

  if (state.step === 4) {
    return (
      <Wrapper>

        <Chat
          goHome={() => setState({...state, step: 0, name: '', pass: '', uuid: undefined})}
          closeRoom={() => setState({...state, step: -2, name: '', pass: '', uuid: undefined})}
          uuid={state.uuid}
          pass={state.pass}
        />

      </Wrapper>
    )
  }

  return (
    <Wrapper>

      <Paper>
        
        <Letter
          src={
            state.step === -1
            ? 'wrong.png'
            : '/letter2.png'
          }
          alt='letter'
        />

        {
          renderContent()
        }

      </Paper>

    </Wrapper>
  );
}

export default App;
