import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Typography, { TypographyProps } from "@mui/material/Typography";

interface EditableTextProps {
  initialText: string;
  variant?: TypographyProps["variant"];
  onSave: (editedText: string) => void;
}

const EditableText: React.FC<EditableTextProps> = ({
  initialText,
  variant,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
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
    setText(event.target.value);
  };

  const handleTextFieldBlur = () => {
    setIsEditing(false);
    onSave(text);
  };

  return (
    <>
      {isEditing ? (
        <TextField
          inputRef={inputRef}
          value={text}
          onChange={handleTextFieldChange}
          onBlur={handleTextFieldBlur}
          size="small"
        />
      ) : (
        <Typography variant={variant ?? "body1"} onClick={handleTextClick}>
          {text}
        </Typography>
      )}
    </>
  );
};

export default EditableText;
