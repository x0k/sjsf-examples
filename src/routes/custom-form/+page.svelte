<script lang="ts">
  import type { Schema, UiSchemaRoot } from "@sjsf/form";

  import CustomForm from "$lib/custom-form.svelte";

  const schema: Schema = {
    type: "object",
    properties: {
      title: {
        type: "string",
      },
      content: {
        type: "string",
      },
    },
  };

  const uiSchema: UiSchemaRoot = {
    "ui:globalOptions": {
      hideTitle: true,
      input: {
        spellcheck: false,
        autocomplete: "off",
      },
    },
    submitButton: {
      "ui:options": {
        input: {
          disabled: true,
        },
      },
    },
    content: {
      "ui:widget": "textarea",
    },
  };
</script>

<CustomForm {schema} {uiSchema} onSubmit={console.log} />
