import { useEffect, useState } from "react";
import Transfer from "./Transfer";
import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";
import CoinSelector from "./CoinSelector";
import Receive from "./Receive.";

interface TransferModalProps {
  sanityToken: any;
  walletAddress: string;
  thirdwebToken: any;
  transactionToast: any;
}

const TransferModal = ({
  sanityToken,
  thirdwebToken,
  walletAddress,
  transactionToast,
}: TransferModalProps) => {
  const [action, setAction] = useState("send");
  const [selectedToken, setSelectedToken] = useState();

  useEffect(() => {
    if (sanityToken != undefined && sanityToken.length) {
      setSelectedToken(sanityToken[0]);
    }
  }, [sanityToken]);

  const selectedStyle = {
    color: "#54e6a2",
  };

  const unselectedStyle = {
    border: "1px solid #282b2f",
  };

  const selectedModal = (option: string) => {
    switch (option) {
      case "send":
        return (
          <Transfer
            selectedToken={selectedToken}
            setAction={setAction}
            thirdwebToken={thirdwebToken}
            walletAddress={walletAddress}
            sanityToken={sanityToken}
            transactionToast={transactionToast}
          />
        );
      case "receive":
        return (
          <Receive
            setAction={setAction}
            selectedToken={selectedToken}
            walletAddress={walletAddress}
          />
        );
      case "select":
        return (
          <CoinSelector
            setAction={setAction}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
            sanityToken={sanityToken}
            thirdwebToken={thirdwebToken}
            walletAddress={walletAddress}
          />
        );
      case "transfering":
        return (
          <LoadingWrapper>
            <TailSpin
              height="100"
              width="100"
              color="grey"
              ariaLabel="loading"
            />
          </LoadingWrapper>
        );
      case "transferred":
        return (
          <Transfer
            selectedToken={selectedToken}
            setAction={setAction}
            thirdwebToken={thirdwebToken}
            walletAddress={walletAddress}
            sanityToken={sanityToken}
            transactionToast={transactionToast}
          />
        );
      default:
        return <h2>send</h2>;
    }
  };

  return (
    <Wrapper>
      <Selector>
        <Option
          style={action === "send" ? selectedStyle : unselectedStyle}
          onClick={() => setAction("send")}
        >
          Send
        </Option>
        <Option
          style={action === "receive" ? selectedStyle : unselectedStyle}
          onClick={() => setAction("receive")}
        >
          Receive
        </Option>
      </Selector>
      <ModalMain>{selectedModal(action)}</ModalMain>
    </Wrapper>
  );
};

export default TransferModal;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
`;

const Wrapper = styled.div`
  height: 35rem;
  width: 27rem;
  color: white;
  border: 1px solid #282b2f;
  display: flex;
  flex-direction: column;
`;

const Selector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
`;

const Option = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  font-size: 1.2rem;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    background-color: #111214;
  }
`;

const ModalMain = styled.div`
  padding: 1rem;
  flex: 1;
`;
