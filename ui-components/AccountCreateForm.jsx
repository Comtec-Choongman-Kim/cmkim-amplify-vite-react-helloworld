/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createAccount } from "./graphql/mutations";
const client = generateClient();
export default function AccountCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    account_name: "",
    account_id: "",
    description: "",
  };
  const [account_name, setAccount_name] = React.useState(
    initialValues.account_name
  );
  const [account_id, setAccount_id] = React.useState(initialValues.account_id);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setAccount_name(initialValues.account_name);
    setAccount_id(initialValues.account_id);
    setDescription(initialValues.description);
    setErrors({});
  };
  const validations = {
    account_name: [],
    account_id: [],
    description: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          account_name,
          account_id,
          description,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createAccount.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "AccountCreateForm")}
      {...rest}
    >
      <TextField
        label="Account name"
        isRequired={false}
        isReadOnly={false}
        value={account_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              account_name: value,
              account_id,
              description,
            };
            const result = onChange(modelFields);
            value = result?.account_name ?? value;
          }
          if (errors.account_name?.hasError) {
            runValidationTasks("account_name", value);
          }
          setAccount_name(value);
        }}
        onBlur={() => runValidationTasks("account_name", account_name)}
        errorMessage={errors.account_name?.errorMessage}
        hasError={errors.account_name?.hasError}
        {...getOverrideProps(overrides, "account_name")}
      ></TextField>
      <TextField
        label="Account id"
        isRequired={false}
        isReadOnly={false}
        value={account_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              account_name,
              account_id: value,
              description,
            };
            const result = onChange(modelFields);
            value = result?.account_id ?? value;
          }
          if (errors.account_id?.hasError) {
            runValidationTasks("account_id", value);
          }
          setAccount_id(value);
        }}
        onBlur={() => runValidationTasks("account_id", account_id)}
        errorMessage={errors.account_id?.errorMessage}
        hasError={errors.account_id?.hasError}
        {...getOverrideProps(overrides, "account_id")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              account_name,
              account_id,
              description: value,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
