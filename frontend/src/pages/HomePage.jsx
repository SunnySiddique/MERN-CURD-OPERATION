import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/product";

const HomePage = () => {
  const { products, fetchProducts } = useProductStore();
  useEffect(() => {
    console.log(products);
    fetchProducts();
  }, [fetchProducts]);
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          Current Products 🚀
        </Text>
        {products.length > 0 ? (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={10}
            w="full"
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        ) : (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}
          >
            No products found 🥲
            <Text
              as="span"
              color={"blue.500"}
              _hover={{ textDecoration: "underline" }}
            >
              <Link to="/create">Create a Product</Link>
            </Text>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
