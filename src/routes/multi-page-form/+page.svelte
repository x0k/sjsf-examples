<script lang="ts">
  import {
    type Schema,
    type UiSchemaRoot,
    BasicForm,
  } from "@sjsf/form";
  import type { ErrorObject } from 'ajv';

  import { createMyForm } from "$lib/my-form";

  import {
    createTabsContext,
    setTabsContext,
    makeTabbedFocusOnFirstError,
    TabsLayout,
  } from "./tabs";

  const schema: Schema = {
    title: "Multi page form",
    type: "array",
    items: [
      {
        title: "First",
        type: "object",
        properties: {
          label: {
            type: "string",
            title: "Label",
          },
        },
        required: ["label"],
      },
      {
        title: "Second",
        type: "object",
        properties: {
          otherField: {
            type: "string",
            title: "Other Label",
            minLength: 3,
          },
        },
        required: ["otherField"],
      },
    ],
  };

  const uiSchema: UiSchemaRoot = {
    "ui:components": {
      layout: TabsLayout,
    },
    items: {
      "ui:options": {
        hideTitle: true,
      },
      "ui:components": {
        layout: TabsLayout,
      },
    },
  };

  const tabsCtx = createTabsContext(0);
  setTabsContext(tabsCtx);

  const form = createMyForm({
    schema,
    uiSchema,
    onSubmit: console.log,
    onSubmitError: makeTabbedFocusOnFirstError<ErrorObject>(tabsCtx),
  });
</script>

<BasicForm {form} novalidate />
