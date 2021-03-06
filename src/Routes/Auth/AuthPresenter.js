import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const Wrapper = styled.div`
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius: 0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 30px 0px;
`;

const Link = styled.span`
  color: ${props => props.theme.blueColor};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
    button {
      margin-top: 20px;
    }
  }
`;

export default ({
  setState,
  state,
  username,
  login_email,
  sign_email,
  name,
  secret,
  onSubmit
}) => (
  <Wrapper>
    <Helmet>
      <title>InstaClone</title>
    </Helmet>
    <Form>
      {state === "logIn" && (
        <form onSubmit={onSubmit}>
          <Input
            placeholder={"이메일 주소"}
            value={login_email.value}
            onChange={login_email.onChange}
            type="email"
          />

          <Button text={"로그인"} />
        </form>
      )}
      {state === "signUp" && (
        <form onSubmit={onSubmit}>
          <Input
            placeholder={"이메일 주소"}
            value={sign_email.value}
            onChange={sign_email.onChange}
            type="email"
          />
          <Input
            placeholder={"성명"}
            value={name.value}
            onChange={name.onChange}
          />
          <Input
            placeholder={"사용자 이름"}
            value={username.value}
            onChange={username.onChange}
          />

          <Button text={"가입하기"} />
        </form>
      )}
      {state === "confirm" && (
        <form onSubmit={onSubmit}>
          <Input
            placeholder={"암호 붙여넣기"}
            required
            value={secret.value}
            onChange={secret.onChange}
          />
          <Button text={"확인"} />
        </form>
      )}
    </Form>
    {state !== "confirm" && (
      <StateChanger>
        {state === "logIn" ? (
          <>
            계정이 없으신가요?{" "}
            <Link onClick={() => setState("signUp")}>가입하기</Link>
          </>
        ) : (
          <>
            계정이 있으신가요?{" "}
            <Link onClick={() => setState("logIn")}>로그인</Link>
          </>
        )}
      </StateChanger>
    )}
  </Wrapper>
);
