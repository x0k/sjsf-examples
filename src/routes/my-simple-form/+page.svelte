<script lang="ts">
  import type { Schema, UiSchemaRoot } from "@sjsf/form";

  import { createMyForm } from "$lib/my-form";

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
      text: {
        spellcheck: false,
        autocomplete: "off",
      },
      submitButton: {
        disabled: true
      }
    },
    content: {
      "ui:components": {
        'textWidget': "textareaWidget"
      }
    },
  };

  const form = createMyForm({
    schema,
    uiSchema,
    onSubmit: console.log,
  });

  let formElement = $state<HTMLFormElement>();
</script>

<MySimpleForm bind:formElement {form} />
<button onclick={() => formElement?.requestSubmit()}> Submit </button>
