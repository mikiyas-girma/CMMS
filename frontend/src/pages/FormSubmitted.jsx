import React from "react";
import { generateRandomPassword } from "../utils/generateRandomPassword";
const FormSubmitted = ({ data, onCancel, onConfirm }) => {
  const password = generateRandomPassword(data.email);
  console.log("generated password", password);
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90 z-50 overflow-hidden">
      <div className=" bg-white border border-gray-300 rounded-lg p-8 px-[100px] shadow-md relative ">
        <h2 className="text-xl font-semibold mb-4">Form Submission Details</h2>
        <p className="mb-2">
          <strong>First Name:</strong> {data.Fname}
        </p>
        <p className="mb-2">
          <strong>Last Name:</strong> {data.Lname}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {data.email}
        </p>
        <p className="mb-4">
          <strong>Phone:</strong> {data.phone}
        </p>
        <p className="mb-4">
          <strong>Password:</strong> {password}
        </p>
        <div className="flex  space-x-4">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={onConfirm}
          >
            Confirm Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormSubmitted;
