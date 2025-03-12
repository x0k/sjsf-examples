<script lang="ts">
  import {
    pathToId,
    BasicForm,
    type Schema,
    type SchemaValue,
    type UiSchemaRoot,
    type ValidationError,
    type FormValueValidatorError,
    type FormValueValidator,
  } from "@sjsf/form";
  import { createFormValidator } from "@sjsf/ajv8-validator";
  import type { ErrorObject } from "ajv";

  import { createMyForm } from "$lib/my-form";

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
    pass1: { "ui:options": { text: { type: "password" } } },
    pass2: { "ui:options": { text: { type: "password" } } },
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
          instanceId: pathToId(["pass2"]),
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

  function createCustomValidator<V extends FormValueValidator<ErrorObject>>(
    v: V
  ) {
    return {
      ...v,
      validateFormValue(rootSchema, formValue) {
        const errors: ValidationError<
          FormValueValidatorError<V> | CustomError
        >[] = transformErrors(v.validateFormValue(rootSchema, formValue));
        return errors.concat(customValidate(formValue));
      },
    } satisfies FormValueValidator<FormValueValidatorError<V> | CustomError>;
  }

  const validator = createCustomValidator(createFormValidator());

  const form = createMyForm({
    schema,
    uiSchema,
    validator,
    onSubmit: console.log,
  });
</script>

<BasicForm {form} novalidate />
