import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface IAmountProps {
  heading: string;
}

export default function FilterAmount({ heading }: IAmountProps) {
  const [amount, setAmount] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const updateAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setAmount(parseInt(event.target.value));
    } else setAmount(0);
  };

  const addSearchParam = (key: string, status: string) => {
    if (status !== '') {
      if (searchParams.has(key)) {
        searchParams.set(key, status);
      } else {
        searchParams.append(key, status);
      }
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  const getSearchParam = (key: string) => {
    const params = searchParams.get(key);
    if (params !== null && params !== '') {
      return params;
    }
    return '';
  };
  useEffect(() => {
    if (searchParams.has(heading)) {
      setAmount(parseInt(getSearchParam(heading)));
    } else {
      setAmount(0);
    }
  }, [searchParams]);

  useEffect(() => {
    if (amount > 0) {
      addSearchParam(heading, amount.toString());
    } else addSearchParam(heading, '');
  }, [amount]);

  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        id={heading}
        label={`${heading} Amount`}
        name={heading}
        value={amount}
        onChange={updateAmount}
      />
    </>
  );
}
