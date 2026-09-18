import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function getAge(dateOfBirth: string) {
  const [year, month, day] = dateOfBirth.split("-").map(Number);
  const birthDate = new Date(year, month - 1, day);

  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    return null;
  }

  const today = new Date();
  let age = today.getFullYear() - year;
  const hasNotHadBirthday =
    today.getMonth() < month - 1 || (today.getMonth() === month - 1 && today.getDate() < day);

  if (hasNotHadBirthday) {
    age -= 1;
  }

  return age;
}

const formSchema = z.object({
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required.")
    .refine((value) => getAge(value) !== null, "Enter a valid date of birth.")
    .refine((value) => {
      const age = getAge(value);
      return age !== null && age >= 18 && age <= 120;
    }, "You must be between 18 and 120 years old."),
});

type FormValues = z.infer<typeof formSchema>;

export default function Form06() {
  const dateOfBirthId = useId();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateOfBirth: "",
    },
  });

  return (
    <form className="w-full max-w-sm space-y-4" onSubmit={form.handleSubmit(() => undefined)}>
      <Controller
        name="dateOfBirth"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={dateOfBirthId}>Date of birth</FieldLabel>
            <Input
              {...field}
              id={dateOfBirthId}
              type="date"
              autoComplete="bday"
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
