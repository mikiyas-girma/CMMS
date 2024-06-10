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
import { HiOutlineXMark } from "react-icons/hi2";

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
  Image
} from "@chakra-ui/react";

import SidebarWithHeader from "../components/sidebar/SidebarWithHeader";
import { PulseLoader } from "react-spinners";
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
import { registerMaterial } from "../utils/material";
import { getMaterials } from "../utils/material";

const Materials = () => {
  const bg = useColorModeValue("#F4F9E9", "gray.800");
  const text = useColorModeValue("gray.900", "white");
  const { colorMode } = useColorMode();
  const borderColor = colorMode === "light" ? "gray.800" : "gray.600";

  const [materialList, setMaterialList] = useState([]);
  const [rowsLimit] = useState(6);
  const [rowsToShow, setRowsToShow] = useState(
    materialList.slice(0, rowsLimit)
  );
  const [totalPage, settotalPage] = useState(Math.ceil(materialList.length / rowsLimit));
  const [currentPage, setCurrentPage] = useState(0);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [operation, setOperation] = useState("");
  const [checkedMaterials, setCheckedMaterials] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [image, setImage] = useState("");
  const [backenderror, setBakendError] = useState("");
  const [Loading, setLoading] = useState("");

  useEffect(() => {
    const totalPages = Math.ceil(materialList.length / rowsLimit);
    settotalPage(totalPages);

    if (currentPage >= totalPages) {
        setCurrentPage(totalPages - 1);
        changePage(totalPages - 1);
        }
  }, [materialList, rowsLimit]);

  const nextPage = () => {
    if (currentPage < totalPage - 1) {
      const startIndex = (currentPage + 1) * rowsLimit;
      const endIndex = startIndex + rowsLimit;
      setRowsToShow(materialList.slice(startIndex, endIndex));
      setCurrentPage(currentPage + 1);
    }
  };

  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    setRowsToShow(materialList.slice(startIndex, endIndex));
    setCurrentPage(value);
  };

  const previousPage = () => {
    if (currentPage > 0) {
      const startIndex = (currentPage - 1) * rowsLimit;
      const endIndex = startIndex + rowsLimit;
      setRowsToShow(materialList.slice(startIndex, endIndex));
      setCurrentPage(currentPage - 1);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
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
    const response = await registerMaterial(name, category, image, quantity);
    setLoading(false);
    if (response?.data?.status === "success") {
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
    // materialList.push(newProduct);

    // const totalPage = Math.ceil(materialList.length / rowsLimit);

    // setRowsToShow([...rowsToShow, newProduct]);
    // setIsOpen(false);
  };

  const handleCheckboxChange = (e, id) => {
    setCheckedMaterials((prevState) => ({
      ...prevState,
      [id]: e.target.checked,
    }));
  };

  const handleQuantityChange = (e, id) => {
    setInputValues((prevState) => ({
      ...prevState,
      [id]: e.target.value,
    }));
  };

  const handleAddMaterials = () => {
    const updatedMaterialsList = [...materialslist];
    // Loop over the inputValues object
    for (let id in inputValues) {
      // If the material is checked
      if (checkedMaterials[id]) {
        // Add the input value to the total quantity of the material
        let material = updatedMaterialsList.find(
          (material) => material.id === Number(id)
        );
        material.Quantity += Number(inputValues[id]);
      }
    }

    // Update the materialslist state
    setMaterialList(updatedMaterialsList);

    // Reset the inputValues and checkedMaterials states
    setInputValues({});
    setCheckedMaterials({});
  };

  const handleWithdrawMaterials = () => {
    const updatedMaterialsList = [...materialslist];

    // Loop over the inputValues object
    for (let id in inputValues) {
      // If the material is checked
      if (checkedMaterials[id]) {
        // Subtract the input value from the total quantity of the material
        let material = updatedMaterialsList.find(
          (material) => material.id === Number(id)
        );
        material.Quantity -= Number(inputValues[id]);
      }
    }

    // Update the materialslist state
    setMaterialList(updatedMaterialsList);

    // Reset the inputValues and checkedMaterials states
    setInputValues({});
    setCheckedMaterials({});
  };

  useEffect(() => {
    console.log("Material List Updated");
    console.log(materialList);
  }, [materialList]);

  useEffect(() => {
    const fetchMaterials = async () => {
      const { data, error } = await getMaterials();
      if (data && data.status === "success") {
        console.log("my datas : ", data.data.materials);
        const materials = data.data.materials;
        setMaterialList(materials);
        setRowsToShow(materials.slice(0, rowsLimit));
      }
      if (error) {
        console.log("error", error);
      }
    };
    fetchMaterials();
  }, [rowsLimit]);

  const { role } = getUserAuthStatus();
  if (role === "admin") return null;

  return (
    <SidebarWithHeader>
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

      <Box bg={bg} minH="100vh" pt={10} pb={4} maxW="4xl" mx="auto">
        <Text fontSize="2xl" fontWeight="medium">
          Materials in Stock
        </Text>
        <Box mt={2} overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>image</Th>

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
              {rowsToShow.map((material) => (
                <Tr key={material._id} bg={bg}>
                  <Td><Image src={material.image}></Image></Td>
                  <Td>{material.name}</Td>
                  <Td>{material.category}</Td>
                  <Td>{material.totalQuantity}</Td>
                  {isEditing && (
                    <>
                      <Td>
                        <Checkbox
                          id={material._id}
                          borderColor={borderColor}
                          onChange={(e) =>
                            handleCheckboxChange(e, material._id)
                          }
                          isChecked={checkedMaterials[material._id] || false}
                        />
                      </Td>
                      {checkedMaterials[material._id] && (
                        <Td>
                          <Input
                            type="number"
                            min="0"
                            w={20}
                            onChange={(e) =>
                              handleQuantityChange(e, material._id)
                            }
                            borderColor={borderColor}
                            value={inputValues[material._id] || ""}
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
              ? materialList.length
              : (currentPage + 1) * rowsLimit}{" "}
            of {materialList.length} entries
          </Text>
          <HStack spacing={2}>
            <Button
              onClick={previousPage}
              isDisabled={currentPage === 0}
              variant="outline"
            >
              Previous
            </Button>
            <Text>Page {currentPage + 1} of {totalPage}</Text>
            <Button
              onClick={nextPage}
              isDisabled={currentPage >= totalPage - 1}
              variant="outline"
            >
              Next
            </Button>
          </HStack>
          {isEditing && (
            <Button
              colorScheme="blue"
              onClick={() => {
                if (operation === "Add") {
                  handleAddMaterials();
                } else {
                  handleWithdrawMaterials();
                }
              }}
            >
              Confirm {operation}
            </Button>
          )}
        </HStack>
      </Box>
    </SidebarWithHeader>
  );
};

export default Materials;
