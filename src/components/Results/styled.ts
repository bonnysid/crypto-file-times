import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  max-width: 700px;
  flex-direction: column;
  row-gap: 10px;
  height: fit-content;
  margin-top: 20px;
`;

export const ResultWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const ResultName = styled.div`
  font-size: 17px;
`;

export const Time = styled.div`
  font-size: 17px;

  span {
    color: #cc8347;
  }
`;
