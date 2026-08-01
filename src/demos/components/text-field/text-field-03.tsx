import * as React from "react";
import {
  EyeIcon,
  EyeOffIcon,
  LinkIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";

import { IconButton } from "@/components/icon-button/icon-button";
import { TextField } from "@/components/text-field/text-field";

export default function TextFieldDemo() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="grid w-full max-w-md gap-6">
      <TextField label="Full name" leadingIcon={<UserIcon />} />
      <TextField
        label="Email address"
        leadingIcon={<MailIcon />}
        type="email"
        variant="outlined"
      />
      <TextField
        label="Password"
        supportingText="Use at least eight characters."
        trailingIcon={
          <IconButton
            aria-label={showPassword ? "Hide password" : "Show password"}
            onPress={() => setShowPassword((shown) => !shown)}
            size="xs"
            variant="standard"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </IconButton>
        }
        type={showPassword ? "text" : "password"}
        variant="outlined"
      />
      <TextField
        label="Profile URL"
        leadingIcon={<LinkIcon />}
        prefix="https://"
        suffix=".studio"
      />
    </div>
  );
}
