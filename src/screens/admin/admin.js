import React, { useState } from "react";
import Logo from "../../assets/images/college_logo.png";
import { WithAppHeader } from "../../hoc";
function AdminTable() {
    const [requests, setRequests] = useState([
        { _id: "1", name: "John Doe", email: "john@example.com", access: true },
        { _id: "2", name: "Jane Smith", email: "jane@example.com", access: false },
        { _id: "3", name: "Alice Johnson", email: "alice@example.com", access: true },
        { _id: "4", name: "Bob Brown", email: "bob@example.com", access: false },
    ]);

    const handleAction = (id) => {
        // Handle action
    };

    const handleRemove = (id) => {
        // Handle remove
    };

    const handleDeny = (id) => {
        // Handle deny
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-center items-center p-7">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="flex justify-center items-center p-7">
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
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request, index) => (
                                <tr key={request._id}>
                                    <td className="border border-gray-400 px-4 py-2 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2 text-center">
                                        {request.name}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2 text-center">
                                        {request.email}
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2 text-center">
                                        {request.access ? (
                                            <button
                                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => handleDeny(request._id)}
                                            >
                                                Deny access
                                            </button>
                                        ) : (
                                            <button
                                                className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => handleAction(request._id)}
                                            >
                                                Allow access
                                            </button>
                                        )}
                                        <button
                                            className="bg-red-500 hover:bg-red-700 ml-5 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => handleRemove(request._id)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default WithAppHeader(AdminTable);
