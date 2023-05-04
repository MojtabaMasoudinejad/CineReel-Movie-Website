import React from "react";
import styled from "styled-components";

const Pricing = () => {
  return (
    <MainDIv>
      <ContainerDiv>
        <GridDiv>
          <CardDiv>
            <CardTitile>Student</CardTitile>
            <p style={{ fontWeight: "normal", fontSize: "96px" }}>
              20$<span style={{ fontSize: "16px" }}>/per month</span>
            </p>
            <p>Save $9</p>
            <hr style={{ marginTop: "70px" }} />
            <ul style={{ margin: "40px 0", listStylePosition: "inside" }}>
              <li style={{ paddingBottom: "10px" }}>One account</li>
              <li style={{ paddingBottom: "10px" }}>Unlimited movies</li>
              <li style={{ paddingBottom: "10px" }}>Customized playlist</li>
            </ul>
            <Button href="#">Buy Now</Button>
          </CardDiv>
          <CardDiv>
            <CardTitile>Personal</CardTitile>
            <p style={{ fontWeight: "normal", fontSize: "96px" }}>
              39$
              <span style={{ fontSize: "16px" }}>/per month</span>
            </p>
            <p>Save $15</p>
            <hr style={{ marginTop: "70px" }} />
            <ul style={{ margin: "40px 0", listStylePosition: "inside" }}>
              <li style={{ paddingBottom: "10px" }}>Three account</li>
              <li style={{ paddingBottom: "10px" }}>Unlimited movies</li>
              <li style={{ paddingBottom: "10px" }}>Customized playlist</li>
            </ul>
            <Button href="#">Buy Now</Button>
          </CardDiv>
          <CardDiv>
            <CardTitile>Family</CardTitile>
            <p style={{ fontWeight: "normal", fontSize: "96px" }}>
              60$<span style={{ fontSize: "16px" }}>/per month</span>
            </p>
            <p>Save $25</p>
            <hr style={{ marginTop: "70px" }} />
            <ul style={{ margin: "40px 0", listStylePosition: "inside" }}>
              <li style={{ paddingBottom: "10px" }}>Six account</li>
              <li style={{ paddingBottom: "10px" }}>Unlimited movies</li>
              <li style={{ paddingBottom: "10px" }}>Customized playlist</li>
            </ul>
            <Button href="#">Buy Now</Button>
          </CardDiv>
        </GridDiv>
      </ContainerDiv>
      <a href="https://youtu.be/RLReK22LWTo" target="_blank" class="link">
        Watch on youtube <i class="fab fa-youtube"></i>
      </a>
    </MainDIv>
  );
};
export default Pricing;

const MainDIv = styled.div`
  min-height: 100vh;
  padding-top: 70px;

  background-color: black;
  color: white;
  font-family: Roboto;
  font-size: 16px;
  background: url("https://images.unsplash.com/photo-1598125443421-779f98323fe4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80");
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const ContainerDiv = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
`;

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 4%;
  padding: 12% 0;
`;

const CardDiv = styled.div`
  padding: 50px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 25px;
`;

const CardTitile = styled.h2`
  font-weight: normal;
  font-size: 36px;
  margin-bottom: 20px;
`;

const Button = styled.a`
  width: 100%;
  display: inline-block;
  text-align: center;
  background: rgba(21, 23, 24, 0.7);
  border-radius: 29px;
  padding: 20px 0;
  color: white;
  text-decoration: none;
  letter-spacing: 2px;
  transition: background 0.3s ease;

  &:hover {
    background: #000;
  }
`;
