import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  cvv: z
    .string()
    .min(1, "CVV is required.")
    .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits."),
});

type FormValues = z.infer<typeof formSchema>;

export default function Form04() {
  const cvvId = useId();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cvv: "",
    },
  });

  return (
    <form className="w-full max-w-sm space-y-4" onSubmit={form.handleSubmit(() => undefined)}>
      <Controller
        name="cvv"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={cvvId}>CVV</FieldLabel>
            <Input
              {...field}
              id={cvvId}
              type="text"
              inputMode="numeric"
              autoComplete="cc-csc"
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
