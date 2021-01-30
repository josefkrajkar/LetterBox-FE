import * as React from 'react';
import styled, {keyframes} from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const antiRotate = keyframes`
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
`;

const Wrapper = styled.div`
  position: relative;
  flex: 0 0 auto;
  width: 50px;
  height: 50px;
  margin: 30px auto 0px;
`;

const LargeCircle = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  animation: ${rotate} 2s linear infinite;
`;

const SmallCircle = styled.img`
  position: absolute;
  top: 13px;
  left: 13px;
  width: 24px;
  height: 24px;
  animation: ${antiRotate} 3s linear infinite;
`;

export default function Loader() {
  return <Wrapper>
    <LargeCircle
      src='./loader.png'
    />
    <SmallCircle
      src='./loader.png'
    />
  </Wrapper>
};
