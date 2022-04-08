import styled, { createGlobalStyle } from 'styled-components';

export const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: #3b3b4d;
  min-height: 100%;
  height: fit-content;
  padding: 20px 0;
`;

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    font-family: "Roboto", sans-serif;
    color: #fff;
  }
`
