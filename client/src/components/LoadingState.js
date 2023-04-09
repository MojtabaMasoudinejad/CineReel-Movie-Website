import React from "react";
import styled, { keyframes } from "styled-components";

import { spinner3 } from "react-icons-kit/icomoon/spinner3";

const LoadingState = () => {
  const SpinnerIcon = withBaseIcon({ size: 50 });

  return (
    <div>
      <Spinner>
        <SpinnerIcon icon={spinner3} />
      </Spinner>
    </div>
  );
};

export default LoadingState;

const SpinnerMove = keyframes`
from{
  transform: rotate(0deg)
}
to{
transform:rotate(360deg)
}
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  animation: ${SpinnerMove} 0.8s linear infinite;
  position: relative;
  margin: 40vh auto;
  color: #1e81b0;
  scale: 1.2;
`;
