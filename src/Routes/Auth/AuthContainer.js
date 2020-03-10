import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import {
  REQUEST_SECRET,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOG_USER_IN
} from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [state, setState] = useState("logIn");
  const username = useInput("");
  const login_email = useInput("");
  const sign_email = useInput("");
  const name = useInput("");
  const secret = useInput("");

  const [requestSecretMutation] = useMutation(REQUEST_SECRET, {
    variables: { email: login_email.value }
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: username.value,
      email: sign_email.value,
      name: name.value
    }
  });

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: secret.value,
      email: login_email.value
    }
  });

  const [logUserInMutation] = useMutation(LOG_USER_IN, {});

  const onSubmit = async e => {
    e.preventDefault();
    if (state === "logIn") {
      // [1]
      if (login_email.value !== "") {
        //[2]
        try {
          const {
            data: { requestSecret }
          } = await requestSecretMutation();

          if (!requestSecret) {
            //[3]
            toast.error("아이디가 존재하지 않습니다.");
          } else {
            //[3]
            toast.success("이메일을 확인해주세요!");
            setState("confirm");
          }
        } catch (error) {
          toast.error("requestSecret을 실행할 수 없습니다!");
        }
      } else {
        //[2]
        toast.error("이메일이 필요합니다!");
      }
    } else if (state === "signUp") {
      //[1]
      if (
        username.value !== "" &&
        sign_email.value !== "" &&
        name.value !== ""
      ) {
        //[4]
        try {
          const {
            data: { createAccount }
          } = await createAccountMutation();

          if (!createAccount) {
            //[5]
            toast.error("createAccount를 실행 할 수 없습니다.");
          } else {
            //[5]
            toast.success("계정이 생성되었습니다!");
            setTimeout(() => setState("logIn"), 2000);
          }
        } catch (error) {
          toast.error(`createAccount를 실행 할 수 없습니다. ${error}`);
        }
      } else {
        //[4]
        toast.error("모든 항목을 기입하세요!");
      }
    } else if (state === "confirm") {
      // [1]
      if (secret.value !== "") {
        //[6]
        try {
          const {
            data: { confirmSecret }
          } = await confirmSecretMutation();
          const token = confirmSecret;
          if (token !== "" && token !== undefined) {
            logUserInMutation({ variables: { token } });
          } else {
            throw Error();
          }
        } catch (error) {
          toast.error("비밀코드를 확인 할 수 없습니다");
        }
      }
    }
  };

  return (
    <AuthPresenter
      setState={setState}
      state={state}
      username={username}
      login_email={login_email}
      sign_email={sign_email}
      name={name}
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};
