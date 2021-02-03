import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > header {
    height: 100px;
    background: #28262e;
    width: 100%;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -60px auto 0;

  form {
    margin: 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 5px;
      font-size: 20px;
      text-align: left;
    }

    a {
      color: #f4dee8;
      display: block;
      margin-top: 8px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4dee8')};
      }
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 16px;
  position: relative;
  align-self: center;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #ff9000;
    border: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    right: 0;
    bottom: 0;
    transition: background-color 0.2s;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;
