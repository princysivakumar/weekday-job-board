import React from 'react';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


// interface SearchProps { } // Add props interface if needed

const FilterPanel = () => {
  return (
    <div className="search">
      <TextField
        id="outlined-basic"
        label="Search Jobs"
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputBase
              sx={{ ml: 1, width: '100%' }}
              placeholder="Search by title, company, etc"
            />
          ),
          endAdornment: (
            <IconButton type="submit" sx={{ p: '10px' }}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
      
    </div>
  );
};

export default FilterPanel;
