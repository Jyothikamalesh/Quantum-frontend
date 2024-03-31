import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../../routes/Context";
import { WithAppHeader } from "../../hoc";

function AdminTable() {
    const { accessToken, logout } = useAuth();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [responses, setResponses] = useState({});

    const fetchUsers = useCallback(async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/admin/users`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setUsers(response.data.users);
        } catch (error) {
            setError("Error fetching users");
            logout(); // Logout the user in case of error
        }
    }, [accessToken, logout]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleAction = useCallback(async (userId, isVerified) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/admin/${isVerified ? "restrict" : "verify"}`,
                [userId],
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setResponses(prevResponses => ({
                ...prevResponses,
                [userId]: response.data,
            }));
            setTimeout(() => {
                setResponses(prevResponses => ({
                    ...prevResponses,
                    [userId]: null,
                }));
            }, 2000);
            fetchUsers();
        } catch (error) {
            console.error(`Error ${isVerified ? "restricting" : "verifying"} user with ID ${userId}:`, error);
            setResponses(prevResponses => ({
                ...prevResponses,
                [userId]: { error: `Error ${isVerified ? "restricting" : "verifying"} user` },
            }));
            setTimeout(() => {
                setResponses(prevResponses => ({
                    ...prevResponses,
                    [userId]: null,
                }));
            }, 2000);
        }
    }, [accessToken, fetchUsers]);

    const handleDelete = useCallback(async (userId) => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_API_URL}/auth/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setResponses(prevResponses => ({
                ...prevResponses,
                [userId]: response.data,
            }));
            fetchUsers();
        } catch (error) {
            console.error(`Error deleting user with ID ${userId}:`, error);
            setResponses(prevResponses => ({
                ...prevResponses,
                [userId]: { error: `Error deleting user` },
            }));
            setTimeout(() => {
                setResponses(prevResponses => ({
                    ...prevResponses,
                    [userId]: null,
                }));
            }, 2000);
        }
    }, [accessToken, fetchUsers]);

    return (
        <div className="container mx-auto mt-10">
            {error && <div>Error: {error}</div>}
            <div className="overflow-x-auto w-full">
                <table className="border-collapse border border-gray-400 w-full bg-white shadow-lg">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-4 py-2 bg-slate-500">
                                S.No
                            </th>
                            <th className="border border-gray-400 px-4 py-2 bg-slate-500">
                                Name
                            </th>
                            <th className="border border-gray-400 px-4 py-2 bg-slate-500">
                                Email
                            </th>
                            <th className="border border-gray-400 px-4 py-2 bg-slate-500">
                                Action
                            </th>
                            <th className="border border-gray-400 px-4 py-2 bg-slate-500">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-4">No users found</td>
                            </tr>
                        ) : (
                            users.map((user, index) => (
                                <tr key={user._id}>
                                    <td className="border border-gray-400 px-4 py-2 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2 text-center">
                                        {user.name}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2 text-center">
                                        {user.email}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2 text-center">
                                        <div>
                                            {user.is_verified ? (
                                                <button
                                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => handleAction(user._id, true)}
                                                >
                                                    Restrict
                                                </button>
                                            ) : (
                                                <button
                                                    className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => handleAction(user._id, false)}
                                                >
                                                    Verify
                                                </button>
                                            )}
                                            {responses[user._id] && responses[user._id].error && (
                                                <div className="text-red-500">
                                                    {responses[user._id].error}
                                                </div>
                                            )}
                                            {responses[user._id] && responses[user._id].status && (
                                                <div className="text-green-500">
                                                    {responses[user._id].status}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2 text-center">
                                        <div>
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => handleDelete(user._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default WithAppHeader(AdminTable);
