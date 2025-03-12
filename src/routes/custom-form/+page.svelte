<script lang="ts">
  import type { Schema, UiSchemaRoot } from "@sjsf/form";

  import CustomForm from "$lib/my-form.svelte";

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
      text: {
        spellcheck: false,
        autocomplete: "off",
      },
      submitButton: {
        disabled: true,
      },
    },
    content: {
      "ui:components": {
        textWidget: "textareaWidget",
      },
    },
  };
</script>

<CustomForm {schema} {uiSchema} onSubmit={console.log} />
