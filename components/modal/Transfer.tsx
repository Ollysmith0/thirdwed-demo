/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";
import styled from "styled-components";
import { FaWallet } from "react-icons/fa";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../lib/sanity";
import { ThirdwebSDK } from "@thirdweb-dev/react";
import { ethers } from "ethers";

interface TransferProps {
  selectedToken: any;
  setAction: (param: string) => void;
  walletAddress: string;
  thirdwebToken: any;
  sanityToken: any;
  transactionToast: any;
}

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.NEXT_PUBLIC_METAMASK_KEY || "",
    ethers.getDefaultProvider(
      "https://mumbai.rpc.thirdweb.com/ed043a51ae23b0db3873f5a38b77ab28175fa496f15d3c53cf70401be89b622a"
    )
  )
);

const Transfer = ({
  selectedToken,
  setAction,
  sanityToken,
  thirdwebToken,
  transactionToast,
}: TransferProps) => {
  const address = useAddress();
  const [amount, setAmount] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [activeThirdwebToken, setActiveThirdwebToken] = useState<any>();
  const [receipt, setReceipt] = useState<any>([]);
  const [thirdwebTokens, setThirdwebTokens] = useState<any>(thirdwebToken);

  useEffect(() => {
    if (thirdwebTokens != undefined && receipt) {
      const activeToken = thirdwebTokens?.find(
        (token: any) => token.name === selectedToken?.name
      );

      setActiveThirdwebToken(activeToken);
    }
  }, [thirdwebTokens, receipt, selectedToken?.name, sanityToken, address]);

  useEffect(() => {
    if (selectedToken != undefined) {
      const url = imageUrlBuilder(client).image(selectedToken?.logo)?.url();
      setImageUrl(url);
    }
  }, [selectedToken]);

  useEffect(() => {
    if (!!receipt.length) {
      console.log(receipt);
      transactionToast("Transaction completed!");
      console.log(thirdwebTokens);
    }

    const getThirdwebToken = async () => {
      if (address != undefined && sanityToken != undefined) {
        const thirdwebToken = await Promise.all(
          sanityToken.map(async (item: any) => {
            return sdk.getContract(item.contractAddress).then(async (res) => {
              return res.erc20.balanceOf(address);
            });
          })
        );
        setThirdwebTokens(thirdwebToken);
      }
    };

    getThirdwebToken();
  }, [address, receipt, sanityToken, thirdwebTokens, transactionToast]);

  const sendCrypto = async (amount: string, recipient: string) => {
    if (sanityToken != undefined) {
      const activeToken: any = sanityToken.find((item: any) => {
        return item.name === activeThirdwebToken.name;
      });

      if (activeToken && amount && recipient) {
        setAction("transfering");

        const tx = await sdk.wallet.transfer(
          recipient,
          amount,
          activeToken.contractAddress
        );

        console.log(tx);
        setReceipt([...receipt, tx]);
        setAction("transferred");
      } else {
        console.log("missing data");
      }
    }
  };

  return (
    <Wrapper>
      <Amount>
        <FlexInputContainer>
          <FlexInput
            placeholder="0"
            typeof="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <span>{activeThirdwebToken?.symbol?.toUpperCase()}</span>
        </FlexInputContainer>
        <Warning style={{ color: "3" && "#0a0b0d" }}>
          Amount is a required field
        </Warning>
      </Amount>
      <TransferForm>
        <Row>
          <FieldName>To</FieldName>
          <Icon>
            <FaWallet />
          </Icon>
          <Recipient
            placeholder="Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </Row>
        <Divider />
        <Row>
          <FieldName>Pay with</FieldName>
          <CoinSelectList onClick={() => console.log(setAction("select"))}>
            <Icon>
              <img src={imageUrl} alt={"coin-img"} />
            </Icon>
            <CoinName>{activeThirdwebToken?.name}</CoinName>
          </CoinSelectList>
        </Row>
      </TransferForm>
      <Row>
        <Continue onClick={() => sendCrypto(amount, recipient)}>
          Continue
        </Continue>
      </Row>
      <Row>
        <BalanceTitle>
          {activeThirdwebToken?.symbol?.toUpperCase() || "..."} Balance
        </BalanceTitle>
        <Balance>
          {activeThirdwebToken?.displayValue || "..."}{" "}
          {activeThirdwebToken?.symbol?.toUpperCase() || "..."}
        </Balance>
      </Row>
    </Wrapper>
  );
};

export default Transfer;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

const Amount = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FlexInputContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  & > span {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    color: #54e6a2;
  }
`;

const FlexInput = styled.input`
  border: none;
  background: none;
  outline: none;
  color: #fff;
  font-size: 1.2rem;
  text-align: right;
  max-width: 25%;
  margin-right: 1rem;
  font-size: 4.5rem;
  color: #8a919e;

  &::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;

const Warning = styled.div`
  padding: 1rem 0 2rem 0;
  text-align: center;
  color: #8a919e;
`;

const Divider = styled.div`
  border-bottom: 1px solid #282b2f;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #8a919e;
  padding: 1rem 0;
  font-size: 1.2rem;
`;

const FieldName = styled.div`
  flex: 0.5;
  padding-left: 2rem;
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

const Recipient = styled.input`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 1.2rem;
  margin-right: 0.5rem;
`;

const CoinSelectList = styled.div`
  display: flex;
  flex: 1.3;
  height: 100%;

  &:hover {
    cursor: pointer;
  }
`;

const CoinName = styled.div`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 1.2rem;
  margin-right: 0.5rem;
`;

const Continue = styled.button`
  color: white;
  width: 100%;
  background-color: #54e6a2;
  padding: 1rem;
  text-align: center;
  border-radius: 0.4rem;
  font-size: 1.2rem;

  &:hover {
    cursor: pointer;
    background-color: #54e6a2;
  }
`;

const TransferForm = styled.div`
  border: 1px solid #282b2f;
  border-radius: 0.4rem;
`;

const BalanceTitle = styled.div``;

const Balance = styled.div``;
