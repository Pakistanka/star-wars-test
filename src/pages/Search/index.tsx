import { FC, useState, ChangeEvent, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'src/shared/hooks/useDebounce';
import { usePeople } from 'src/api/usePeople';
import { routePath } from 'src/routes/routePath';
import {
  Pagination,
  TextField,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  IconButton,
  InputAdornment,
  Box,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import ClearIcon from '@mui/icons-material/Clear';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

const Search: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(searchTerm, 300);
  const navigate = useNavigate();

  const { data, isLoading } = usePeople(debouncedSearch, page);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => setSearchTerm(''), []);

  const handleViewPerson = useCallback(
    (name: string) => {
      const encodedName = encodeURIComponent(name);
      navigate(`${routePath.person}/${encodedName}`);
    },
    [navigate],
  );

  return (
    <Box
      className="search"
      sx={{
        p: 2,
        position: 'relative',
        zIndex: 2,
      }}
    >
      <TextField
        fullWidth
        label="Search characters"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Type a name..."
        variant="outlined"
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            color: '#fff',
            backgroundColor: '#121212', // dark but visible against black background
            '& fieldset': {
              borderColor: '#ffffff55',
            },
            '&:hover fieldset': {
              borderColor: '#ffffffaa',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#90caf9',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#ccc',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#90caf9',
          },
          '& .MuiInputAdornment-root .MuiIconButton-root': {
            color: '#fff',
          },
          '& input::placeholder': {
            color: '#bbb',
            opacity: 1,
          },
        }}
        InputProps={{
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton onClick={handleClearSearch} edge="end" size="small">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {isLoading && <CircularProgress />}

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data?.results.map((person, idx) => {
          const genderIconMap: Record<string, JSX.Element> = {
            male: <MaleIcon />,
            female: <FemaleIcon />,
            'n/a': <TransgenderIcon />,
          };

          const genderKey = person.gender?.toLowerCase() || 'n/a';
          const GenderIcon = genderIconMap[genderKey] || genderIconMap['n/a'];

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
              <Card onClick={() => handleViewPerson(person.name)} sx={{ cursor: 'pointer', position: 'relative' }}>
                <CardActionArea
                  sx={{
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      background: 'rgba(144, 196, 238, 0.5)',
                    },
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      background: '#f0f0f0',
                      borderRadius: '50%',
                      padding: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {GenderIcon}
                  </div>
                  <CardContent>
                    <Typography variant="h6">{person.name}</Typography>
                    <Typography variant="body2">Gender: {person.gender}</Typography>
                    <Typography variant="body2">Birth Year: {person.birth_year}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {!!data?.count && (
        <Pagination
          count={Math.ceil(data.count / 10)}
          page={page}
          onChange={(_: unknown, val: number) => setPage(val)}
          sx={{
            mt: 4,
            display: 'flex',
            justifyContent: 'center',
            '& .MuiPaginationItem-root': {
              color: '#fff',
              borderColor: '#fff',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#ffffff22',
                borderColor: '#90c4ee',
                color: '#90c4ee',
              },
            },
            '& .Mui-selected': {
              background: '#90c4ee',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#6aa7dc',
              },
            },
          }}
        />
      )}
    </Box>
  );
};

export default Search;
