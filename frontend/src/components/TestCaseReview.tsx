import { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Stack, 
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { projectService, TestCase } from '../services/project.service';

interface TestCaseReviewProps {
  projectId: string;
}

const TestCaseReview = ({ projectId }: TestCaseReviewProps) => {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestCases();
  }, [projectId]);

  const loadTestCases = async () => {
    try {
      const cases = await projectService.getTestCases(projectId);
      setTestCases(cases);
    } catch (error) {
      console.error('Failed to load test cases', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (testCaseId: string, status: string) => {
    try {
      await projectService.updateTestCaseStatus(testCaseId, status);
      loadTestCases();
    } catch (error) {
      console.error('Failed to update test case status', error);
    }
  };

  const handleExecute = async () => {
    try {
      await projectService.executeProject(projectId);
      alert('Execution started successfully');
    } catch (error) {
      console.error('Failed to start execution', error);
      alert('Failed to start execution');
    }
  };

  if (loading) return <Typography>Loading test cases...</Typography>;

  const approvedCount = testCases.filter(tc => tc.status === 'APPROVED').length;

  return (
    <Box mt={4}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Test Case Approval</Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          disabled={approvedCount === 0}
          onClick={handleExecute}
        >
          Execute {approvedCount} Approved Tests
        </Button>
      </Stack>
      {testCases.map((tc) => (
        <Accordion key={tc.id} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack direction="row" spacing={2} alignItems="center" width="100%">
              <Typography sx={{ flexGrow: 1 }}>{tc.title}</Typography>
              <Chip 
                label={tc.status} 
                color={tc.status === 'APPROVED' ? 'success' : tc.status === 'REJECTED' ? 'error' : 'default'} 
                size="small" 
              />
              <Chip label={tc.category} variant="outlined" size="small" />
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {tc.description}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              OWASP: {tc.owasp_mapping}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" spacing={2}>
              <Button 
                variant="contained" 
                color="success" 
                size="small"
                onClick={() => handleStatusUpdate(tc.id, 'APPROVED')}
                disabled={tc.status === 'APPROVED'}
              >
                Approve
              </Button>
              <Button 
                variant="outlined" 
                color="error" 
                size="small"
                onClick={() => handleStatusUpdate(tc.id, 'REJECTED')}
                disabled={tc.status === 'REJECTED'}
              >
                Reject
              </Button>
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
      {testCases.length === 0 && (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="textSecondary">No test cases suggested yet. Trigger analysis first.</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default TestCaseReview;
