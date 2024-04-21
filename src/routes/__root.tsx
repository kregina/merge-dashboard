import { Header, SideNav } from '@/components';
import { Outlet, createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="grid h-screen w-full sm:pl-[56px] bg-muted/40">
      <SideNav />

      <div className="flex flex-col relative">
        <Header />

        <Outlet />
      </div>
    </div>
  );
}
