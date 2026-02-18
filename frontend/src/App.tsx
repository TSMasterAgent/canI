import { Container, Typography, Box, Divider, Button } from '@mui/material'
import { useState, useEffect } from 'react'
import ProjectList from './components/ProjectList'
import CreateProject from './components/CreateProject'
import TestCaseReview from './components/TestCaseReview'
import ExecutionMonitor from './components/ExecutionMonitor'
import Login from './pages/Login'

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) setToken(savedToken);
  }, []);

  const handleLogin = (newToken: string) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setSelectedProjectId(null);
  };

  const handleProjectCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" gutterBottom>
          <Typography variant="h4" component="h1" className="font-bold text-blue-600">
            canI Dashboard
          </Typography>
          <Button variant="outlined" color="secondary" onClick={handleLogout}>Logout</Button>
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <CreateProject onSuccess={handleProjectCreated} />
        </Box>
        
        <Box sx={{ mt: 4 }}>
          <ProjectList key={refreshKey} onSelectProject={handleSelectProject} />
        </Box>

        {selectedProjectId && (
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ my: 4 }} />
            <TestCaseReview projectId={selectedProjectId} />
            <Divider sx={{ my: 4 }} />
            <ExecutionMonitor projectId={selectedProjectId} />
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default App
