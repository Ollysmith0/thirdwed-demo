import styled from "styled-components";
import { useRouter } from "next/router";
import Modal from "react-modal";
import TransferModal from "./modal/TransferModal";
import Link from "next/link";

Modal.setAppElement("#__next");

interface HeaderProps {
  walletAddress: string;
  sanityToken: any;
  thirdwebToken?: any;
  transactionToast: any;
}

const Header = ({ walletAddress, sanityToken, thirdwebToken, transactionToast }: HeaderProps) => {
  const router = useRouter();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#0a0b0d",
      padding: 0,
      border: "none",
    },

    overlay: {
      backgroundColor: "rgba(10, 11, 13, 0.75)",
    },
  };

  return (
    <Wrapper>
      <Title>Assets</Title>
      <ButtonContainer>
        <WalletLink>
          <WalletLinkTitle>Wallet Connected</WalletLinkTitle>
          <WalletAddress>
            {walletAddress !== undefined && walletAddress?.slice(0, 7)} ...{" "}
            {walletAddress !== undefined && walletAddress.slice(35)}
          </WalletAddress>
        </WalletLink>
        <Button>Buy / Sell</Button>
        <Link href={"/?transfer=1"}>
          <ButtonReceived>Send / Receive</ButtonReceived>
        </Link>
      </ButtonContainer>
      <Modal
        isOpen={!!router.query.transfer}
        onRequestClose={() => router.push("/")}
        style={customStyles}
      >
        <TransferModal
          sanityToken={sanityToken}
          walletAddress={walletAddress}
          thirdwebToken={thirdwebToken}
          transactionToast={transactionToast}
        />
      </Modal>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 3rem);
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #282b2f;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
  flex: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  font-size: 1.2rem;
  padding: 1rem 2rem;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: #54e6a2;
  color: #000;
  cursor: pointer;
`;

const ButtonReceived = styled.button`
  font-size: 1.2rem;
  padding: 1rem 2rem;
  outline: none;
  border: 1px solid #282b2f;
  background-color: initial;
  border-radius: 10px;

  margin-left: 1rem;
  color: #fff;
  cursor: pointer;
`;

const WalletLink = styled.div`
  font-size: 1.2rem;
  border: 1px solid #282b2f;
  border-radius: 50rem;
  margin-right: 1rem;
  padding: 0 1rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const WalletLinkTitle = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
  color: #27ad75;
  font-weight: 600;
`;

const WalletAddress = styled.div`
  font-size: 0.8rem;
`;
