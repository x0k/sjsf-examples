<script lang="ts">
  import { type Schema, type UiSchemaRoot, SimpleForm } from "@sjsf/form";

  import { useCustomForm } from "$lib/custom-form";

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

  const form = useCustomForm({
    schema,
    uiSchema,
    onSubmit: console.log,
    onSubmitError: makeTabbedFocusOnFirstError(tabsCtx),
  });
</script>

<SimpleForm
  {form}
  novalidate
  style="display: flex; flex-direction: column; gap: 1rem;"
/>
