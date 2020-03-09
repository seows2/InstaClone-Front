import React, { useState } from "react";
import styled from "styled-components";
import Input from "../Components/Input";
import Button from "../Components/Button";
import useInput from "../Hooks/useInput";

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

export default () => {
  const [state, setstate] = useState("logIn");
  const login_username = useInput("");
  const login_password = useInput("");

  const sign_username = useInput("");
  const sign_password = useInput("");
  const email = useInput("");
  const name = useInput("");

  return (
    <Wrapper>
      <Form>
        {state === "logIn" ? (
          <form>
            <Input placeholder={"사용자 이름"} {...login_username} />
            <Input
              placeholder={"비밀번호"}
              {...login_password}
              type="password"
            />
            <Button text={"로그인"} />
          </form>
        ) : (
          <form>
            <Input placeholder={"이메일 주소"} {...email} type="email" />
            <Input placeholder={"성명"} {...name} />
            <Input placeholder={"사용자 이름"} {...sign_username} />
            <Input
              placeholder={"비밀번호"}
              {...sign_password}
              type="password"
            />
            <Button text={"가입하기"} />
          </form>
        )}
      </Form>
      <StateChanger>
        {state === "logIn" ? (
          <>
            계정이 없으신가요?{" "}
            <Link onClick={() => setstate("signUp")}>가입하기</Link>
          </>
        ) : (
          <>
            계정이 있으신가요?{" "}
            <Link onClick={() => setstate("logIn")}>로그인</Link>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
};
