import * as React from "react";
import { EyeIcon, EyeOffIcon, MailIcon, UserIcon } from "lucide-react";

import { TextField } from "@/components/text-field/text-field";

export default function TextFieldDemo() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="grid w-full max-w-sm gap-6">
      <TextField label="Full name">
        <UserIcon
          aria-hidden="true"
          className="ms-4 size-6 shrink-0 text-[#49454f] dark:text-[#cac4d0]"
        />
      </TextField>
      <TextField label="Email address" type="email" variant="outlined">
        <MailIcon
          aria-hidden="true"
          className="ms-4 size-6 shrink-0 text-[#49454f] dark:text-[#cac4d0]"
        />
      </TextField>
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
      >
        <button
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute z-10 end-2.5 top-1/2 -translate-y-1/2 rounded-full p-2 text-[#49454f] outline-none focus-visible:ring-2 focus-visible:ring-[#6750a4] dark:text-[#cac4d0] dark:focus-visible:ring-[#d0bcff]"
          onClick={() => setShowPassword((shown) => !shown)}
          type="button"
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </TextField>
    </div>
  );
}
