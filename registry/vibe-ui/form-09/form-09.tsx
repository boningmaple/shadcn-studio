import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function usesHttpProtocol(value: string) {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

const formSchema = z.object({
  url: z
    .string()
    .min(1, "Website URL is required.")
    .url("Enter a valid URL.")
    .refine(usesHttpProtocol, {
      message: "Website URL must use HTTP or HTTPS.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Form09() {
  const urlId = useId();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  return (
    <form className="w-full max-w-sm space-y-4" onSubmit={form.handleSubmit(() => undefined)}>
      <Controller
        name="url"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={urlId}>Website URL</FieldLabel>
            <Input
              {...field}
              id={urlId}
              type="url"
              autoComplete="url"
              aria-invalid={fieldState.invalid}
            />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
