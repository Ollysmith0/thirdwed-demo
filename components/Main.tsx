import styled from "styled-components";
import Porfolio from "./Portfolio";
import Promos from "./Promos";

interface MainProps {
  walletAddress: string;
  walletBalance: number;
}

const Main = ({ walletAddress, walletBalance = 0 }: MainProps) => {
  return (
    <Wrapper>
      <Porfolio walletAddress={walletAddress} walletBalance={walletBalance} />
      <Promos />
    </Wrapper>
  );
};

export default Main;

const Wrapper = styled.div`
  display: flex;
  height: calc(100% - 64px);
  overflow: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  & div {
    border-radius: 0.4rem;
  }
`;
