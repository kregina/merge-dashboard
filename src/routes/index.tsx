import { createFileRoute, Link } from '@tanstack/react-router';
import { Grid3X3 } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>

      <Link
        to="/board"
        className="flex items-center rounded-lg [&.active]:bg-accent gap-4 p-2.5 text-muted-foreground hover:text-foreground"
      >
        <Grid3X3 className="h-5 w-5" />
        Go to Board
      </Link>
    </div>
  );
}
