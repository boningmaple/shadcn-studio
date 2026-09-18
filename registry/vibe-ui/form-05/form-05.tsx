import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function normalizeCardNumber(value: string) {
  return value.replace(/[ -]/g, "");
}

function passesLuhnCheck(value: string) {
  const digits = normalizeCardNumber(value);
  let sum = 0;
  let shouldDouble = false;

  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

const formSchema = z.object({
  cardNumber: z
    .string()
    .min(1, "Card number is required.")
    .regex(/^[\d -]+$/, "Card number can contain only digits, spaces, and hyphens.")
    .refine((value) => /^\d{13,19}$/.test(normalizeCardNumber(value)), {
      message: "Card number must contain 13 to 19 digits.",
    })
    .refine(passesLuhnCheck, {
      message: "Enter a valid card number.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Form05() {
  const cardNumberId = useId();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
    },
  });

  return (
    <form className="w-full max-w-sm space-y-4" onSubmit={form.handleSubmit(() => undefined)}>
      <Controller
        name="cardNumber"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={cardNumberId}>Card number</FieldLabel>
            <Input
              {...field}
              id={cardNumberId}
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
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
