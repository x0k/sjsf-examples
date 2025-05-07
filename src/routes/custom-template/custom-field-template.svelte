<script lang="ts">
  import {
    getComponent,
    getFormContext,
    type ComponentProps,
  } from "@sjsf/form";
  import { getTemplateProps } from "@sjsf/form/templates/get-template-props";

  const {
    children,
    config,
    showTitle,
    errors,
    uiOption,
  }: ComponentProps["fieldTemplate"] = $props();

  const ctx = getFormContext();

  const Layout = $derived(getComponent(ctx, "layout", config));
  const Title = $derived(getComponent(ctx, "title", config));
  const Description = $derived(getComponent(ctx, "description", config));
  const ErrorsList = $derived(getComponent(ctx, "errorsList", config));
  const Help = $derived(getComponent(ctx, "help", config));

  const { showMeta, description, title } = $derived(
    getTemplateProps(uiOption, config)
  );

  const help = $derived(uiOption("help"));
</script>

<!-- NOTE: To keep the example simple, I apply the necessary styles here.
But it would be better if the styles (flex) were added via customization
of the `field-meta` layout. -->

<Layout type="field" {config} {errors}>
  {#if showMeta && ((showTitle && title) || description)}
    <Layout type="field-meta" {config} {errors}>
      <div style="display: flex; justify-content: space-between;">
        {#if showTitle && title}
          <Title type="field" {title} {config} {errors} />
        {/if}
        {#if description}
          <Description type="field" {description} {config} {errors} />
        {/if}
        {#if errors.length > 0}
          <ErrorsList {errors} {config} />
        {/if}
      </div>
    </Layout>
  {/if}
  <Layout type="field-content" {config} {errors}>
    {@render children()}
  </Layout>
  {#if help !== undefined}
    <Help {help} {config} {errors} />
  {/if}
</Layout>
