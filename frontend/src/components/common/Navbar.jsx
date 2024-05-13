import React from 'react'
import Employees from '../../pages/Employees';
import { Link } from 'react-router-dom';
import { HStack, Image, chakra, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text, Button, useColorMode } from '@chakra-ui/react'
import logo from '../common/google-play-games.png'

const Navbar = () => {
  return (
    <HStack justifyContent='space-between' bg='tomato'>
        <Image src={logo} boxSize='50px' margin='10px'/>
        <HStack>
             <Breadcrumb separator='' spacing={8} marginRight='30px' fontSize='lg' color='white' lineHeight= '110%' >
               <BreadcrumbItem>
                 <BreadcrumbLink href=''>Home</BreadcrumbLink>
               </BreadcrumbItem>
               <BreadcrumbItem>
                 <BreadcrumbLink href=''>About</BreadcrumbLink>
               </BreadcrumbItem>
               <BreadcrumbItem >
                 <BreadcrumbLink href=''>Materials</BreadcrumbLink>
                </BreadcrumbItem>
          <BreadcrumbItem >
            <Link to='/Employees'>Employee</Link>
          </BreadcrumbItem>
          <BreadcrumbItem >
            <BreadcrumbLink href='#'>Notification</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        </HStack>
        
    </HStack>
  )
}

export default Navbar