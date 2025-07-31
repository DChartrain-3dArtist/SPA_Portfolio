
'use client';

import { ThemeProvider } from "@/contexts/theme-context";
import { LanguageProvider } from "@/contexts/language-context";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BreadcrumbProvider } from "@/contexts/breadcrumb-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SidebarProvider>
          <BreadcrumbProvider>
            {children}
          </BreadcrumbProvider>
        </SidebarProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
