
'use client';

import { ThemeProvider } from "@/contexts/theme-context";
import { LanguageProvider } from "@/contexts/language-context";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BreadcrumbProvider } from "@/contexts/breadcrumb-context";
import type { Language } from "@/contexts/language-context";
import type { Theme } from "@/contexts/theme-context";

export function Providers({
  children,
  initialLanguage,
  initialTheme,
}: {
  children: React.ReactNode;
  initialLanguage: Language;
  initialTheme: Theme;
}) {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <LanguageProvider initialLanguage={initialLanguage}>
        <SidebarProvider>
          <BreadcrumbProvider>
            {children}
          </BreadcrumbProvider>
        </SidebarProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
