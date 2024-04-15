import {
  Button,
  ModeToggle,
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components';
import { Link } from '@tanstack/react-router';
import { DoorOpen, Gamepad2, Grid3X3, PanelLeft } from 'lucide-react';
export const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <a
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <Gamepad2 className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Merge Dashboard</span>
            </a>
            <Link
              to="/board"
              className="flex items-center rounded-lg [&.active]:bg-accent gap-4 p-2.5 text-muted-foreground hover:text-foreground"
            >
              <Grid3X3 className="h-5 w-5" />
              Board
            </Link>

            <Button
              variant="ghost"
              className="flex justify-normal text-xl gap-4 px-2.5 text-muted-foreground hover:bg-accent hover:text-foreground"
              // onClick={handleLogout}
            >
              <DoorOpen className="h-5 w-5" />
              Logout
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
      <div>Board - User #123</div>
      <div className="relative ml-auto flex-1 md:grow-0">
        <ModeToggle />
      </div>
      <img
        src="https://robohash.org/cat?set=set4"
        width={36}
        height={36}
        alt="Avatar"
        className="overflow-hidden rounded-full"
      />
    </header>
  );
};
