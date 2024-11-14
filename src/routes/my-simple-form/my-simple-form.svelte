<script lang="ts" generics="T, E">
  import { FormContent, type FormAPI } from '@sjsf/form';
  import type { HTMLFormAttributes } from "svelte/elements";

  interface Props extends HTMLFormAttributes {
    formElement?: HTMLFormElement;
    form: FormAPI<T, E>;
  }

  let { formElement = $bindable(), form, ...rest }: Props = $props();
</script>

<form bind:this={formElement} use:form.enhance {...rest}>
  <!-- svelte-ignore ownership_invalid_binding -->
  <FormContent bind:value={form.formValue} />
</form>
