import { theme as basic } from "@sjsf/basic-theme";
import { extendByRecord } from "@sjsf/form/lib/resolver";
import TextareaWidget from "@sjsf/basic-theme/extra-widgets/textarea.svelte";

export const theme = extendByRecord(basic, {
  textareaWidget: TextareaWidget,
});
