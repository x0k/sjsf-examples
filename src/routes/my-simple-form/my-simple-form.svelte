<script lang="ts">
  import type { HTMLFormAttributes } from "svelte/elements";
  import { Content, setFromContext, type FormInternals } from '@sjsf/form';

  interface Props extends HTMLFormAttributes {
    formElement?: HTMLFormElement;
    form: FormInternals;
  }

  let { formElement = $bindable(), form, ...rest }: Props = $props();

  setFromContext(form.context)
</script>

<form bind:this={formElement} use:form.enhance {...rest}>
  <Content {form} />
</form>
