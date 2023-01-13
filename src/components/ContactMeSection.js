import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const fetchData = () => {
    fetch(response)
      .then(() => onOpen(response.type, response.message));
  };
  useEffect(() => {
    fetchData();
    console.log(response);
    console.log(onOpen);
  }, [response]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "",
      comment: "",
    },
    onSubmit: async (values, actions) => {
      submit(values.type, values);
      //STILL BROKEN
      
      //RESET
      response.type === "success" && actions.resetForm();
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(),
      email: Yup.string().required(),
      type: Yup.string().required(),
      comment: Yup.string().required(),
    }),
  });

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
          >
            <VStack spacing={4}>
              <FormControl
                isInvalid={formik.errors.firstName && formik.touched.firstName}
              >
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  {...formik.getFieldProps("firstName")}
                />
                <FormErrorMessage>Required.</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={formik.errors.email && formik.touched.email}
              >
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  {...formik.getFieldProps("email")}
                />
                <FormErrorMessage>Required.</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={formik.errors.type && formik.touched.type}
              >
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select
                  id="type"
                  name="type"
                  value={formik.values.type}
                  {...formik.getFieldProps("type")}
                >
                  <option style={{ color: "black" }} value="hireMe">
                    Freelance project proposal
                  </option>
                  <option style={{ color: "black" }} value="openSource">
                    Open source consultancy session
                  </option>
                  <option style={{ color: "black" }} value="other">
                    Other
                  </option>
                </Select>
                <FormErrorMessage>Required.</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={formik.errors.comment && formik.touched.comment}
              >
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  value={formik.values.comment}
                  {...formik.getFieldProps("comment")}
                />
                <FormErrorMessage>Required.</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full">
                {isLoading ? (
                  <FontAwesomeIcon icon={faSync} className="fa-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
