import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Container,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  useAddProductMutation,
  useGetAllProductsQuery,
} from "../slices/sliceApi";

export const ProductList = () => {
  const store = useSelector((state) => state.ProductsApi);
  console.error("store:", store);

  const { products } = useSelector((state) => state.productSlice);
  console.error("Products:", products);
  const { data, refetch } = useGetAllProductsQuery();
  const [addProduct] = useAddProductMutation();
  const product = {
    name: "Testing",
    description: "Testing",
    price: 34,
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    title: "iPhone 9",
  };
  const onAddHandler = async () => {
    await addProduct(product);
    refetch();
  };
  return (
    <Container>
      {products.map((item, index) => {
        return (
          <Card maxW="xl" key={index}>
            <CardBody>
              <Image
                src={item.thumbnail}
                alt="Green double couch with wooden legs"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">{item.title}</Heading>
                <Text>{item.description}</Text>
                <Text color="blue.600" fontSize="2xl">
                  ${item.price}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="blue">
                  Buy now
                </Button>
                <Button variant="ghost" colorScheme="blue">
                  Add to cart
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        );
      })}

      <Button onClick={onAddHandler}>Add Product</Button>
    </Container>
  );
};
