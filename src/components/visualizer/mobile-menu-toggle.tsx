'use client';

import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';

export function MobileMenuToggle() {
  const { setOpenMobile } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden absolute top-4 left-4 z-50"
      onClick={() => setOpenMobile(true)}
    >
      <Menu className="h-6 w-6" />
      <span className="sr-only">Ouvrir le menu</span>
    </Button>
  );
}
