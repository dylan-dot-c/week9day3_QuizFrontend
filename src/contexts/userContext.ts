import { createContext } from "react";
import UserResponse from "../types/userResponse";

type UserContextType = {
    currentUser: UserResponse;
    setCurrentUser: React.Dispatch<React.SetStateAction<UserResponse | null>>;
};

// const emptyUser = {
//     admin: null,
//     created_on: "",
//     email: "",
//     first_name: "",
//     last_name: "",
//     modified_on: "",
//     token: "",
//     user_id: 0,
// };

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
