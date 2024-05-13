import React, { useRef, useState } from 'react'
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, FormControl, FormLabel, Input, Table, Tbody, Td, Th, Thead, Tr,Text, Tfoot } from '@chakra-ui/react';
const employees = [
    { id: Math.floor(Math.random() * 1000), name: 'Biniam', role: 'store-keeper', date: '11 / 22 / 22' },
    { id: Math.floor(Math.random() * 1000), name: 'Mikias', role: 'store-keeper', date: '11 / 22 / 22' },
    { id: Math.floor(Math.random() * 1000), name: 'Jibrel', role: 'store-keeper', date: '11 / 22 / 22' },
    { id: Math.floor(Math.random() * 1000), name: 'Nani', role: 'store-keeper', date: '11 / 22 / 22' },
]
const Stu = [
    { id: Math.floor(Math.random() * 1000), name: 'Biniam', role: 'store-keeper', date: '11 / 22 / 22' },
    { id: Math.floor(Math.random() * 1000), name: 'Mikias', role: 'store-keeper', date: '11 / 22 / 22' },
]

const Employees = () => {
    const [task, setTask] = useState("")
    const [employ, setEmploy] = useState(employees);
    const [Stud, setStud] = useState(Stu);
    const nameRef = useRef(null)
    const roleRef = useRef(null)
    const handleSubmit = (e) => {
        const date = new Date()
        e.preventDefault();
        const Employes = {
            id: Math.floor(Math.random() * 1000),
            name: nameRef.current.value,
            role: roleRef.current.value,
            date: `${date.toLocaleTimeString()}${date.toLocaleDateString()}`
        }
        console.log(Employes)

    }

    const handleDelete = (id) => {
        setEmploy(employ.filter((e) => e.id !== id))
        console.log(employ.filter((e) => e.id !== id))
    }

    return (
        <div>
            <section>
                <form onSubmit={handleSubmit} >
                    <FormControl padding='20px 20px' marginLeft='100px' >
                        <FormLabel htmlFor='name'>Employee Name</FormLabel>
                        <Input width='700px' ref={nameRef} type='text' name='name' id='name' value={task.name} onChange={(e) => setTask(e.target.value)} /><br></br>
                        <FormLabel htmlFor='role'>Role</FormLabel>
                        <Input width='700px' ref={roleRef} type='text' name='role' id='employee' value={task.role} onChange={(e) => setTask(e.target.value)} /><br></br>
                        <Button marginTop='20px'colorScheme='teal' variant='solid' type='submit'>Submit</Button>
                    </FormControl>
                </form>
            </section>

            <div>
                <Table marginLeft='100px' width='900px' marginBottom='100px'  >
                    <Thead>
                        <Tr >
                            <Th>Employee Name </Th>
                            <Th>Role</Th>
                            <Th >Date</Th>
                            <Th></Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody >
                        {employ.map((event) => (
                            <Tr key={event.id}>
                                <Td>{event.name}</Td>
                                <Td>{event.role}</Td>
                                <Td >{event.date}</Td>
                                <Td><Button colorScheme='blue' cursor='pointer' >Edit</Button></Td>
                                <Td><Button colorScheme='red' variant='solid' cursor='pointer' onClick={() => handleDelete(event.id)}>Delete</Button></Td>
                            </Tr>))}
                    </Tbody>
                    <Tfoot>
                        <Td>Total # of Employees</Td>
                        <Td>( {employ.length} )</Td>
                    </Tfoot>
                </Table>
            </div>
        </div>
    )
}

export default Employees