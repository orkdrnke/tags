import React, { useContext, useState } from "react";
import { SuggestionsType, ITag, TypeOfTags, AppContext } from "../App";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { Tag } from "./Tag";

const MAX_RANDOM_VAL = 10000;

function getRandomInt() {
  return Math.floor(Math.random() * MAX_RANDOM_VAL);
}

interface ITagsGroupProps {
  name: string;
  tags: ITag[];
}

type TypeEnumKey = keyof typeof TypeOfTags;

export function TagsGroup({ name, tags }: ITagsGroupProps): JSX.Element {
  const [tagsList, setTagsList] = useState(tags);
  const [editing, setEditing] = useState(false);
  const typeOfTags = TypeOfTags[name.toUpperCase() as TypeEnumKey];
  const suggestions = useContext(AppContext);

  const onDeleteTag = (id: number) => {
    const newtagsList = tagsList.filter((tag) => tag.id !== id);
    setTagsList(newtagsList);
  };

  const onAddNewTag = () => {
    if (!editing) setEditing(true);
  };

  const onEnterKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    function addTag() {
      const newTag: ITag = {
        name: e.target.value,
        id: tagsList.length + getRandomInt(),
        type: typeOfTags,
      };
      setTagsList([...tagsList, newTag]);
      e.target.value = "";
    }

    if (e.key === "Enter" && e.target.value !== "") {
      addTag();
      setEditing(false);
    }

    if (e.key === "Tab") {
      e.preventDefault();
    }

    if (e.key === "Tab" && e.target.value !== "") {
      e.preventDefault();
      addTag();
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
        clearOnEscape
        placeholder="Tag name"
        options={suggestions[name as keyof SuggestionsType]}
        sx={{ width: 200 }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          // prevent navigation out of the select before the value is selected
          if (e.key === "Tab") e.preventDefault();
          if (
            suggestions[name as keyof SuggestionsType].includes(e.target.value)
          ) {
            onEnterKeypress(e);
          }
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
}
