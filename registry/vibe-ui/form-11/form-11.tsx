import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countries = [
  { id: "AU", name: "Australia" },
  { id: "CA", name: "Canada" },
  { id: "FR", name: "France" },
  { id: "DE", name: "Germany" },
  { id: "JP", name: "Japan" },
  { id: "GB", name: "United Kingdom" },
  { id: "US", name: "United States" },
] as const;

const countryCodes = new Set(countries.map((country) => country.id));

const formSchema = z.object({
  country: z
    .string()
    .min(1, "Country is required.")
    .refine((value) => countryCodes.has(value as (typeof countries)[number]["id"]), {
      message: "Select a valid country.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Form11() {
  const countryId = useId();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
    },
  });

  return (
    <form className="w-full max-w-sm space-y-4" onSubmit={form.handleSubmit(() => undefined)}>
      <Controller
        name="country"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel id={`${countryId}-label`} htmlFor={countryId}>
              Country
            </FieldLabel>
            <Select
              name={field.name}
              selectedKey={field.value || null}
              onSelectionChange={(key) => field.onChange(key ?? "")}
              onBlur={field.onBlur}
              aria-labelledby={`${countryId}-label`}
              isInvalid={fieldState.invalid}
            >
              <SelectTrigger id={countryId} aria-invalid={fieldState.invalid}>
                <SelectValue>{({ selectedText }) => selectedText}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.id} id={country.id}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
