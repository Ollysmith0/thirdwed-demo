import styled from "styled-components";

const Promos = () => {
  return (
    <Wrapper>
      <OfferCard>
        <Title>Yield Earned</Title>
        <Description>Earn up to 2.84% APY on your crypto</Description>
        <PlaceHolder />
        <Additional>
          $0.0000008
          <span>2.84% APY</span>
        </Additional>
      </OfferCard>
      <OfferCard>
        <Title>Earn and Learn</Title>
        <Description>Earn up to 2.84% APY on your crypto</Description>
        <PlaceHolder />
        <Additional style={{ color: '#3773f5' }}>Verify Identity</Additional>
      </OfferCard>
    </Wrapper>
  );
};

export default Promos;

const Wrapper = styled.div`
  margin-top: 2rem;
  padding-right: 1rem;
`;

const OfferCard = styled.div`
  width: 21rem;
  height: 11rem;
  border: 1px solid #282b2f;
  margin-bottom: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.1rem;
`;

const Description = styled.div`
  font-size: 1.1rem;
`;

const PlaceHolder = styled.div`
  flex: 1;
`;

const Additional = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    color: #8a919e;
    font-size: 1rem;
  }
`;
