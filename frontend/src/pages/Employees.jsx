import React, { useState } from 'react'
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { chakra, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
const employees = [
    { id: Math.floor(Math.random() * 1000), name: 'Biniam', role: 'store-keeper', date: '11 / 22 / 22' },
    { id: Math.floor(Math.random() * 1000), name: 'Mikias', role: 'store-keeper', date: '11 / 22 / 22' },
    { id: Math.floor(Math.random() * 1000), name: 'Jibrel', role: 'store-keeper', date: '11 / 22 / 22' },
    { id: Math.floor(Math.random() * 1000), name: 'Nani', role: 'store-keeper', date: '11 / 22 / 22' },
]

const Employees = () => {
    const [task, setTask] = useState("")
    //  const [employ, setEmploy] = useState(employees);
    const handleSubmit = (e) => {
        e.preventDefault();
        const Employes = {
            id: Math.floor(Math.random() * 1000),
            name: task,
            role: task
        }
        setTask(console.log(Employes))

    }


    const handleDelete = (id) => {
        console.log(employ.filter(e => e.id !== id))
        setEmploy(employ.filter(e => e.id !== id));
    }

    return (
        <div>
            < div >
                <section>
                    <form onSubmit={handleSubmit} >
                        <label htmlFor='name'>Employee Name</label>
                        <input type='text' name='name' id='name' onChange={(e) => setTask(e.target.value)} /><br></br>
                        <label htmlFor='role'>Role</label>
                        <input type='text' name='role' id='employee' onChange={(e) => setTask(e.target.value)} /><br></br>
                        <button color='blue' type='submit'>Submit</button>
                    </form>
                </section>
            </div >
            <div>
                <TableContainer>
                    <Table variant='simple' >
                        <Thead>
                            <Tr>
                                <Th>Employee Name</Th>
                                <Th>Role</Th>
                                <Th >Date</Th>
                            </Tr>
                        </Thead>
                        <Tbody >
                            {employees.map((emple) => (
                                <tr key={emple.id}>
                                    <Td>{emple.name}</Td>
                                    <Td>{emple.role}</Td>
                                    <Td >{emple.date}</Td>
                                    <Td><EditIcon color="blue" cursor='pointer' onClick={() => handleEdit(todo.id)}>Edit</EditIcon></Td>
                                    <td><button color="red" cursor='pointer' onClick={() => handleDelete(emple.id)}>Delete</button></td>
                                </tr>))}

                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default Employees