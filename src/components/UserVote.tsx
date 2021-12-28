import { useState } from "react";
import { updateUserState } from "../firebase";
import { statusChangePropType } from "../types/sharedPropTypes";
import { IUser } from "../types/User";

type UserVotePropType = statusChangePropType & {
  user: IUser;
};

const UserVote = ({ user, onStatusChange }: UserVotePropType) => {
  const [error, setError] = useState<string | null>(null);

  const tryChangeState = (userId: string, newState: boolean) => {
    updateUserState(userId, newState)
      .then(() => {
        onStatusChange();
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setTimeout(() => {
          setError(null);
        }, 2000);
      });
  };

  return (
    <div style={{
        padding: '1rem',
        backgroundColor: '#e9e9e9',
        borderRadius: '10px',
    }}>
      <h3>
        {user.userId} has voted: {user.userVote ? "YES" : "NO"}
      </h3>
      <button onClick={() => tryChangeState(user.userId, !user.userVote)}>
        Change Vote
      </button>
      {error &&<span style={{color: 'red'}}>{error}</span>}
    </div>
  );
};

export default UserVote;
