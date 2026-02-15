import { Container, Typography, Box, Paper } from '@mui/material'

function App() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom className="font-bold text-blue-600">
          canI Dashboard
        </Typography>
        <Paper sx={{ p: 4, mt: 2 }}>
          <Typography variant="body1">
            Welcome to the canI automated pentesting platform.
          </Typography>
          <Box className="mt-4 p-4 bg-gray-100 rounded-md">
            <Typography variant="body2" className="text-gray-700">
              Tailwind CSS and Material UI are ready to use.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default App
