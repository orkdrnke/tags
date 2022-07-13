import React, { useContext, useState } from "react";
import {
  SupplierType,
  SuggestionsType,
  ITag,
  TypeOfTags,
  AppContext,
} from "./App";
import StarIcon from "@mui/icons-material/Star";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

interface IHomeProps {
  supplier?: SupplierType;
}

interface ITagsGroupProps {
  name: string;
  tags: ITag[];
}

interface ITagProps extends ITag {
  onDelete: (id: number) => void;
}

const Tag = ({ type, name, id, onDelete }: ITagProps) => {
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

type TypeEnumKey = keyof typeof TypeOfTags;

const TagsGroup = ({ name, tags }: ITagsGroupProps) => {
  console.log("🚀 ~ file: Home.tsx ~ line 53 ~ TagsGroup ~ name", name);
  const [tagsList, setTagsList] = useState(tags);
  const [editing, setEditing] = useState(false);
  const typeOfTags = TypeOfTags[name.toUpperCase() as TypeEnumKey];
  const suggestions = useContext(AppContext);
  console.log(
    "🚀 ~ file: Home.tsx ~ line 57 ~ TagsGroup ~ suggestions",
    suggestions
  );

  const onDeleteTag = (id: number) => {
    const newtagsList = tagsList.filter((tag) => tag.id !== id);
    setTagsList(newtagsList);
  };

  const onAddNewTag = () => {
    if (!editing) setEditing(true);
  };

  const onEnterKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const newTag: ITag = {
        name: e.target.value,
        id: tagsList.length + 1,
        type: typeOfTags,
      };
      setTagsList([...tagsList, newTag]);
      setEditing(false);
    }
  };

  const renderedTags = tagsList.map((tag) => (
    <Tag
      type={tag.type}
      id={tag.id}
      name={tag.name}
      onDelete={onDeleteTag}
      key={tag.id}
    />
  ));

  const inputField =
    typeOfTags === TypeOfTags.GENERAL ? (
      <TextField
        size="small"
        autoFocus
        placeholder="Tag name"
        onKeyDown={onEnterKeypress}
      />
    ) : (
      <Autocomplete
        disablePortal
        size="small"
        autoHighlight
        autoSelect
        placeholder="Tag name"
        options={suggestions[name as keyof SuggestionsType]}
        sx={{ width: 200 }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (
            suggestions[name as keyof SuggestionsType].includes(e.target.value)
          )
            onEnterKeypress(e);
        }}
        renderInput={(params) => <TextField {...params} autoFocus />}
      />
    );

  return (
    <Box display="flex" flexDirection="column">
      <p className="text-sm text-stone-500 my-2">
        {name.charAt(0).toUpperCase() + name.substring(1)}
      </p>
      <div className="flex items-center">
        {renderedTags}
        {editing && inputField}
        <Button disabled={editing} color="secondary" onClick={onAddNewTag}>
          + New Tag
        </Button>
      </div>
    </Box>
  );
};

const Home = ({ supplier }: IHomeProps) => {
  if (supplier === undefined)
    return (
      <div className="flex w-full justify-center m-4">
        Supplier data wasn't loaded. Smash that "Load" button above!
      </div>
    );

  const suplierTagGroups = Object.keys(supplier)
    .filter((key) => key.includes("tag"))
    .map((key) => {
      const groupName = key.replace("tags-", "");
      const tagsInGroup = supplier[key as keyof Omit<SupplierType, "name">];
      return <TagsGroup name={groupName} tags={tagsInGroup} key={key} />;
    });

  return (
    <>
      <div className="inline-block border-solid border-0 border-b border-b-slate-400 my-5">
        <p className="flex items-center py-2 text-3xl m-0">
          <StarIcon color="primary" classes={{ root: "text-sm" }} />
          {supplier.name}
        </p>
      </div>
      <section>{suplierTagGroups}</section>
    </>
  );
};

export default Home;
