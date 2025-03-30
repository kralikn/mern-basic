import { IconButton, Dialog, Portal, Button, CloseButton, VStack, Input } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster"
import { MdModeEditOutline } from "react-icons/md";
import { useState } from "react";
import { useProductStore } from "@/store/product";


const EditProductDialog = ({ product }) => {

    const [updatedProduct, setUpdatedProduct] = useState(product);

    const { updateProduct } = useProductStore();

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
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
                description: "Product updated successfully",
                type: "success",
                duration: 3000
            })
        }
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <IconButton colorPalette={"cyan"}>
                    <MdModeEditOutline />
                </IconButton>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Update Product</Dialog.Title>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Header>
                        <Dialog.Body>
                            <VStack spacing={4}>
                                <Input
                                    placeholder='Product Name'
                                    name='name'
                                    value={updatedProduct.name}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                                />
                                <Input
                                    placeholder='Price'
                                    name='price'
                                    type='number'
                                    value={updatedProduct.price}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                                />
                                <Input
                                    placeholder='Image URL'
                                    name='image'
                                    value={updatedProduct.image}
                                    onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                                />
                            </VStack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button
                                    colorScheme='blue'
                                    mr={3}
                                    onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                                >
                                    Update
                                </Button>
                            </Dialog.ActionTrigger>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}
export default EditProductDialog
