import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";


const General = () => {
  return (
    <div>
      <Card>
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Image
            marginLeft='30px'
            padding='15px'
            borderRadius='full'
            objectFit="cover"
            maxW={{ base: "100%", sm: "100px" }}
            src={
                      'https://imgur.com/ijpmXRn.jpg'
                    }
            alt="Caffe Latte"
          />
           
          <Stack>
            <CardBody>
              <Heading size="md">Mikias Girma</Heading>

              <Text py="2">Mikias12@gmain.com</Text>
            </CardBody>
          </Stack>
        </Card>
      </Card>
    </div>
  );
};

export default General;
