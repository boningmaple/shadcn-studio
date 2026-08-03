import * as React from "react";
import {
  EyeIcon,
  EyeOffIcon,
  LinkIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";

import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";
import { M3TextField } from "@/material-3-ui/components/m3-text-field/m3-text-field";

export default function M3TextFieldDemo() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="grid w-full max-w-md gap-6">
      <M3TextField label="Full name" leadingIcon={<UserIcon />} />
      <M3TextField
        label="Email address"
        leadingIcon={<MailIcon />}
        type="email"
        variant="outlined"
      />
      <M3TextField
        label="Password"
        supportingText="Use at least eight characters."
        trailingIcon={
          <M3IconButton
            aria-label={showPassword ? "Hide password" : "Show password"}
            onPress={() => setShowPassword((shown) => !shown)}
            size="xs"
            variant="standard"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </M3IconButton>
        }
        type={showPassword ? "text" : "password"}
        variant="outlined"
      />
      <M3TextField
        label="Profile URL"
        leadingIcon={<LinkIcon />}
        prefix="https://"
        suffix=".studio"
      />
    </div>
  );
}
