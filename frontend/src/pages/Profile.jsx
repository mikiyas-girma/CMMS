import React from 'react'
import SidebarWithHeader from '../components/sidebar/SidebarWithHeader'
import General from '../components/Profile/General'
import Info from '../components/Profile/Info'
import PasswordChange from '../components/Profile/PasswordChange'
import { Grid, GridItem } from '@chakra-ui/react'

const Profile = () => {
  return (
    
        <SidebarWithHeader>
            
                <Grid
                marginLeft='100px'
                padding='0px'
                h='200px'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 2fr)'
                gap={4}
                >
                <GridItem colSpan={4}  ><General/></GridItem>
                <GridItem colSpan={2}  ><Info/></GridItem>
                <GridItem colSpan={2}  ><PasswordChange/></GridItem>
             </Grid> 
           
       </SidebarWithHeader>
       
  
  )
}

export default Profile