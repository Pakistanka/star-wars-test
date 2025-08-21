import { FC, useEffect, useState, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paper, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { usePersonByName } from 'src/api/usePersonByName';
import { Person } from 'src/api/types';

const LOCAL_STORAGE_KEY = 'swapi-person';

const PersonItem: FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { data: fetchedPerson, isLoading } = usePersonByName(name);
  const [edited, setEdited] = useState<Person | null>(null);
  const [errors, setErrors] = useState<Partial<Person>>({
    name: '',
    gender: '',
    birth_year: '',
  });

  const validateField = (field: string, value: string) => {
    if (!value.trim()) {
      return `Field ${field} is required`;
    }

    return '';
  };

  useEffect(() => {
    if (!name) return;

    const key = `${LOCAL_STORAGE_KEY}-${String(name)}`;
    const localData = localStorage.getItem(key);
    if (localData) {
      setEdited(JSON.parse(localData));
    } else if (fetchedPerson) {
      setEdited(fetchedPerson);
    }
  }, [name, fetchedPerson]);

  const handleSave = () => {
    if (!edited || !name) return;

    const newErrors: Partial<Person> = {
      name: validateField('name', edited.name),
      gender: validateField('gender', edited.gender),
      birth_year: validateField('birth_year', edited.birth_year),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) return;

    const key = `${LOCAL_STORAGE_KEY}-${String(name)}`;
    localStorage.setItem(key, JSON.stringify(edited));
    alert('Saved locally!');
  };

  const handleChange = (field: keyof Person) => (e: ChangeEvent<HTMLInputElement>) => {
    if (!edited) return;
    const value = e.target.value;
    setEdited({ ...edited, [field]: value });

    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, value),
    }));
  };

  const handleBack = () => {
    navigate('/star-wars/');
  };

  useEffect(() => {
    const key = `${LOCAL_STORAGE_KEY}-${String(name)}`;

    const handleUnload = () => {
      localStorage.removeItem(key);
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [name]);

  if (isLoading || !edited) return <CircularProgress sx={{ display: 'block', m: 4 }} />;

  return (
    <Box sx={{ position: 'relative', paddingTop: 2 }}>
      <Button onClick={handleBack} startIcon={<ArrowBackIcon />} sx={{ position: 'absolute', top: 16, left: 16 }}>
        Back
      </Button>

      <Paper sx={{ padding: 4, maxWidth: 600, margin: 'auto', mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          {edited.name}
        </Typography>

        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            label="Name"
            value={edited.name}
            onChange={handleChange('name')}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Gender"
            value={edited.gender}
            onChange={handleChange('gender')}
            fullWidth
            error={!!errors.gender}
            helperText={errors.gender}
          />
          <TextField
            label="Birth Year"
            value={edited.birth_year}
            onChange={handleChange('birth_year')}
            fullWidth
            error={!!errors.birth_year}
            helperText={errors.birth_year}
          />

          <Box display="flex" gap={2}>
            <Button variant="contained" onClick={handleSave} disabled={Object.values(errors).some(Boolean)}>
              Save locally
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default PersonItem;
