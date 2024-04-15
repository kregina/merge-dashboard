import { useState } from 'react';

interface BoardItemProps {
  index: number;
  chainId: string | null;
  setDragStartIndex: (index: number) => void;
  setActiveChainId: (chainId: string | null) => void;
  handleDrop: (dropIndex: number) => void;
}

export const useBoardItem = (props: BoardItemProps) => {
  const { chainId, setDragStartIndex, setActiveChainId, handleDrop, index } =
    props;

  const [hoveredId, setHoveredId] = useState<string | number | null>(null);

  const defaultClassName = `rounded-lg cursor-grab bg-background
  transition-colors duration-100 ease-in-out
  border
  `;

  const handleOnDragStart = () => {
    setDragStartIndex(index);
    setActiveChainId(chainId);
  };

  const onHandleOnDrop = () => {
    handleDrop(index);
    setHoveredId(null);
  };

  const handleOnDragLeave = () => {
    setHoveredId(null);
  };

  const handleOnDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    chainId: string | null,
    index: number | null = null,
  ) => {
    e.preventDefault();
    setHoveredId(chainId || index);
  };

  return {
    hoveredId,
    handleOnDragOver,
    handleOnDragLeave,
    onHandleOnDrop,
    defaultClassName,
    handleOnDragStart,
  };
};
