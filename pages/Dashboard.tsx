import { useState, useEffect, useRef } from "react";
import Header from "components/Header";
import Main from "components/Main";
import Sidebar from "components/Sidebar";
import { ThirdwebSDK } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";

interface DashboardProps {
  address: string;
}

const Dashboard = ({ address }: DashboardProps) => {
  const [sanityToken, setSanityToken] = useState<any>();
  const [thirdwebToken, setThirdwebToken] = useState<any>();
  const [walletBalance, setWalletBalance] = useState<number>(0);

  useEffect(() => {
    const getCoins = async () => {
      try {
        const coins = await fetch(
          "https://yssyq8nz.api.sanity.io/v1/data/query/production?query=*%5B_type%3D%3D%27coins%27%5D+%7B%0A++name%2C%0A++usdPrice%2C%0A++contractAddress%2C%0A++symbol%2C%0A++logo%0A%7D%0A%0A"
        );
        const tempSanityTokens = await coins.json();

        setSanityToken(tempSanityTokens.result);
      } catch (error) {
        console.error(error);
      }
    };

    getCoins();
  }, []);

  useEffect(() => {
    const sdk = new ThirdwebSDK(
      new ethers.Wallet(
        process.env.NEXT_PUBLIC_METAMASK_KEY || "",
        ethers.getDefaultProvider(
          "https://mumbai.rpc.thirdweb.com/ed043a51ae23b0db3873f5a38b77ab28175fa496f15d3c53cf70401be89b622a"
        )
      )
    );

    if (sanityToken?.length) {
      const getBalance = async () => {
        const arrBalance = await Promise.all(
          sanityToken.map(async (item: any) => {
            return sdk.getContract(item.contractAddress).then(async (res) => {
              const token = await res.erc20.balanceOf(address);
              return Number(token.displayValue) * Number(item.usdPrice);
            });
          })
        );

        const thirdwebToken = await Promise.all(
          sanityToken.map(async (item: any) => {
            return sdk.getContract(item.contractAddress).then(async (res) => {
              return res.erc20.balanceOf(address);
            });
          })
        );

        setThirdwebToken(thirdwebToken);

        setWalletBalance(arrBalance.reduce((i, c) => i + c, 0));
      };

      getBalance();
    }
  }, [address, sanityToken]);

  return (
    <Wrapper>
      <Sidebar />
      <MainContainer>
        <Header
          walletAddress={address}
          sanityToken={sanityToken}
          thirdwebToken={thirdwebToken}
          transactionToast={toast}
        />
        <Main walletAddress={address} walletBalance={walletBalance} />
      </MainContainer>
      <ToastContainer />
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background: #0a0b0d;
  color: #fff;
  overflow: hidden;
`;

const MainContainer = styled.div`
  flex: 1;
`;
