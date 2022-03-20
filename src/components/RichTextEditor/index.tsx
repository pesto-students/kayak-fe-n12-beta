import React, { memo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { formats, modules } from './constants';
import { Container } from './styles';

interface IEditorContainerProps {
  value: string;
  handleChange: (value: string) => void;
}

function EditorContainer({ value, handleChange }: IEditorContainerProps) {
  return (
    <Container>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={handleChange}
      />
    </Container>
  );
}

export default memo(EditorContainer);
