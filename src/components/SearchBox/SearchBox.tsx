import { Box, MenuItem, TextField } from '@mui/material';
import { debounce } from '@mui/material/utils';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useEventsContext } from '../../providers/EventsProvider/context';
import SearchResults from './SearchResults';
import SearchResultSkeleton from './SearchResultSkeleton';
import { Heading, SearchOutlinedIcon, SearchResultCard, StyledLink } from './styles';

const SearchBox: FC = () => {
  const [cancelSearch, setCancelSearch] = useState<boolean>(true);

  const { searchEvents, searchResult, isSearchLoading } = useEventsContext();
  const parentRef = useRef();

  const skeletonArray = ['item', 'item'];

  const search = debounce((e) => {
    const value = e.target?.value;

    if (!value) return;
    if (searchEvents) {
      setCancelSearch(false);
      searchEvents(value);
    }
  }, 500);

  const hanldeSearch = useCallback((event) => {
    event.persist();
    search(event);
  }, []);

  const handleDocumentClick = () => {
    setCancelSearch(true);
  };

  useEffect(() => {
    window.addEventListener('click', handleDocumentClick);
    return () => {
      window.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth="480px"
      minWidth={'480px'}
      mx="48px"
      {...{ ref: parentRef }}>
      <TextField
        variant="outlined"
        placeholder="Searching for events"
        fullWidth
        onChange={hanldeSearch}
        InputProps={{
          sx: {
            height: 44,
            paddingRight: 0,
            color: 'grey.700',
            overflow: 'hidden',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main'
            }
          },
          startAdornment: <SearchOutlinedIcon fontSize="small" />
        }}
      />

      {!cancelSearch && (
        <SearchResultCard elevation={2}>
          <Heading>
            {!isSearchLoading &&
              searchResult.length > 0 &&
              `Search Results (${searchResult.length})`}
            {isSearchLoading && `Searching events...`}
            {!isSearchLoading && searchResult.length === 0 && 'No results found'}
          </Heading>
          {!isSearchLoading &&
            searchResult.length > 0 &&
            searchResult.map((item) => (
              <StyledLink to={`/event/${item.id}`} key={item.id}>
                <MenuItem key={item.id}>
                  <SearchResults event={item} />
                </MenuItem>
              </StyledLink>
            ))}
          {isSearchLoading &&
            skeletonArray.map((item, index) => (
              <MenuItem key={index}>
                <SearchResultSkeleton />
              </MenuItem>
            ))}
        </SearchResultCard>
      )}
    </Box>
  );
};

export default SearchBox;
