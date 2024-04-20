import { Button } from '@/components';
import { ItemVisibility } from '@/services';
import { Eye, EyeOff } from 'lucide-react';
import { FC } from 'react';

interface BoardItemVisibilityProps {
  visibility: ItemVisibility;
  onToggle: () => void;
}

export const BoardItemVisibility: FC<BoardItemVisibilityProps> = ({
  visibility,
  onToggle,
}) => (
  <div className="flex items-center space-x-2 justify-between">
    <p>
      Item is <span className="text-orange-500"> {visibility}</span> to the
      player.
    </p>
    <Button variant="ghost" className="border" onClick={onToggle}>
      {visibility === ItemVisibility.VISIBLE ? (
        <Eye className="mr-2 h-4 w-4" />
      ) : (
        <EyeOff className="mr-2 h-4 w-4" />
      )}
      Toggle Visibility
    </Button>
  </div>
);
