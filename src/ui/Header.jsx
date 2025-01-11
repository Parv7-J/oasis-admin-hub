import styled from "styled-components";

import Logout from "../features/authentication/Logout";
import { useDarkMode } from "../context/DarkModeContext";
import { HiOutlineMoon, HiOutlineSun, HiUser } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import ButtonGroup from "./ButtonGroup";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 3.4rem;
  align-items: center;
  justify-content: flex-end;
`;

function Header() {
  const { darkMode, darkModeToggle } = useDarkMode();
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <UserAvatar />
      <ButtonGroup>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiUser />
        </ButtonIcon>
        <Logout />
        <ButtonIcon onClick={darkModeToggle}>
          {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
      </ButtonGroup>
    </StyledHeader>
  );
}

export default Header;
