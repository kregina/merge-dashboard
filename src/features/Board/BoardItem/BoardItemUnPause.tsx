import { Button } from '@/components';
import { Play } from 'lucide-react';
import { FC } from 'react';

interface BoardItemUnPauseProps {
  isPausedUntil: string | null;
  onUnpause: () => void;
}

export const BoardItemUnPause: FC<BoardItemUnPauseProps> = ({
  isPausedUntil,
  onUnpause,
}) =>
  isPausedUntil ? (
    <div className="flex items-center space-x-2 justify-between">
      <p>
        Is paused until <span className="text-orange-500">{isPausedUntil}</span>
      </p>
      <Button variant="ghost" className="border" onClick={onUnpause}>
        <Play className="mr-2 h-4 w-4" />
        Unpause
      </Button>
    </div>
  ) : null;
