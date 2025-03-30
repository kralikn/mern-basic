import { useColorModeValue } from "./ui/color-mode";
import { Box, Heading, HStack, Image, Text, IconButton } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster"
import { useProductStore } from "@/store/product";
import { MdDeleteForever } from "react-icons/md";
import EditProductDialog from "./EditProductDialog";


const ProductCard = ({ product }) => {

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteProduct } = useProductStore();

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if (!success) {
            toaster.create({
                title: "Error",
                description: message,
                type: "error",
                duration: 3000
            })
        } else {
            toaster.create({
                title: "Success",
                description: message,
                type: "success",
                duration: 3000
            })
        }
    };

    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h="200px" w='full' fit='cover' />

            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    ${product.price}
                </Text>

                <HStack spacing={2}>
                    <EditProductDialog product={product} />
                    <IconButton
                        colorPalette={"red"}
                        onClick={() => handleDeleteProduct(product._id)}
                    >
                        <MdDeleteForever />
                    </IconButton>
                </HStack>
            </Box>
        </Box>
    );
};
export default ProductCard;