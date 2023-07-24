/* eslint-disable @next/next/no-img-element */
import { client } from "lib/sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";

interface CoinSelector {
  setAction: SetStateAction<any>;
  selectedToken: any;
  setSelectedToken: SetStateAction<any>;
  sanityToken: any;
  thirdwebToken: any;
  sender: string;
  token: any;
}

const CoinItem = ({
  token,
  setAction,
  selectedToken,
  setSelectedToken,
  sanityToken,
  thirdwebToken,
  sender,
}: CoinSelector) => {
  const [balance, setBalance] = useState("Fetching...");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const getBalance = () => {
      let activeThirdwebToken: any = null;

      if (thirdwebToken.length > 0) {
        thirdwebToken.map((item: any) => {
          if (item.name === token.name) {
            activeThirdwebToken = item;
          }
        });

        activeThirdwebToken != undefined &&
          setBalance(activeThirdwebToken?.displayValue);
      }
    };

    const getImgUrl = async () => {
      const imgUrl = await imageUrlBuilder(client).image(token.logo).url();
      setImageUrl(imgUrl);
    };

    getBalance();
    getImgUrl();
  });

  return (
    <Wrapper
      style={{
        backgroundColor: selectedToken.name === token.name ? "#141519" : "",
      }}
      onClick={() => {
        setSelectedToken(token);
        setAction("send");
      }}
    >
      <Main>
        <Icon>
          <img src={imageUrl} alt="token-img" />
        </Icon>
        <NameDetails>
          <Name>{token.name}</Name>
          <Symbol>{token.symbol}</Symbol>
        </NameDetails>
      </Main>
      <Balance>
        {balance} {token.symbol}
      </Balance>
      <IsSelected>
        {selectedToken.name === token.name && <FaCheck />}
      </IsSelected>
    </Wrapper>
  );
};

export default CoinItem;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 0.3rem;
  cursor: pointer;

  &:hover {
    background-color: #0e0f14;
  }
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  margin-right: 1rem;
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;

  & > img {
    height: 120%;
    width: 120%;
    object-fit: cover;
  }
`;

const NameDetails = styled.div``;

const Name = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
`;

const Symbol = styled.div`
  color: #54e6a2;
  font-size: 0.8rem;
`;

const Balance = styled.div``;

const IsSelected = styled.div`
  margin-left: 0.5rem;
  color: #54e6a2;
`;
