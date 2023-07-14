import React from "react";
import styled from "styled-components";

const Header = () => {
  return <div>Header</div>;
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
