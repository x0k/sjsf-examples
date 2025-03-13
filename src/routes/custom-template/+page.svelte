<script lang="ts">
  import { overrideByRecord } from "@sjsf/form/lib/resolver";
  import { BasicForm, type Schema } from "@sjsf/form";

  import { theme } from "$lib/theme";
  import { createMyForm } from "$lib/my-form";

  import CustomFieldTemplate from "./custom-field-template.svelte";

  const schema: Schema = {
    title: "Contextualized errors",
    type: "object",
    properties: {
      firstName: {
        type: "string",
        title: "First name",
        minLength: 8,
      },
      active: {
        type: "boolean",
        title: "Active",
      },
      skills: {
        type: "array",
        items: {
          type: "string",
          minLength: 5,
        },
        minItems: 4,
      },
      multipleChoicesList: {
        type: "array",
        title: "Pick max two items",
        uniqueItems: true,
        maxItems: 2,
        items: {
          type: "string",
          enum: ["foo", "bar", "fuzz"],
        },
      },
    },
  };

  const initialValue = {
    firstName: "Chuck",
    active: "wrong",
    skills: ["karate", "budo", "aikido"],
    multipleChoicesList: ["foo", "bar", "fuzz"],
  };

  const form = createMyForm({
    schema,
    initialValue,
    theme: overrideByRecord(theme, {
      fieldTemplate: CustomFieldTemplate,
    }),
    onSubmit: console.log,
  });
</script>

<BasicForm {form} novalidate />
