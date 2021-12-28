import { useState } from "react";
import { signIn } from "../firebase";
import { statusChangePropType } from "../types/sharedPropTypes";

const LoginForm = ({ onStatusChange }: statusChangePropType) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const attemptToSignIn = () => {
    signIn(email, password)
      .then((data) => console.log(data))
      .then(() => onStatusChange());
  };

  return (
    <div>
      <input type="email" value={email} onChange={onEmailChange} />
      <input type="password" value={password} onChange={onPasswordChange} />
      <button onClick={attemptToSignIn}>Sign In</button>
    </div>
  );
};

export default LoginForm;