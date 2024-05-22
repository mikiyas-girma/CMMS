import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import SidebarWithHeader from '../components/sidebar/SidebarWithHeader';


const AddMaterial = () => {
    const [materialName, setMaterialName] = useState('');
    const [materialCategory, setMaterialCategory] = useState('');
    const [materialQuantity, setMaterialQuantity] = useState('');
    const [materialImage, setMaterialImage] = useState(null);

    const handleAddMaterial = () => {
        // Add your logic here to handle adding the material
        console.log('Material added:', materialName, materialQuantity, materialPrice);
    };

    const handleMaterialImage = (e) => {
        const file = e.target.files[0];
        setMaterialImage(file);
    }

    return (
        <SidebarWithHeader>
        <Box p={4}>
            <VStack spacing={4} align="start">
                <FormControl>
                    <FormLabel>Material Name</FormLabel>
                    <Input
                        value={materialName}
                        onChange={(e) => setMaterialName(e.target.value)}
                        placeholder="Enter material name"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Material Category</FormLabel>
                    <Select
                        value={materialCategory}
                        onChange={(e) => setMaterialCategory(e.target.value)}
                        placeholder="Select material category"
                    >
                        <option value="category1">Category 1</option>
                        <option value="category2">Category 2</option>
                        <option value="category3">Category 3</option>
                    </Select>
                </FormControl>
                <FormControl>

                </FormControl>
                <FormControl>
                    <FormLabel>Material Image</FormLabel>
                    <Input type="file" accept="image/*" onChange={handleMaterialImage} />
                </FormControl>
                <FormControl>
                    <FormLabel>Material Quantity</FormLabel>
                    <Input
                        value={materialQuantity}
                        onChange={(e) => setMaterialQuantity(e.target.value)}
                        placeholder="Enter material quantity"
                    />
                </FormControl>
                <Button colorScheme="blue" onClick={handleAddMaterial}>
                    Add Material
                </Button>
            </VStack>
        </Box>
        </SidebarWithHeader>
    );
};

export default AddMaterial;
