import { Container, Typography, Box, Divider } from '@mui/material'
import { useState } from 'react'
import ProjectList from './components/ProjectList'
import CreateProject from './components/CreateProject'
import TestCaseReview from './components/TestCaseReview'
import ExecutionMonitor from './components/ExecutionMonitor'

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleProjectCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom className="font-bold text-blue-600">
          canI Dashboard
        </Typography>
        
        <CreateProject onSuccess={handleProjectCreated} />
        
        <Box sx={{ mt: 4 }}>
          <ProjectList key={refreshKey} onSelectProject={handleSelectProject} />
        </Box>

        {selectedProjectId && (
          <>
            <Divider sx={{ my: 4 }} />
            <TestCaseReview projectId={selectedProjectId} />
            <Divider sx={{ my: 4 }} />
            <ExecutionMonitor projectId={selectedProjectId} />
          </>
        )}
      </Box>
    </Container>
  )
}

export default App
