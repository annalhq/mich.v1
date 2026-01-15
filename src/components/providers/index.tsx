import { ViewTransitions } from "next-view-transitions";

import { AppThemeProvider } from "@/components/theme/theme-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ViewTransitions>
      <AppThemeProvider>{children}</AppThemeProvider>
    </ViewTransitions>
  );
};
