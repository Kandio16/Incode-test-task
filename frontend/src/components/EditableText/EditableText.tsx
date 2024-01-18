import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { appStore } from "../../stores";

interface EditableTextProps {
  initialText: string;
  variant?: TypographyProps["variant"];
  onChange: (newTitle: string) => void;
}

const EditableText: React.FC<EditableTextProps> = ({
  initialText,
  variant,
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleTextClick = () => {
    setIsEditing(true);
  };

  const handleTextFieldChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    onChange(event.target.value);
  };

  const handleTextFieldBlur = () => {
    setIsEditing(false);
    appStore.saveData();
  };

  return (
    <>
      {isEditing ? (
        <TextField
          inputRef={inputRef}
          value={initialText}
          onChange={handleTextFieldChange}
          onBlur={handleTextFieldBlur}
          size="small"
        />
      ) : (
        <Typography variant={variant ?? "body1"} onClick={handleTextClick}>
          {initialText}
        </Typography>
      )}
    </>
  );
};

export default EditableText;
