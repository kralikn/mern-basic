import { useProductStore } from "@/store/product";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { useEffect } from "react";
import ProductCard from "@/components/ProductCard";


const HomePage = () => {

    const { fetchProducts, products } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    console.log("products", products);

    return (
        <Container py={12}>
            <VStack margin="8">
                <Text
                    textStyle="3xl"
                    fontWeight="semibold"
                >
                    Current Products 🚀
                </Text>
            </VStack>

            <SimpleGrid
                columns={{
                    base: 1,
                    md: 2,
                    lg: 3,
                }}
                gap="40px"
                w={"full"}
            >
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </SimpleGrid>

            {products.length === 0 && (
                <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
                    No products found 😢{" "}
                    <Link to={"/create"}>
                        <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                            Create a product
                        </Text>
                    </Link>
                </Text>
            )}

            <Toaster />

        </Container>
    )
}

export default HomePage