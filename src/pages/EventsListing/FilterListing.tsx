import { Button, Divider } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CaptureDate from '../../components/CaptureDate';
import CATEGORIES from '../../constants/Categories';
import { grey } from '../../styles/themeColors';
import FilterAmount from './FilterAmount';
import FilterHeading from './FilterHeading';

export default function FilterListing() {
  const [checked, setChecked] = useState<Array<string>>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleResetClick = () => {
    setSearchParams('');
  };

  const addSearchParam = (key: string, status: string) => {
    if (status !== '') {
      if (searchParams.has(key)) {
        searchParams.set(key, status);
      } else {
        searchParams.append(key, status);
      }
    } else searchParams.delete(key);
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
    addSearchParam('category', checked?.toString() || '');
  }, [checked]);

  useEffect(() => {
    setChecked(getSearchParam('category').split(',') || []);
  }, [searchParams]);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  return (
    <List sx={{ border: `1px solid ${grey[400]}`, width: '100%', background: grey[100] }}>
      <FilterHeading heading="Filter By Category">
        {CATEGORIES.map((category) => {
          const labelId = `checkbox-list-label-${category}`;

          return (
            <ListItem key={category.key} disablePadding>
              <ListItemButton role={undefined} onClick={handleToggle(category.key)} dense>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(category.key) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
                <ListItemText sx={{ paddingLeft: '8px' }} id={labelId} primary={category.value} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </FilterHeading>
      <Divider component="li" />
      <FilterHeading heading="Filter By Amount">
        <List sx={{ padding: '8px 16px' }} component="div">
          <FilterAmount heading="Min" />
        </List>
        <List sx={{ padding: '8px 16px' }} component="div">
          <FilterAmount heading="Max" />
        </List>
      </FilterHeading>
      <Divider component="li" />
      <FilterHeading heading="Filter By Date">
        <List sx={{ padding: '8px 16px' }} component="div">
          <CaptureDate heading="Start Date" />
        </List>
        <List sx={{ padding: '8px 16px' }} component="div">
          <CaptureDate heading="End Date" />
        </List>
      </FilterHeading>
      <List sx={{ padding: '8px 16px' }} component="div">
        <Button
          fullWidth
          sx={{ color: '#fff' }}
          variant="contained"
          onClick={handleResetClick}
          focusRipple>
          Reset Filter
        </Button>
      </List>
    </List>
  );
}
