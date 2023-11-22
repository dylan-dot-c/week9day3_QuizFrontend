import UserResponse from "../types/userResponse";
import { useState, useEffect } from "react";
import EditUserModal from "./EditUserModal";
import { deleteUser } from "../lib/apiWrapper";
import { useNavigate } from "react-router-dom";

type ProfileProps = {
    currentUser: UserResponse;
};

function Profile({ currentUser }: ProfileProps) {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const handleDelete = async () => {
        const response = confirm(
            "Are you sure you want to delete your account? This cant be undone!"
        );
        if (response && token) {
            let data = await deleteUser(token);
            console.log(data);
            navigate("/logout");
        }
    };
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        if (currentUser?.user_id == 0) {
            navigate("/login?redirect_url=dashboard");
        }
    }, []);
    return (
        <div className='d-flex gap-5 '>
            {currentUser && (
                <>
                    <img
                        src='https://picsum.photos/500?random=1'
                        alt='random image'></img>
                    <div>
                        <h1>My Profile</h1>
                        <pre>First Name: {currentUser.first_name}</pre>
                        <pre>Last Name: {currentUser.last_name}</pre>
                        <pre>Email: {currentUser.email}</pre>

                        <button
                            className='w-100 btn btn-warning'
                            onClick={() => setShowEditModal(true)}>
                            Edit Profile
                        </button>
                        <button
                            className='w-100 btn btn-danger mt-3'
                            onClick={handleDelete}>
                            Delete Profile
                        </button>
                    </div>
                </>
            )}
            {showEditModal && (
                <EditUserModal
                    show={showEditModal}
                    setShow={setShowEditModal}
                    userEdit={currentUser}
                />
            )}
        </div>
    );
}

export default Profile;
