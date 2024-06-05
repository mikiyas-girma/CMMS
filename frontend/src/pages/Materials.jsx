import { useState, useMemo } from "react";
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
} from "@chakra-ui/react";
import SidebarWithHeader from "../components/sidebar/SidebarWithHeader";
import { getUserAuthStatus } from "../utils/login";
import {
    handleBlurName,
    handleBlurCategory,
    handleBlurQuantity,
 } from "../utils/validateMaterial";

const materials = [
  {
    id: 1,
    Name: "Cement",
    Category: "Building Materials",
    Quantity: 999,
  },
  {
    id: 4,
    Name: "Paint",
    Category: "Building Materials",
    Quantity: 999,
  },
  {
    id: 8,
    Name: "Windows",
    Category: "Building Materials",
    Quantity: 999,
  },
  {
    id: 9,
    Name: "Doors",
    Category: "Building Materials",
    Quantity: 999,
  },
  {
    id: 10,
    Name: "Ceramic",
    Category: "Building Materials",
    Quantity: 999,
  },
  {
    id: 11,
    Name: "Steel",
    Category: "Building Materials",
    Quantity: 999,
  },
  {
    id: 12,
    Name: "Bricks",
    Category: "Building Materials",
    Quantity: 999,
  },
  {
    id: 14,
    Name: "Pipes",
    Category: "Building Materials",
    Quantity: 999,
  },
  {
    id: 16,
    Name: "Wood",
    Category: "Building Materials",
    Quantity: 999,
  },
  {
    id: 18,
    Name: "Plaster",
    Category: "Building Materials",
    Quantity: 999,
  },
];

const Materials = () => {
  const bg = useColorModeValue("white", "gray.800");
  const text = useColorModeValue("gray.900", "white");

  const [materialList] = useState(materials);
  const [rowsLimit] = useState(5);
  const [rowsToShow, setRowsToShow] = useState(
    materialList.slice(0, rowsLimit)
  );
  const [totalPage] = useState(Math.ceil(materialList.length / rowsLimit));
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    const startIndex = rowsLimit * (currentPage + 1);
    const endIndex = startIndex + rowsLimit;
    setRowsToShow(materials.slice(startIndex, endIndex));
    setCurrentPage(currentPage + 1);
  };

  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    setRowsToShow(materials.slice(startIndex, endIndex));
    setCurrentPage(value);
  };

  const previousPage = () => {
    const startIndex = (currentPage - 1) * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    setRowsToShow(materials.slice(startIndex, endIndex));
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 0);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const onWithdrawOpen = () => {
    setIsWithdrawOpen(true);
  };

  const onWithdrawClose = () => {
    setIsWithdrawOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onAddOpen = () => {
    setIsAddOpen(true);
  };

  const onAddClose = () => {
    setIsAddOpen(false);
  };

  const handleNewMaterial = () => {

    const newProduct = {
      id: materialList.length + 1,
      Name: document.getElementById("name").value,
      Category: document.getElementById("category").value,
      Quantity: parseInt(document.getElementById("quantity").value),
    };
    materialList.push(newProduct);

    const totalPage = Math.ceil(materialList.length / rowsLimit);

    setRowsToShow([...rowsToShow, newProduct]);
    setIsOpen(false);
  };

  const handleAddMaterial = () => {
    const addMaterial = document.getElementById("addMaterial").value;
    const addQuantity = parseInt(document.getElementById("addQuantity").value);
    const materialIndex = materialList.findIndex(
      (material) => material.Name === addMaterial
    );
    const updatedMaterial = { ...materialList[materialIndex] };
    updatedMaterial.Quantity += addQuantity;
    materialList[materialIndex] = updatedMaterial;
    setRowsToShow([
      ...materialList.slice(
        currentPage * rowsLimit,
        (currentPage + 1) * rowsLimit
      ),
    ]);
    setIsWithdrawOpen(false);
  };

  const handleWithdrawMaterial = () => {
    const withdrawMaterial = document.getElementById("withdrawMaterial").value;
    const withdrawQuantity = parseInt(
      document.getElementById("withdrawQuantity").value
    );
    const materialIndex = materialList.findIndex(
      (material) => material.Name === withdrawMaterial
    );
    const updatedMaterial = { ...materialList[materialIndex] };
    updatedMaterial.Quantity -= withdrawQuantity;
    materialList[materialIndex] = updatedMaterial;
    setRowsToShow([
      ...materialList.slice(
        currentPage * rowsLimit,
        (currentPage + 1) * rowsLimit
      ),
    ]);
    setIsWithdrawOpen(false);
  };
  const { role } = getUserAuthStatus();
  if (role === "admin") return null;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [quantityError, setQuantityError] = useState("");


  return (
    <SidebarWithHeader>
      <HStack justify="end" mt={4} px={4}>
        <Button onClick={onOpen} colorScheme="blue">
          New Material
        </Button>
        <Button onClick={onAddOpen} colorScheme="yellow">
          Add Material
        </Button>
        <Button onClick={onWithdrawOpen} colorScheme="red">
          Withdraw Material
        </Button>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Material</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input id="name"
                placeholder="Enter material name"
                value={name}
                onChange={(e) => {
                    console.log(e.target.value);
                    setName(e.target.value)}
                }
                onBlur={(e) => handleBlurName(e, setNameError)}
              />
              {nameError && <p className="text-red-700 p-2 rounded w-full">{nameError}</p>}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Input id="category"
                placeholder="Enter material category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                onBlur={(e) => handleBlurCategory(e, setCategoryError)}
              />
                {categoryError && <p className="text-red-700 p-2 rounded w-full">{categoryError}</p>}
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
                {quantityError && <p className="text-red-700 p-2 rounded w-full">{quantityError}</p>}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleNewMaterial}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isWithdrawOpen} onClose={onWithdrawClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Withdraw Material</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Material</FormLabel>
              <Select id="withdrawMaterial" placeholder="Select material">
                {materialList.map((material) => (
                  <option key={material.id} value={material.Name}>
                    {material.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Quantity</FormLabel>
              <Input id="withdrawQuantity" placeholder="Enter quantity" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleWithdrawMaterial}>
              Withdraw
            </Button>
            <Button onClick={onWithdrawClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isAddOpen} onClose={onAddClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Increment Material Quantity</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Material</FormLabel>
              <Select id="addMaterial" placeholder="Select material">
                {materialList.map((material) => (
                  <option key={material.id} value={material.Name}>
                    {material.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Quantity</FormLabel>
              <Input id="addQuantity" placeholder="Enter quantity" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="yellow" mr={3} onClick={handleAddMaterial}>
              Add
            </Button>
            <Button onClick={onAddClose}>Cancel</Button>
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
                <Th>Name</Th>
                <Th>Category</Th>
                <Th>Quantity</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rowsToShow.map((data, index) => (
                <Tr key={index} bg={bg}>
                  <Td>{data.id}</Td>
                  <Td>{data.Name}</Td>
                  <Td>{data.Category}</Td>
                  <Td>{data.Quantity}</Td>
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
        </HStack>
      </Box>
    </SidebarWithHeader>
  );
};

export default Materials;
