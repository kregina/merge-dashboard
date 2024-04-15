import { Header, SideNav } from '@/components';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNav />

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />

        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
