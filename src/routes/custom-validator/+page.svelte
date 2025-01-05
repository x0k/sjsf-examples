<script lang="ts">
  import {
    DEFAULT_ID_PREFIX,
    DEFAULT_ID_SEPARATOR,
    pathToId,
    SimpleForm,
    type FormValidator2,
    type Schema,
    type SchemaValue,
    type UiSchemaRoot,
    type ValidationError,
  } from "@sjsf/form";
  import { createValidator2, Validator } from "@sjsf/ajv8-validator";
  import type { ErrorObject } from "ajv";

  import { useCustomForm } from "$lib/custom-form";

  const schema: Schema = {
    title: "Custom validation",
    description:
      "This form defines custom validation rules checking that the two passwords match. There is also a custom validation message when submitting an age < 18, which can only be seen if HTML5 validation is turned off.",
    type: "object",
    properties: {
      pass1: {
        title: "Password",
        type: "string",
        minLength: 3,
      },
      pass2: {
        title: "Repeat password",
        type: "string",
        minLength: 3,
      },
      age: {
        title: "Age",
        type: "number",
        minimum: 18,
      },
    },
  };
  const uiSchema: UiSchemaRoot = {
    pass1: { "ui:options": { input: { type: "password" } } },
    pass2: { "ui:options": { input: { type: "password" } } },
  };

  class CustomError {}

  function customValidate(
    value: SchemaValue | undefined
  ): ValidationError<CustomError>[] {
    const { pass1, pass2 } = value as {
      pass1: string;
      pass2: string;
    };
    if (pass1 !== pass2) {
      return [
        {
          instanceId: pathToId(DEFAULT_ID_PREFIX, DEFAULT_ID_SEPARATOR, [
            "pass2",
          ]),
          propertyTitle: "Repeat password",
          message: "Passwords don't match.",
          error: new CustomError(),
        },
      ];
    }
    return [];
  }

  function transformErrors(
    errors: ValidationError<ErrorObject>[]
  ): ValidationError<ErrorObject>[] {
    return errors.map((error) => {
      if (
        error.error.keyword === "minimum" &&
        error.error.schemaPath === "#/properties/age/minimum"
      ) {
        return Object.assign({}, error, {
          message: "You need to be 18 because of some legal thing",
        });
      }
      return error;
    });
  }

  function createCustomValidator(
    validator: Validator
  ): FormValidator2<ErrorObject | CustomError> {
    return {
      isValid(schema, rootSchema, formData) {
        return validator.isValid(schema, rootSchema, formData);
      },
      reset() {
        validator.reset();
      },
      validateFieldData(field, fieldData) {
        // You can also customize this method to transform/add custom errors
        // during individual fields validation
        return validator.validateFieldData(field, fieldData);
      },
      validateFormData(rootSchema, formData) {
        const errors: ValidationError<ErrorObject | CustomError>[] =
          transformErrors(validator.validateFormData(rootSchema, formData));
        return errors.concat(customValidate(formData));
      },
    };
  }

  const validator = createCustomValidator(createValidator2());

  const form = useCustomForm({
    schema,
    uiSchema,
    validator,
    onSubmit: console.log,
  });
</script>

<SimpleForm {form} novalidate />
