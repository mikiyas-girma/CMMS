import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  HStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

import SidebarWithHeader from "../components/sidebar/SidebarWithHeader";

import { getUserAuthStatus } from "../utils/auth";

import {
  validateName,
  validateCategory,
  validateQuantity,
  handleBlurName,
  handleBlurCategory,
  handleBlurQuantity,
} from "../utils/validateMaterial";
// import materialslist from "../components/materials/materialsData";
import { addMaterials, registerMaterial } from "../utils/material";
import { PulseLoader } from "react-spinners";
import { HiOutlineXMark } from "react-icons/hi2";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMaterials } from "../redux/Slice/materialSlice";

const Materials = () => {
  const bg = useColorModeValue("#fefefb", "gray.800");
  const text = useColorModeValue("gray.900", "white");
  const { colorMode } = useColorMode();
  const borderColor = colorMode === "light" ? "gray.800" : "gray.600";

  const [materialList, setMaterialList] = useState([]);
  const [rowsLimit] = useState(5);
  const [rowsToShow, setRowsToShow] = useState(
    materialList?.slice(0, rowsLimit)
  );
  const [totalPage, settotalPage] = useState(
    Math.ceil(materialList.length / rowsLimit)
  );
  const [currentPage, setCurrentPage] = useState(1);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [threshold, setThreshold] = useState("");
  const dispatch = useDispatch();

  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [operation, setOperation] = useState("");
  const [checkedMaterials, setCheckedMaterials] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [image, setImage] = useState("");
  const [backenderror, setBakendError] = useState("");
  const [Loading, setLoading] = useState("");
  const [AddMaterialbackenderror, setAddMaterialBakendError] = useState("");
  const [AddMaterialLoading, setAddMaterialLoading] = useState("");
  const [editedMaterial, setEditedMaterial] = useState("");
  const [EditMaterialModal, setEditMaterialModal] = useState(false);
  useEffect(() => {
    const totalPages = Math.ceil(materialList.length / rowsLimit);
    settotalPage(totalPages);

    if (currentPage >= totalPages) {
      setCurrentPage(totalPages - 1);
      changePage(totalPages);
    }
  }, [materialList, rowsLimit]);

  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    setRowsToShow(materialList?.slice(startIndex, endIndex));
    setCurrentPage(currentPage + 1);
  };

  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    setRowsToShow(materialList?.slice(startIndex, endIndex));
    setCurrentPage(value);
  };

  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    setRowsToShow(materialList?.slice(startIndex, endIndex));
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 0);
  };

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const onEditModalOpen = () => {
    setEditMaterialModal(true);
  };
  const onEditModalClose = () => {
    setEditMaterialModal(false);
  };

  const handleNewMaterial = async (e) => {
    e.preventDefault();
    const nameError = validateName(name);
    const categoryError = validateCategory(category);
    const quantityError = validateQuantity(quantity);
    console.log("Material");
    console.log("data", name, category, quantity, image);
    // if (nameError || categoryError || quantityError) return;
    setLoading(true);
    const response = await registerMaterial(
      name,
      category,
      image,
      quantity,
      threshold
    );
    setLoading(false);
    if (response?.data?.status === "success") {
      await dispatch(getMaterials());

      onClose();
    }
    if (response?.error) {
      setBakendError(response?.error);
    }
    console.log("response", response);

    // const newProduct = {
    //   id: materialList.length + 1,
    //   Name: document.getElementById("name").value,
    //   Category: document.getElementById("category").value,
    //   Quantity: parseInt(document.getElementById("quantity").value),
    // };
  };

  // const handleCheckboxChange = (e, id) => {
  //   setCheckedMaterials((prevState) => ({
  //     ...prevState,
  //     [id]: e.target.checked,
  //   }));
  // };
  const handleCheckboxChange = (e, id) => {
    const isChecked = checkedMaterials.includes(id);
    if (isChecked) {
      setCheckedMaterials(checkedMaterials.filter((item) => item !== id));
      setInputValues(inputValues.filter((item) => item.material !== id));
    } else {
      setCheckedMaterials([...checkedMaterials, id]);
    }
  };

  const handleQuantityChange = (e, material) => {
    const { value } = e.target;

    setInputValues((prevState) => {
      const existingItem = prevState.find((item) => item.material === material);
      if (existingItem) {
        return prevState.map((item) =>
          item.material === material ? { ...item, quantity: value } : item
        );
      } else {
        return [...prevState, { material, quantity: value }];
      }
    });
  };

  const getQuantityValue = (id) => {
    const item = inputValues.find((value) => value.material === id);
    return item ? item.quantity : "";
  };

  console.log("checkedMaterial", checkedMaterials);
  console.log("Input", inputValues);

  const handleAddMaterials = async () => {
    const url = "addmaterial";
    setAddMaterialLoading(true);
    const response = await addMaterials(url, inputValues);
    setAddMaterialLoading(false);
    console.log("response", response);
    if (response?.error) {
      setAddMaterialBakendError(response?.error);
    }

    if (response?.data?.status === "success") {
      await dispatch(getMaterials());

      Navigate("/materials");
    }

    // const updatedMaterialsList = [...materialList];
    // Loop over the inputValues object
    // for (let id in inputValues) {
    //   // If the material is checked
    //   if (checkedMaterials[id]) {
    //     // Add the input value to the total quantity of the material
    //     let material = updatedMaterialsList.find(
    //       (material) => material.id === Number(id)
    //     );
    //     material.Quantity += Number(inputValues[id]);
    //   }
    // }

    //   // Update the materialslist state
    //   setMaterialList(updatedMaterialsList);

    //   // Reset the inputValues and checkedMaterials states
    //   setInputValues([]);
    //   setCheckedMaterials([]);
  };

  const handleWithdrawMaterials = async () => {
    const url = "withdrawmaterial";

    setAddMaterialLoading(true);
    const response = await addMaterials(url, inputValues);
    setAddMaterialLoading(false);
    console.log("response", response);
    if (response?.error) {
      setAddMaterialBakendError(response?.error);
    }

    if (response?.data?.status === "success") {
      await dispatch(getMaterials());

      Navigate("/materials");
    }

    // const updatedMaterialsList = [...materialList];

    // // Loop over the inputValues object
    // for (let id in inputValues) {
    //   // If the material is checked
    //   if (checkedMaterials[id]) {
    //     // Subtract the input value from the total quantity of the material
    //     let material = updatedMaterialsList.find(
    //       (material) => material.id === Number(id)
    //     );
    //     material.Quantity -= Number(inputValues[id]);
    //   }
    // }

    // // Update the materialslist state
    // setMaterialList(updatedMaterialsList);

    // // Reset the inputValues and checkedMaterials states
    // setInputValues({});
    // setCheckedMaterials({});
  };

  // useEffect(() => {
  //   console.log("Material List Updated");
  //   console.log(materialList);
  // }, [materialList]);

  useEffect(() => {
    const fetchMaterials = async () => {
      await dispatch(getMaterials());
    };
    fetchMaterials();
  }, [rowsLimit]);
  const { material } = useSelector((state) => state.material);
  // console.log("fteched materials", material);
  useEffect(() => {
    if (material) {
      setMaterialList(material);
      setRowsToShow(material.slice(0, rowsLimit));
    }
  }, [material, rowsLimit]);
  const { role } = getUserAuthStatus();
  if (role === "admin") return null;

  return (
    <SidebarWithHeader>
      {role === "employee" && (
        <HStack justify="end" mt={4} px={4}>
          <Button onClick={onOpen} colorScheme="blue" mr={2}>
            New Material
          </Button>
          <Button
            colorScheme="yellow"
            onClick={() => {
              if (operation === "Add") {
                setIsEditing(false);
                setOperation("");
              } else {
                setIsEditing(true);
                setOperation("Add");
              }
            }}
          >
            Add Material
          </Button>
          <Button
            colorScheme="red"
            m={2}
            onClick={() => {
              if (operation === "Withdraw") {
                setIsEditing(false);
                setOperation("");
              } else {
                setIsEditing(true);
                setOperation("Withdraw");
              }
            }}
          >
            Withdraw Material
          </Button>
        </HStack>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="relative">
          <HiOutlineXMark
            className="absolute top-4 right-2 cursor-pointer font-bold bg-white text-red-500 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out shadow-lg rounded-full"
            size={30}
            style={{ transitionProperty: "top" }}
            onClick={onClose}
          />
          <ModalHeader>Add New Material</ModalHeader>
          <ModalBody>
            <form encType="multipart/form-data" onSubmit={handleNewMaterial}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  id="name"
                  placeholder="Enter material name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={(e) => handleBlurName(e, setNameError)}
                />
                {nameError && (
                  <p className="text-red-700 p-2 rounded w-full">{nameError}</p>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Category</FormLabel>
                <Input
                  id="category"
                  placeholder="Enter material category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  onBlur={(e) => handleBlurCategory(e, setCategoryError)}
                />
                {categoryError && (
                  <p className="text-red-700 p-2 rounded w-full">
                    {categoryError}
                  </p>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Image</FormLabel>
                <Input
                  type="file"
                  capture="environment"
                  accept="image/*"
                  padding={2}
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Quantity</FormLabel>
                <Input
                  id="quantity"
                  placeholder="Enter material quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  onBlur={(e) => handleBlurQuantity(e, setQuantityError)}
                />
                {quantityError && (
                  <p className="text-red-700 p-2 rounded w-full">
                    {quantityError}
                  </p>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Threshold</FormLabel>
                <Input
                  id="threshold"
                  placeholder="Enter material threshold"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                />
              </FormControl>
              <ModalFooter>
                {backenderror && (
                  <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full">
                    {backenderror}
                  </p>
                )}
                {!backenderror && (
                  <>
                    <Button colorScheme="blue" mr={3} type="submit">
                      {Loading ? <PulseLoader color="#FFFFFF" /> : "Add"}
                    </Button>
                    <Button type="button" onClick={onClose}>
                      Cancel
                    </Button>
                  </>
                )}
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={EditMaterialModal} onClose={onEditModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Material Threshold</ModalHeader>
          <ModalBody>
            <form>
              <FormControl>
                <Image
                  src={`http://127.0.0.1:3000/public/img/materials/${editedMaterial.image}`}
                  alt={editedMaterial.name}
                  w="200px"
                  h="100px"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  id="name"
                  placeholder="Enter material name"
                  value={editedMaterial.name}
                  onChange={(e) =>
                    setEditedMaterial({
                      ...editedMaterial,
                      name: e.target.value,
                    })
                  }
                  isDisabled
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Category</FormLabel>
                <Input
                  id="category"
                  placeholder="Enter material category"
                  value={editedMaterial.category}
                  onChange={(e) =>
                    setEditedMaterial({
                      ...editedMaterial,
                      category: e.target.value,
                    })
                  }
                  isDisabled
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Quantity</FormLabel>
                <Input
                  id="quantity"
                  placeholder="Enter material quantity"
                  value={editedMaterial.totalQuantity}
                  onChange={(e) =>
                    setEditedMaterial({
                      ...editedMaterial,
                      quantity: e.target.value,
                    })
                  }
                  isDisabled
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Threshold</FormLabel>
                <Input
                  id="threshold"
                  placeholder="Enter material threshold"
                  value={editedMaterial.threshold}
                  onChange={(e) =>
                    setEditedMaterial({
                      ...editedMaterial,
                      threshold: e.target.value,
                    })
                  }
                />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Update
            </Button>
            <Button onClick={onEditModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box bg={bg} minH="100vh" pt={10} pb={4} maxW="4xl" mx="auto">
        <Text fontSize="2xl" fontWeight="medium">
          Materials in Stock
        </Text>
        <Box mt={2} overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Image</Th>

                <Th>Name</Th>
                <Th>Category</Th>
                <Th>Quantity</Th>
                {isEditing && (
                  <>
                    <Th>Select</Th>
                    <Th>{operation}</Th>
                  </>
                )}
              </Tr>
            </Thead>
            <Tbody>
              {rowsToShow.map((data, index) => (
                <Tr key={index} bg={bg}>
                  <Td>{index + 1}</Td>
                  <Td className="w-36 h-20">
                    <img
                      src={`http://127.0.0.1:3000/public/img/materials/${data.image}`}
                      alt={data.name}
                      className="w-full h-full object-cover"
                    />
                  </Td>

                  <Td>{data.name}</Td>
                  <Td>{data.category}</Td>
                  <Td>{data.totalQuantity}</Td>
                  <Td>
                    <EditIcon
                      color="blue.500"
                      onClick={() => {
                        setEditedMaterial(data);
                        onEditModalOpen();
                      }}
                    />
                  </Td>
                  {isEditing && (
                    <>
                      <Td>
                        <Checkbox
                          id={data._id}
                          borderColor={borderColor}
                          onChange={(e) => handleCheckboxChange(e, data._id)}
                        />
                      </Td>

                      {checkedMaterials.includes(data._id.toString()) && (
                        <Td>
                          <Input
                            type="number"
                            min="0"
                            w={20}
                            onChange={(e) => handleQuantityChange(e, data._id)}
                            borderColor={borderColor}
                            value={getQuantityValue(data._id)}
                          />
                        </Td>
                      )}
                    </>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <HStack justify="space-between" mt={2} px={1}>
          <Text>
            Showing {currentPage === 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
            {currentPage === totalPage - 1
              ? materialList?.length
              : (currentPage + 1) * rowsLimit}{" "}
            of {materialList?.length} entries
          </Text>
          <HStack spacing={2}>
            <Button
              onClick={previousPage}
              isDisabled={currentPage === 0}
              variant="outline"
            >
              Previous
            </Button>
            {Array.from({ length: totalPage }).map((_, index) => (
              <Button
                key={index}
                onClick={() => changePage(index)}
                variant={currentPage === index ? "solid" : "outline"}
                colorScheme={currentPage === index ? "blue" : "gray"}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              onClick={nextPage}
              isDisabled={currentPage === totalPage - 1}
              variant="outline"
            >
              Next
            </Button>
          </HStack>

          {isEditing && (
            <>
              {AddMaterialbackenderror ? (
                <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full">
                  {AddMaterialbackenderror}
                </p>
              ) : (
                <div className="flex">
                  <Button
                    colorScheme="blue"
                    onClick={() => {
                      if (operation === "Add") {
                        handleAddMaterials();
                      } else if (operation === "Withdraw") {
                        handleWithdrawMaterials();
                      }
                    }}
                    disabled={AddMaterialLoading}
                  >
                    {AddMaterialLoading ? (
                      <PulseLoader color="#FFFFFF" />
                    ) : (
                      `Confirm ${operation}`
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </HStack>
      </Box>
    </SidebarWithHeader>
  );
};

export default Materials;
