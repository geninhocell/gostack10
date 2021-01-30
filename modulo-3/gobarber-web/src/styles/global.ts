import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #312e38;
    -webkit-font-smoothing: antialiased;
    color: #fff;
  }

  body, input, button {
    font: 16px 'Roboto Slab', serif;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  /* #root {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
  } */

  button {
    cursor: pointer;
  }
`;
