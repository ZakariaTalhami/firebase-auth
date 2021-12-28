import { useEffect, useState } from "react";
import { getUserList } from "../firebase";
import { IUser } from "../types/User";
import UserVote from "./UserVote";

const UserList = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        fetchStatusList();
      }, []);
    
      const fetchStatusList = () => {
        getUserList().then(users => setUsers(users));
      } 

    return (
        <div style={{
            marginTop: '1rem',
            display: 'flex',
            flexDirection: "column",
            gap: "1rem"
        }}>
            {users.map(usr => <UserVote key={usr.userId} user={usr} onStatusChange={fetchStatusList}/>)}
        </div>
    );
}

export default UserList