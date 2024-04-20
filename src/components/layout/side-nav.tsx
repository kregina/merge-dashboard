import { Link } from '@tanstack/react-router';
import { Gamepad2, Grid3X3, Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export const SideNav = () => {
  return (
    <aside className="inset-y fixed hidden left-0 z-20 sm:flex h-full flex-col border-r bg-background">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <a
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Gamepad2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Merge Dashboard</span>
        </a>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/board"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 [&.active]:bg-accent"
            >
              <Grid3X3 className="h-5 w-5" />
              <span className="sr-only">Board</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Board</TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};
