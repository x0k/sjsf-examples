<script lang="ts">
  import type { Schema, UiSchemaRoot } from "@sjsf/form";

  import { createCustomForm } from "$lib/custom-form";

  import MySimpleForm from "./my-simple-form.svelte";

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

  const form = createCustomForm({
    schema,
    uiSchema,
    onSubmit: console.log,
  });

  let formElement = $state<HTMLFormElement>();
</script>

<MySimpleForm bind:formElement {form} />
<button onclick={() => formElement?.requestSubmit()}> Submit </button>
