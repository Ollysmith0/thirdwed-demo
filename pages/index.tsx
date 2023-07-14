import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import styled from "styled-components";
import { NextPage } from "next";
import Dashboard from './Dashboard';

const Home: NextPage = () => {
  const address = useAddress();
  return (
    <Wrapper>
      {address ? (
        <Dashboard address={address} />
      ) : (
        <ConnectWrapper>
          <ConnectWallet />
          <Detail>
            You need chrome to be <br /> able to run this app
          </Detail>
        </ConnectWrapper>
      )}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #000;
  align-items: center;
  justify-content: center;
`;

const ConnectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Detail = styled.div`
  font-size: 1.2rem;
  margin-top: 1rem;
  text-align: center;
  color: #282b2f;
`;
