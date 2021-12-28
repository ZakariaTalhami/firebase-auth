import { signOutUser } from "../firebase";
import { statusChangePropType } from "../types/sharedPropTypes";

const SignOutForm = ({ onStatusChange }: statusChangePropType) => {
  const onSignOUt = () => {
    signOutUser().then(() => onStatusChange());
  };
  return <button onClick={onSignOUt}>SignOut</button>;
};

export default SignOutForm;