<script lang="ts">
  import {
    RawForm,
    type Schema,
    type Template,
    type Templates,
    templates as defaultTemplates,
  } from "@sjsf/form";

  import { createCustomForm } from "$lib/custom-form";

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

  const templates: Templates = (type, config) => {
    if (type === "field") {
      return CustomFieldTemplate as Template<typeof type>;
    }
    return defaultTemplates(type, config);
  };

  const form = createCustomForm({
    schema,
    initialValue,
    templates,
    onSubmit: console.log,
  });
</script>

<RawForm {form} novalidate />
