import {
  Button,
  Container,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  useAddContactMutation,
  useDeleteContactMutation,
  useGetAllContactQuery,
  usePrefetch,
  useUpdateContactMutation,
} from "../slices/api/ContactSliceApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ContactList = () => {
  // polling Interval is used for how much time after data refetch auto (it is in milliSecond)
  const { data, isSuccess, isLoading, refetch } = useGetAllContactQuery("", {
    // pollingInterval: 1000,
  });
  const navigate = useNavigate();
  const prefetch = usePrefetch("getAllContact");
  const [addContact] = useAddContactMutation();
  const [deleteContact] = useDeleteContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const onAddContactHandler = async () => {
    const contact = {
      name: Math.random().toString(36).substring(2, 7),
      id: Math.random().toString(36).substring(2, 10),
      language: "urdu",
    };
    await addContact(contact);
    refetch();
  };
  const onDeleteHandler = async (id) => {
    await deleteContact(id)
      .unwrap()
      .then((payload) => console.log("fulfilled", payload))
      .catch((error) => console.error("rejected", error));
    refetch();
  };
  const onUpdateHandler = async (id) => {
    const contact = {
      name: Math.random().toString(36).substring(2, 7),
      language: "urdu",
      id,
    };
    await updateContact(contact);
    refetch();
  };
  const onPreFetchHandler = () => prefetch(undefined);
  // result is not showing because it is already fetch to check result visit contactDetail

  return (
    <Container h={"100%"} mt="10%">
      <TableContainer w={"100vw"}>
        <Table size="xxl">
          <Thead>
            <Tr>
              <Th>NO</Th>
              <Th>Name</Th>
              <Th>Language</Th>
              <Th>User ID</Th>
              <Th>Delete</Th>
              <Th>Update</Th>
            </Tr>
          </Thead>

          {isLoading && <h2>Loading.....</h2>}
          {isSuccess &&
            !isLoading &&
            data.map((item, index) => {
              return (
                <Tbody key={item.id}>
                  <Tr
                    onClick={() => {
                      navigate(`/contactDetail/${item.id}`);
                    }}
                  >
                    <Td>{index + 1}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.language}</Td>
                    <Td isNumeric>{item.id}</Td>
                    <Td>
                      <IconButton
                        colorScheme="red"
                        aria-label="Search database"
                        icon={<DeleteIcon />}
                        onClick={() => onDeleteHandler(item.id)}
                      />
                    </Td>
                    <Td>
                      <IconButton
                        colorScheme="blue"
                        aria-label="Search database"
                        icon={<EditIcon />}
                        onClick={() => onUpdateHandler(item.id)}
                      />
                    </Td>
                  </Tr>
                </Tbody>
              );
            })}
        </Table>
      </TableContainer>
      <Button onClick={onAddContactHandler}>Add Contact</Button>
      <Button onClick={onPreFetchHandler}>Pre-Fetch Handler</Button>
    </Container>
  );
};
