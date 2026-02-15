import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  Stack
} from '@mui/material';
import { projectService } from '../services/project.service';

interface CreateProjectProps {
  onSuccess: () => void;
}

const CreateProject = ({ onSuccess }: CreateProjectProps) => {
  const [name, setName] = useState('');
  const [targetUrl, setTargetUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await projectService.createProject({ name, targetUrl });
      setName('');
      setTargetUrl('');
      onSuccess();
    } catch (error) {
      console.error('Failed to create project', error);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Create New Project</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Target URL"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            fullWidth
            required
            type="url"
          />
          <Button type="submit" variant="contained" color="primary">
            Create Project
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default CreateProject;
