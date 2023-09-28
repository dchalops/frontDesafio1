import { Grid, Container, Typography, Card, CardContent, Box, Button, CardActions, Link } from '@mui/material';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hola, bienvenido 👋
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Card>
              <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                <Typography variant="p" sx={{ mb: 5 }}>
                  Desafío 🚀
                </Typography>
                
                
              </Box>
            </Card>
          </Grid>

          
        </Grid>
      </Container>
    </Page>
  );
}
