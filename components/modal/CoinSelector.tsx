import { SetStateAction, useState } from "react";
import CoinItem from "./CoinItem";
import styled from "styled-components";

interface CoinSelector {
  setAction: SetStateAction<any>;
  selectedToken: any;
  setSelectedToken: SetStateAction<any>;
  sanityToken: any;
  thirdwebToken: any;
  walletAddress: string;
}

const CoinSelector = ({
  setAction,
  selectedToken,
  setSelectedToken,
  sanityToken,
  thirdwebToken,
  walletAddress,
}: CoinSelector) => {
  return (
    <Wrapper>
      <Title>Select Asset</Title>
      <CoinList>
        {sanityToken.map((token: any) => (
          <CoinItem
            key={token.name}
            token={token}
            sender={walletAddress}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            thirdwebToken={thirdwebToken}
            sanityToken={sanityToken}
            setAction={setAction}
          />
        ))}
      </CoinList>
    </Wrapper>
  );
};

export default CoinSelector;

const Wrapper = styled.div``;

const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CoinList = styled.div`
  display: flex;
  flex-direction: column;
`;
