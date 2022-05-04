import TopBar from './components/TopBar';
import './App.css';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';

const searchFilters = [
  'Acts',
  'Statutory Instruments',
  'Circulars',
  'Parliamentary Bill',
  'Gazettes',
  'Court Judgments',
  'Articles',
];
const filterTopOfResults = ['Legislation', 'Articles'];

function App() {
  return (
    <Container>
      <TopBar />
      <Toolbar sx={{ textAlign: 'center' }}>
        <Typography variant="h4">Advanced Search</Typography>
      </Toolbar>
      <Divider />
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
          <Card>
            <CardContent>
              <TextField
                placeholder="search words"
                size="small"
                fullWidth
                variant="outlined"
              />
              <br />
              <br />
              <Button variant="contained" color="primary">
                Search
              </Button>
              <br />
              <br />
              <Button variant="contained" color="secondary">
                advanced search
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography variant="h6">Search words*</Typography>
          <TextField
            placeholder="search words"
            size="small"
            fullWidth
            variant="outlined"
          />
          <br />
          <br />
          <Typography variant="h6">Search words in*</Typography>
          <FormGroup row>
            {searchFilters.map((filter) => (
              <FormControlLabel
                labelPlacement="end"
                control={<Checkbox />}
                label={filter}
              />
            ))}
          </FormGroup>

          <br />
          <br />
          <Typography variant="h6">Top of Results*</Typography>
          <FormGroup row>
            {filterTopOfResults.map((filter) => (
              <FormControlLabel
                labelPlacement="end"
                control={<Checkbox />}
                label={filter}
              />
            ))}
          </FormGroup>
          <br />
          <br />
          <Button variant="contained" color="primary">
            Search
          </Button>
        </Grid>
        <Grid item md={3} xs={12}>
          {/* <Paper sx={{ mt: 6 }}> */}
          <List sx={{ mt: 6 }}>
            <ListItem divider dense>
              <ListItemButton>
                <ListItemText primary="My LegalMind" />
              </ListItemButton>
            </ListItem>
            <ListItem divider dense>
              <ListItemButton>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem divider dense>
              <ListItemButton>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
            <ListItem divider dense>
              <ListItemButton>
                <ListItemText primary="How it works" />
              </ListItemButton>
            </ListItem>
          </List>
          {/* </Paper> */}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
