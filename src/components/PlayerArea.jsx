import React from 'react';
import styled from 'styled-components';

const PlayerAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const PlayerArea = ({ children }) => {
  return <PlayerAreaContainer>{children}</PlayerAreaContainer>;
};

export default PlayerArea;