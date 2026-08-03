import * as React from "react";
import {
  EyeIcon,
  EyeOffIcon,
  LinkIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";

import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";
import { MDTextField } from "@/ui/material-design/components/md-text-field/md-text-field";

export default function MDTextFieldDemo() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="grid w-full max-w-md gap-6">
      <MDTextField label="Full name" leadingIcon={<UserIcon />} />
      <MDTextField
        label="Email address"
        leadingIcon={<MailIcon />}
        type="email"
        variant="outlined"
      />
      <MDTextField
        label="Password"
        supportingText="Use at least eight characters."
        trailingIcon={
          <MDIconButton
            aria-label={showPassword ? "Hide password" : "Show password"}
            onPress={() => setShowPassword((shown) => !shown)}
            size="xs"
            variant="standard"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </MDIconButton>
        }
        type={showPassword ? "text" : "password"}
        variant="outlined"
      />
      <MDTextField
        label="Profile URL"
        leadingIcon={<LinkIcon />}
        prefix="https://"
        suffix=".studio"
      />
    </div>
  );
}
