import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetContactQuery, usePrefetch } from "../slices/api/ContactSliceApi";
//
export const ContactDetail = () => {
  console.error("ContactDetail");
  const [skip, setSkip] = useState(false);
  const { id } = useParams();
  //   skip is used for condition data fetching
  const { data, isLoading } = useGetContactQuery(id, {
    skip,
  });
  setTimeout(() => {
    setSkip(true);
  }, 1000);
  const prefetch = usePrefetch("getAllContact");
  const onPreFetchHandler = () => {
    prefetch(undefined);
  };
  if (isLoading || !skip) {
    return (
      <Flex
        h="100vh"
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
      >
        <Spinner />
      </Flex>
    );
  }
  return (
    <Card>
      <CardHeader>
        <Heading size="md"> {data.name}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{data.bio}</Text>
      </CardBody>
      <CardFooter>
        <Button>View here</Button>
      </CardFooter>
      <Button onClick={onPreFetchHandler}>Pre-Fetch Handler</Button>
    </Card>
  );
};
