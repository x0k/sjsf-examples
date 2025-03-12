<script lang="ts">
  import type { HTMLFormAttributes } from "svelte/elements";
  import { Content, enhance, setFromContext, type FormState } from "@sjsf/form";

  interface Props extends HTMLFormAttributes {
    formElement?: HTMLFormElement;
    form: Pick<FormState<any, any>, "context">;
  }

  let { formElement = $bindable(), form, ...rest }: Props = $props();

  setFromContext(form.context);
</script>

<form bind:this={formElement} use:enhance={form.context} {...rest}>
  <Content />
</form>
