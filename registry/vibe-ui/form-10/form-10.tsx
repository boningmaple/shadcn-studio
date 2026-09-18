import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  bio: z
    .string()
    .trim()
    .min(1, "Bio is required.")
    .min(20, "Bio must be at least 20 characters.")
    .max(160, "Bio must be at most 160 characters."),
});

type FormValues = z.infer<typeof formSchema>;

export default function Form10() {
  const bioId = useId();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: "",
    },
  });

  return (
    <form className="w-full max-w-sm space-y-4" onSubmit={form.handleSubmit(() => undefined)}>
      <Controller
        name="bio"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={bioId}>Bio</FieldLabel>
            <Textarea {...field} id={bioId} aria-invalid={fieldState.invalid} />
            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
