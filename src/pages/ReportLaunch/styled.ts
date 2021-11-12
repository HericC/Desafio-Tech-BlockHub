import styled from 'styled-components';

const Container = styled.main`
  max-width: 1260px;
  background-color: white;
  margin: 50px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  h1 {
    margin-bottom: 20px;
  }

  section {
    margin-bottom: 40px;

    :last-child {
      margin-bottom: 0;
    }

    h2 {
      margin-bottom: 5px;
    }

    table {
      border-collapse: collapse;

      tr {
        border: 1px solid ${({ theme }) => theme.colors.background};

        th,
        td {
          text-align: center;
          color: black;
        }

        th {
          /* font-size: 20px; */
          padding: 6px 0;
          background-color: ${({ theme }) => theme.colors.background};

          /* :nth-child(1) {
          min-width: 220px;
        }

        :nth-child(2) {
          min-width: 50px;
        }

        :nth-child(3) {
          min-width: 90px;
        } */
        }

        td {
          margin-bottom: 20px;
          height: 40px;
          padding: 5px 10px;
        }
      }
    }
  }

  @media screen and (max-width: 1300px) {
    margin: 50px 20px;
  }
`;

export { Container };
