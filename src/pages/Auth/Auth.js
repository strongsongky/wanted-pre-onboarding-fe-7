import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.scss";
import { httpMethod, request } from "../utils/fetchData";

export default function Auth() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  let navigate = useNavigate();

  const emailChangeHandler = (e) => {
    setInputEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setInputPassword(e.target.value.trim());
  };

  const validEmail = RegExp(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  );
  const enteredEmailIsValid = validEmail.test(inputEmail);
  const enteredPasswordIsValid = inputPassword.length >= 8;

  useEffect(() => {
    if (enteredEmailIsValid && enteredPasswordIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [enteredEmailIsValid, enteredPasswordIsValid]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const submittedData = {
      email: inputEmail,
      password: inputPassword,
    };

    if (isLogin) {
      const res = await request(
        "auth/signin",
        httpMethod.post,
        {
          "Content-Type": "application/json",
        },
        submittedData
      );
      const data = await res.json();
      if (data.statusCode === 404) {
        return alert(data.message);
      }
      if (data.statusCode === 401) {
        return alert("입력정보를 확인해주세요");
      }
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        alert("환영합니다 🎉");
        navigate(0);
      }
    }

    if (!isLogin) {
      const res = await request(
        "auth/signup",
        httpMethod.post,
        {
          "Content-Type": "application/json",
        },
        submittedData
      );
      const data = await res.json();
      if (data.statusCode === 400) {
        return alert(data.message);
      }
      if (data.access_token) {
        alert("회원가입 되었습니다 🎉 로그인 해주세요");
        navigate(0);
        return;
      }
    }
  };

  const createAccountHandler = () => {
    setIsLogin((current) => !current);
  };

  return (
    <section className="authContainer">
      <h1>Todo List</h1>
      <form onSubmit={submitHandler} className="authForm">
        <div className="authItem">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="이메일을 입력해주세요(@ 포함)"
            onChange={emailChangeHandler}
            autoComplete="off"
          />
        </div>
        <div className="authItem">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요(8자리 이상)"
            onChange={passwordChangeHandler}
            autoComplete="off"
          />
        </div>
        <button disabled={!formIsValid} className="loginBtn" type="submit">
          {isLogin ? "로그인" : "회원가입"}
        </button>
        <button
          onClick={createAccountHandler}
          className="createAccountBtn"
          type="button"
        >
          {isLogin ? "회원가입" : "로그인"}
        </button>
      </form>
    </section>
  );
}
