import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  time: z
    .string()
    .min(1, "Time is required.")
    .regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/, "Enter a valid time."),
});

type FormValues = z.infer<typeof formSchema>;

export default function Form07() {
  const timeId = useId();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      time: "",
    },
  });

  return (
    <form className="w-full max-w-sm space-y-4" onSubmit={form.handleSubmit(() => undefined)}>
      <Controller
        name="time"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={timeId}>Time</FieldLabel>
            <Input {...field} id={timeId} type="time" aria-invalid={fieldState.invalid} />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
