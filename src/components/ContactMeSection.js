import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
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

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "",
      comment: "",
    },
    onSubmit: (values) => {
      submit(values);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required(),
      email: Yup.string().required(),
      type: Yup.string().required(),
      comment: Yup.string().required(),
    }),
  });
//HERE
const [message, setMessage] = useState("");
const [type, setType] = useState("");

const fetchData = async() => {
  const dataMessage = await response.message;
  const dataType= await response.type;
  setMessage(dataMessage);
  setType(dataType);

}
  useEffect(() => {
    fetchData();
  }, [response]);

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
              formik.handleSubmit();
            }}
          >
            <VStack spacing={4}>
              <FormControl isInvalid={!formik.values.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  {...formik.getFieldProps("firstName")}
                />
                {formik.values.firstName ? (
                  <FormHelperText color="grey">
                    Enter your first name.
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!formik.values.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  {...formik.getFieldProps("email")}
                />
                {formik.values.email ? (
                  <FormHelperText color="grey">
                    Enter the email you'd like to be reached on.
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select
                  id="type"
                  name="type"
                  onChange={formik.handleChange}
                  value={formik.values.type}
                  {...formik.getFieldProps("type")}
                >
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={!formik.values.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  onChange={formik.handleChange}
                  value={formik.values.comment}
                  {...formik.getFieldProps("comment")}
                />
                {formik.values.comment ? (
                  <FormHelperText color="grey">
                    Provide details of your enquiry.
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>Required.</FormErrorMessage>
                )}
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full">
                {isLoading ? "Loading" : "Submit"}
                
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
