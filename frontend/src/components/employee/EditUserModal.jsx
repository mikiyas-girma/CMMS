import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { blockUser, updateUser } from "../../utils/auth";
import { PulseLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/Slice/userSlice";
import { handleBlurEmail,
         handleBlurName,
         handleBlurPhone
 } from "../../utils/validateLogin";
// import { Navigate } from "react-router-dom";

const EditUserModal = ({ user, isOpen, onClose }) => {
  const [editedUser, setEditedUser] = useState(user);
  const [Loading, setLoading] = useState("");
  const [email, setEmail] = useState(editedUser.email);
  const [emailError, setEmailError] = useState("");
  const [Fname, setFname] = useState(editedUser.Fname);
  const [Lname, setLname] = useState(editedUser.Lname);
  const [FnameError, setFNameError] = useState("");
  const [LnameError, setLNameError] = useState("");
  const [phone, setPhone] = useState(editedUser.phone);
  const [phoneError, setPhoneError] = useState("");
  const [backenderror, setBakendError] = useState("");
  const [loading, setloading] = useState("");
  const [backerror, setBackError] = useState("");
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (backerror) {
        setShowError(true);
        const timer = setTimeout(() => {
          setBackError("");
          setShowError(false);
        }, 3000);

        return () => clearTimeout(timer);
    }
  }, [backerror]);

  useEffect(() => {
    setEditedUser(user); // Update the state when the user prop changes
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

      setEditedUser((prev) => ({
        ...prev,
        [name]: value,
      }));
  };
  console.log("editedUser", editedUser);

  const hasValidationErrors = () => {
    return FnameError || LnameError || emailError || phoneError;
    };

  const handleSubmit = async () => {
    let url = "";
    if (user.role === "storeOwner") {
      url = `users/storeOwner/${user._id}`;
    } else if (user.role === "employee") {
      url = `users/employee/${user._id}`;
    }
    setloading(true);
    const response = await updateUser(url, editedUser);
    setloading(false);
    let ur = "";
    if (user.role === "storeOwner") {
      ur = "/storeOwner";
    } else if (user.role === "employee") {
      ur = "/employee";
    }

    if (ur) {
      dispatch(fetchUsers(ur));
    }
    console.log("response", response);
    if (response?.error) {
      setBackError(response?.error);
    }
    if (response?.data?.status === "success") {
      onClose();
    }
    // onSave(editedUser);
    if (response?.data?.status === "success") {
      onClose();
    }
  };
  console.log("bacError", backerror);
  const handleButtonClick = async () => {
    let url = "";
    if (user.status === "active") {
      url = `block/${user._id}`;
    } else if (user.status === "inactive") {
      url = `unblock/${user._id}`;
    }
    setLoading(true);
    const response = await blockUser(url, user);
    setLoading(false);
    console.log("response", response);

    let ur = "";
    if (user.role === "storeOwner") {
      ur = "/storeOwner";
    } else if (user.role === "employee") {
      ur = "/employee";
    }

    if (ur) {
      dispatch(fetchUsers(ur));
    }

    if (response?.error) {
      setBakendError(response?.error);
    }
    if (response?.data?.status === "success") {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit User</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={2}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              value={Fname}
              name="Fname"
              onChange={(e) => {
                setFname(e.target.value);
                handleChange(e);
              }}
              onBlur={(e) => handleBlurName(e, setFNameError)}
            />
          </FormControl>
          {FnameError && (
                  <p className="text-red-700 p-2 rounded w-full">{FnameError}</p>
                )}

          <FormControl mt={1}>
            <FormLabel>Last Name</FormLabel>
            <Input
              value={Lname}
              name="Lname"
              onChange={(e) => {
                setLname(e.target.value);
                handleChange(e);
              }}
              onBlur={(e) => handleBlurName(e, setLNameError)}
            />
          </FormControl>
          {LnameError && (
                  <p className="text-red-700 p-2 rounded w-full">{LnameError}</p>
                )}

          <FormControl mt={1}>
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
                handleChange(e);
                }}
              onBlur={(e) => handleBlurEmail(e, setEmailError)}
            />
          </FormControl>
          {emailError && (
                  <p className="text-red-700 p-2 rounded w-full">{emailError}</p>
                )}
          {showError && backerror && (
                  <p className="text-red-700 p-2 rounded w-full">{backerror}</p>
                )}

          <FormControl mt={1}>
            <FormLabel>Phone</FormLabel>
            <Input
              value={phone}
              name="phone"
              onChange={(e) => {
                setPhone(e.target.value);
                handleChange(e);
              }}
              onBlur={(e) => handleBlurPhone(e, setPhoneError)}
            />
          </FormControl>
          {phoneError && (
                  <p className="text-red-700 p-2 rounded w-full">{phoneError}</p>
                )}

        </ModalBody>

        <ModalFooter display="flex" justifyContent="space-between">
          {backenderror && (
            <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full">
              {backenderror}
            </p>
          )
          }
          {!backenderror && (
            <Button
              onClick={handleButtonClick}
              colorScheme="red"
              mr={3}
              disabled={Loading}
            >
              {Loading ? (
                <PulseLoader color="#FFFFFF" />
              ) : user.status === "active" ? (
                "Block"
              ) : (
                "UnBlock"
              )}
            </Button>
          )}

          <div>

            {(
              <>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={handleSubmit}
                  isDisabled={hasValidationErrors() || loading}
                >
                  {loading ? <PulseLoader color="#FFFFFF" /> : "Save"}
                </Button>

                <Button onClick={onClose}>Cancel</Button>
              </>
            )}
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditUserModal;
