import { styled } from "solid-styled-components";
import { Company } from "../types";

interface CurrentCompanyProps {
  company: () => Company;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResponsiveP = styled.p`
  height: 80px;
  max-width: 50%;
  text-align: center;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    max-width: 85%;
  }
`;

export const CurrentCompany = ({ company }: CurrentCompanyProps) => (
  <Container>
    <img
      src={company()?.img}
      width={75}
      height={75}
      style={{
        "border-radius": "50%"
      }}
    />
    <h2>{company()?.name}</h2>
    <ResponsiveP>{company()?.description}</ResponsiveP>
  </Container>
);
