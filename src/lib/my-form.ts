import {
  type FormState,
  type FormOptions,
  type Validator,
  createForm,
} from "@sjsf/form";
import { translation } from "@sjsf/form/translations/en";
import { resolver } from '@sjsf/form/resolvers/basic'
import { createFormValidator } from "@sjsf/ajv8-validator";

import { theme } from "./theme";

type Defaults = "theme" | "translation" | "validator" | "resolver";

export type MyFormOptions<T, V extends Validator> = Omit<
  FormOptions<T, V>,
  Defaults
> &
  Partial<Pick<FormOptions<T, V>, Defaults>>;

export function createMyForm<
  T,
  V extends Validator = ReturnType<typeof createFormValidator>,
>(options: MyFormOptions<T, V>): FormState<T, V> {
  // NOTE: we create a separate validator for each form
  const validator = createFormValidator() as unknown as V;
  const defaults: Pick<FormOptions<T, V>, Defaults> = {
    resolver,
    theme,
    validator,
    translation,
  };
  return createForm(
    new Proxy(options, {
      get(target, p, receiver) {
        if (!(p in target)) {
          return defaults[p as Defaults];
        }
        return Reflect.get(target, p, receiver);
      },
    }) as FormOptions<T, V>
  );
}
