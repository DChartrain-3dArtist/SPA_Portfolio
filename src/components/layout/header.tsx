
'use client';

import { Settings, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/language-context';
import { useTheme } from '@/contexts/theme-context';
export function Header() {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <header className="lg:hidden flex items-center justify-end p-4">
       <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="hover:text-primary active:text-primary"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Ouvrir les paramètres</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 mr-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Réglages</h4>
              <p className="text-sm text-muted-foreground">
                Personnalisez l&apos;affichage du site.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="language-switch-mobile" className="text-sm">
                  <span>Langue</span>
                </Label>
                <div className="flex items-center gap-2">
                  <div className="w-8 flex justify-center">
                    <Label
                      htmlFor="language-switch-mobile"
                      className="text-xs"
                    >
                      EN
                    </Label>
                  </div>
                  <Switch
                    id="language-switch-mobile"
                    checked={language === 'fr'}
                    onCheckedChange={(checked) =>
                      setLanguage(checked ? 'fr' : 'en')
                    }
                  />
                  <div className="w-8 flex justify-center">
                    <Label
                      htmlFor="language-switch-mobile"
                      className="text-xs"
                    >
                      FR
                    </Label>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="theme-switch-mobile" className="text-sm">
                  <span>Thème</span>
                </Label>
                <div className="flex items-center gap-2">
                  <div className="w-8 flex justify-center">
                    <Sun className="h-5 w-5" />
                  </div>
                  <Switch
                    id="theme-switch-mobile"
                    checked={theme === 'dark'}
                    onCheckedChange={(checked) =>
                      setTheme(checked ? 'dark' : 'light')
                    }
                  />
                  <div className="w-8 flex justify-center">
                    <Moon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </header>
  );
}
