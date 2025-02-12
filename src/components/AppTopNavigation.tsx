import React from "react";
import { TopNavigation } from "@cloudscape-design/components";

const AppTopNavigation: React.FC = () => {
  return (
    <TopNavigation
      identity={{
        href: "/",
        title: "My App",
        logo: { src: "/assets/logo.png", alt: "App Logo" },
      }}
      utilities={[
        { type: "button", text: "Settings", href: "/settings" },
        {
          type: "menu-dropdown",
          text: "Profile",
          description: "User Name",
          iconName: "user-profile",
          items: [
            { id: "profile", text: "My Profile", href: "/profile" },
            { id: "signout", text: "Sign Out", href: "/logout" },
          ],
        },
      ]}
    />
  );
};

export default AppTopNavigation;
