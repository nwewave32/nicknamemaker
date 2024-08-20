import "../lib/data/reset.css";
import { RecoilRoot } from "recoil";
import styled from "styled-components";
import { colorStyle } from "../lib/data/styleData";

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  background-color: ${colorStyle.black};
`;

const Layout = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <MainContainer id="root">
        <Component {...pageProps} />
      </MainContainer>
    </RecoilRoot>
  );
};
export default Layout;
