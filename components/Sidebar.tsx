import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import CoinbaseLogo from "assets/cb-logo.png";
import { navItems } from "static/navItems";

const Sidebar = () => {
  const [activeIcon, setActiveIcon] = useState(navItems[0].title);
  return (
    <Wrapper>
      <LogoContainer>
        <Logo>
          <Image src={CoinbaseLogo} alt="coinbase-logo" />
        </Logo>
      </LogoContainer>
      <NavItemsContainer>
        {navItems.map((item, i) => (
          <NavItem key={i} onClick={() => setActiveIcon(item.title)}>
            <NavIcon
              style={{
                color: activeIcon === item.title ? "#000" : "",
                background: activeIcon === item.title ? "#54e6a2" : "",
              }}
            >
              {item.icon}
            </NavIcon>
            <NavTitle>{item.title}</NavTitle>
          </NavItem>
        ))}
      </NavItemsContainer>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  height: calc(100vh);
  border-right: 1px solid #282b2f;
  width: calc(22rem - 32px);
  padding: 0 1rem;
`;

const LogoContainer = styled.div`
  margin: 1.5rem 0;
`;

const Logo = styled.div`
  width: 44%;
  object-fit: contain;
  margin-left: 1.5rem;

  & > img {
    width: 100%;
    height: auto;
  }
`;

const NavItemsContainer = styled.div`
  margin-top: 3rem;

  &:hover {
    cursor: pointer;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 500;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  height: 4rem;

  &:hover {
    background: #141519;
  }
`;

const NavIcon = styled.div`
  background: #141519;
  padding: 0.7rem;
  border-radius: 50%;
  margin: 0 1rem;
  display: grid;
  place-items: center;

  transition: all 0.2s linear;
`;

const NavTitle = styled.div``;
