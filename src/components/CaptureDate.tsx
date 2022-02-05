import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface IDateProps {
  heading: string;
}

export default function CaptureDate({ heading }: IDateProps) {
  const [value, setValue] = useState<Date | null>();
  const [searchParams, setSearchParams] = useSearchParams();

  const addSearchParam = (key: string, status: string) => {
    if (status !== '') {
      if (searchParams.has(key)) {
        searchParams.set(key, status);
      } else {
        searchParams.append(key, status);
      }
      setSearchParams(searchParams);
    }
  };

  const getSearchParam = (key: string) => {
    const params = searchParams.get(key);
    if (params !== null && params !== '') {
      return params;
    }
    return '';
  };
  useEffect(() => {
    if (getSearchParam(heading) !== '') {
      setValue(new Date(getSearchParam(heading)));
    } else setValue(null);
  }, [searchParams]);

  useEffect(() => {
    addSearchParam(heading, value?.toString() || '');
  }, [value]);

  return (
    <Box component="div" sx={{ alignItems: 'centre', p: 1 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={heading}
          openTo="day"
          views={['year', 'month', 'day']}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
}
