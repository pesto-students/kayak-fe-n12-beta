import { useFormikContext } from 'formik';
import React from 'react';
import RichTextEditor from '../../components/RichTextEditor';
import { longDescriptionInitialValue } from './constants';

function LongDescriptionForm() {
  const { setFieldValue, values } = useFormikContext<typeof longDescriptionInitialValue>();
  const handleChange = (value: string) => {
    setFieldValue('detailedInformation', value);
  };
  return <RichTextEditor value={values.detailedInformation} handleChange={handleChange} />;
}

export default LongDescriptionForm;
