import { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  Divider
} from '@mui/material';
import { projectService, ProjectLog } from '../services/project.service';

interface ExecutionMonitorProps {
  projectId: string;
}

const ExecutionMonitor = ({ projectId }: ExecutionMonitorProps) => {
  const [logs, setLogs] = useState<ProjectLog[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      projectService.getProjectLogs(projectId)
        .then(setLogs)
        .catch(err => console.error('Failed to fetch logs', err));
    }, 3000);

    return () => clearInterval(interval);
  }, [projectId]);

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>Execution Monitoring</Typography>
      <Paper sx={{ p: 2, bgcolor: '#1e1e1e', color: '#d4d4d4', maxHeight: 400, overflow: 'auto' }}>
        <List dense>
          {logs.map((log, index) => (
            <ListItem key={log.id || index} sx={{ py: 0 }}>
              <ListItemText 
                primary={`${new Date(log.timestamp).toLocaleTimeString()} [${log.level}] ${log.message}`}
                primaryTypographyProps={{ variant: 'caption', fontFamily: 'monospace' }}
              />
            </ListItem>
          ))}
          {logs.length === 0 && (
            <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
              Waiting for execution logs...
            </Typography>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default ExecutionMonitor;
