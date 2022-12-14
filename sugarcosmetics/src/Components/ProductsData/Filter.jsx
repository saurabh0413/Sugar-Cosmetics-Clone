import React from "react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  VStack,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import AccordCompo from "./AccordCompo";
const Filter = () => {
  const data = [
    {
      productType: [
        "Product Type",
        "primers",
        "powder",
        "Translucent Powder",
        "compact",
        "Foundations & Concealers",
        "Face Foundation",
        "BB Cream",
        "stick",
        "palette",
        "Pressed Powder",
        "value sets",
        "",
      ],
    },
    {
      productType: [
        "Feature",
        "primer",
        "Translucent Powder",
        "Face Foundation",
        "stick",
        "",
      ],
    },
    {
      productType: [
        "Formulation",
        "cream",
        "Loose Powder",
        "Pressed Powder",
        "stick",
        "Liquid",
      ],
    },
    {
      productType: [
        "Concern",
        "Brightening",
        "oil control",
        "under eye",
        "Blurring",
      ],
    },
  ];
  const [searchParams, setSearchParams] = useSearchParams();
  const initialGenreparams = searchParams.getAll("type");
  const initialSortparams = searchParams.get("sortBy");
  const [category, setCategory] = useState(initialGenreparams || []);

  const [sortBy, setSortBy] = useState(initialSortparams || "");
  const handleChange = (e) => {
    const checkedData = e.target.value;
    const new_category = [...category];

    if (category.includes(checkedData)) {
      new_category.splice(new_category.indexOf(checkedData), 1);
    } else {
      new_category.push(checkedData);
    }
    setCategory(new_category);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };
  useEffect(() => {
    if (category || sortBy) {
      const params = {};
      category && (params.type = category);
      sortBy && (params.sortBy = sortBy);
      setSearchParams(params);
    }
  }, [category, setSearchParams, sortBy]);
  return (
    <Box minW="200px" w="300px" border="1px solid red" >
      <Box   border="1px solid red">
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Sort By: Relevance
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <CheckboxGroup colorScheme="green">
                <VStack
                  spacing={[1, 5]}
                  direction={["column", "row"]}
                  align="flex-start"
                >
                  <input type="checkbox" />
                  <label>Relevance</label>
                  <input
                    type="radio"
                    value="asc"
                    onChange={handleSort}
                    name="sortBy"
                    defaultChecked={sortBy == "asc"}
                  />
                  <label>Ascending</label>
                  <input
                    type="radio"
                    value="desc"
                    onChange={handleSort}
                    name="sortBy"
                    defaultChecked={sortBy == "desc"}
                  />
                  <label>Descending</label>
                </VStack>
              </CheckboxGroup>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>

      <Box ml={10} >
        <Accordion allowToggle>
          {data.map((item) => {
            return (
              <AccordCompo
                item={item}
                handleChange={handleChange}
                category={category}
              />
            );
          })}
        </Accordion>
      </Box>
    </Box>
  );
};

export default Filter;
