import styled from "styled-components";
import Image, { StaticImageData } from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";

export interface CoinProps {
  name: string;
  sign?: string;
  logo: StaticImageData;
  balanceUsd?: number;
  balanceCoin?: number;
  priceUsd?: number;
  change?: number;
  allocation?: number;
}

const Coin: React.FC<CoinProps> = ({
  name,
  logo,
  sign,
  balanceUsd,
  balanceCoin,
  priceUsd,
  change,
  allocation,
}: CoinProps) => {
  return (
    <Wrapper>
      <div>
        <div style={{ flex: 3 }}>
          <NameCol>
            <CoinIcon>
              <Image src={logo} alt={name} />
            </CoinIcon>
            <div>
              <Primary>{name}</Primary>
              <Secondary>{sign}</Secondary>
            </div>
          </NameCol>
        </div>
        <div style={{ flex: 2 }}>
          <Primary>${balanceUsd}</Primary>
          <Secondary>{balanceCoin}</Secondary>
          <Secondary>{sign}</Secondary>
        </div>
        <div style={{ flex: 1 }}>
          <Primary>${priceUsd}</Primary>
          <div
            style={{
              color: change != undefined && change > 0 ? "#26ad75" : "#f0616d",
            }}
          >
            {change != undefined && change > 0 && "+"}
            {change}%
          </div>
        </div>
        <div style={{ flex: 1 }}>{allocation}%</div>
        <div style={{ flex: 0 }}>
          <BsThreeDotsVertical />
        </div>
      </div>
    </Wrapper>
  );
};

export default Coin;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  & > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
  }
`;

const NameCol = styled.div`
  display: flex;
  align-items: center;
`;

const CoinIcon = styled.div`
  width: 1.8rem;
  margin-right: 1rem;

  & > img {
    width: 1.8rem;
    height: auto;
  }
`;

const Primary = styled.div`
  margin-bottom: 0.1rem;
`;

const Secondary = styled.div`
  color: #8a919e;
  font-size: 0.8rem;
`;
