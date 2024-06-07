import React, { useEffect, useState } from "react";
import { generateRandomPassword } from "../utils/generateRandomPassword";
import { HiOutlineXMark } from "react-icons/hi2";
import { register } from "../utils/auth";
import { PulseLoader } from "react-spinners";
const FormSubmitted = ({ data, onCancel, onConfirm, onClear }) => {
  const [password, setPassword] = useState("");
  const [backenderror, setBakendError] = useState("");
  const [Loading, setLoading] = useState("");
  useEffect(() => {
    // Generate a random password when the component mounts
    const newPassword = generateRandomPassword(data?.email);
    setPassword(newPassword);
  }, [data.email]);
  const handleRegisteration = async () => {
    setLoading(true);
    const response = await register(
      data.Fname,
      data.Lname,
      data.email,
      data.phone,
      password,
      password
    );
    setLoading(false);
    // console.log("response", response);
    // console.log("Regsitered StoreOwner");
    if (response?.data?.status === "success") {
      onClear();
    }
    if (response?.error) {
      setBakendError(response?.error);
    }
  };

  // console.log("generated password", password);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90 z-50 overflow-hidden">
      <div className=" bg-white border border-gray-300 rounded-lg p-8 px-[100px] shadow-md relative ">
        <HiOutlineXMark
          className="absolute top-4 right-2 cursor-pointer font-bold bg-white text-red-500 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out shadow-lg rounded-full"
          size={30}
          style={{ transitionProperty: "top" }}
          onClick={onCancel}
        />

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
        <div>
          {backenderror && (
            <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full">
              {backenderror}
            </p>
          )}
          {!backenderror && (
            <div className="flex  space-x-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                onClick={handleRegisteration}
                disabled={Loading}
              >
                {Loading ? (
                  <PulseLoader color="#FFFFFF" />
                ) : (
                  "Confirm Registration "
                )}
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                onClick={onClear}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormSubmitted;
