<script lang="ts" generics="T, E">
  import {
    type FormValidator2,
    type Schema,
    type UiSchemaRoot,
    FormContent,
    SubmitButton,
  } from "@sjsf/form";

  import { useCustomForm } from "./custom-form";

  interface Props {
    schema: Schema;
    uiSchema?: UiSchemaRoot;
    validator?: FormValidator2<E>;
    initialValue?: T;
    onSubmit?: (value: T | undefined) => void;
  }

  const { schema, uiSchema, initialValue, validator, onSubmit }: Props = $props();

  const form = useCustomForm({
    schema,
    uiSchema,
    initialValue,
    onSubmit,
    validator,
  });
</script>

<form use:form.enhance style="display: flex; flex-direction: column; gap: 1rem">
  <FormContent bind:value={form.formValue} />
  <SubmitButton />
</form>
