<script lang="ts">
  import { getComponent, getFormContext, type TemplateProps } from "@sjsf/form";

  const { children, config, showTitle, errors }: TemplateProps<"field"> =
    $props();

  const ctx = getFormContext();

  const Layout = $derived(getComponent(ctx, "layout", config));
  const Title = $derived(getComponent(ctx, "title", config));
  const Description = $derived(getComponent(ctx, "description", config));
  const ErrorsList = $derived(getComponent(ctx, "errorsList", config));
  const Help = $derived(getComponent(ctx, "help", config));

  const { showMeta, description, title } = $derived.by(() => {
    const { uiOptions, schema, title } = config;
    return {
      title: uiOptions?.title ?? schema.title ?? title,
      showMeta: uiOptions?.hideTitle !== true,
      description: uiOptions?.description ?? schema.description,
    };
  });
</script>

<!-- NOTE: To keep the example simple, I apply the necessary styles here.
But it would be better if the styles (flex) were added via customization
of the `field-meta` layout. -->

<Layout type="field" attributes={config.uiOptions?.container} {config} {errors}>
  {#if showMeta && ((showTitle && title) || description)}
    <Layout type="field-meta" {config} {errors}>
      <div style="display: flex; justify-content: space-between;" >
        {#if showTitle && title}
          <Title
            type="field"
            {title}
            required={config.required}
            forId={config.idSchema.$id}
            {config}
            {errors}
          />
        {/if}
        {#if description}
          <Description type="field" {description} {config} {errors} />
        {/if}
        {#if errors.length > 0}
          <ErrorsList forId={config.idSchema.$id} {errors} {config} />
        {/if}
      </div>
    </Layout>
  {/if}
  <Layout
    type="field-content"
    attributes={config.uiOptions?.content}
    {config}
    {errors}
  >
    {@render children()}
  </Layout>
  {#if config.uiOptions?.help !== undefined}
    <Help help={config.uiOptions.help} {config} {errors} />
  {/if}
</Layout>
