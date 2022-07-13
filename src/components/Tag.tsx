import { useState } from "react";
import { ITag } from "../App";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

interface ITagProps extends ITag {
  onDelete: (id: number) => void;
}

export const Tag = ({ name, id, onDelete }: ITagProps) => {
  const [hovered, setHovered] = useState(false);
  const isFirst = id === 1;
  return (
    <div
      className="mr-2 px-3 py-1 flex items-center bg-gray-200 rounded-2xl h-5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="mr-1 cursor-default">{name}</span>
      {!isFirst && hovered ? (
        <ClearRoundedIcon
          fontSize="small"
          color="disabled"
          className="cursor-pointer"
          onClick={() => onDelete(id)}
        />
      ) : (
        ""
      )}
    </div>
  );
};
