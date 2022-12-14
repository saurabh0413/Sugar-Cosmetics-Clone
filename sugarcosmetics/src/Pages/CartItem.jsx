import {
  Box,
  CloseButton,
  Flex,
  Link,
  Select,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { CartProductMeta } from "./CartProductMeta";
import { useContext } from "react";
import { CartOne, updateCart } from "../context/cartContext";
const QuantitySelect = (props) => {
  return (
    <Select
      maxW="64px"
      aria-label="Select quantity"
      focusBorderColor={useColorModeValue("blue.500", "blue.200")}
      {...props}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </Select>
  );
};

export const CartItem = (props) => {
  const { updateCart, deleteCart } = useContext(CartOne);
  const {
    isGiftWrapping,
    name,
    description,
    quantity,
    images,
    currency,
    price,
    onChangeQuantity,
    onClickDelete,
    id,
  } = props;

  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta
        name={name}
        description={description}
        image={images[0]}
        isGiftWrapping={isGiftWrapping}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: "none",
          md: "flex",
        }}
      >
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value);
            updateCart(+e.currentTarget.value, id);
          }}
        />
        {/* <PriceTag price={price}  /> */}
        <Text>{price}</Text>
        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={() => deleteCart(id)}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: "flex",
          md: "none",
        }}
      >
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value);
            updateCart(+e.currentTarget.value, id);
          }}
        />
        <Text>{price}</Text>
      </Flex>
    </Flex>
  );
};
