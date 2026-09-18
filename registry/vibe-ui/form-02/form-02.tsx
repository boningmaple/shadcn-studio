import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password must be at most 128 characters.")
    .regex(/[a-z]/, "Password must include a lowercase letter.")
    .regex(/[A-Z]/, "Password must include an uppercase letter.")
    .regex(/\d/, "Password must include a number.")
    .regex(/[^A-Za-z0-9]/, "Password must include a symbol."),
});

type FormValues = z.infer<typeof formSchema>;

export default function Form02() {
  const passwordId = useId();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  return (
    <form className="w-full max-w-sm space-y-4" onSubmit={form.handleSubmit(() => undefined)}>
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={passwordId}>Password</FieldLabel>
            <Input
              {...field}
              id={passwordId}
              type="password"
              autoComplete="new-password"
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
