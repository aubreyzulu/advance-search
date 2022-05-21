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
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import axios from 'axios';
import React from 'react';

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
  const { register, handleSubmit, control } = useForm({ mode: 'onChange' });
  const [checkedValues, setCheckedValues] = React.useState<any>([]);
  const { data } = useQuery(['query-search', checkedValues], async () => {
    const res = await axios.get(
      'http://83.229.71.153:8983/solr/legalmind/select?q=*%3A*&wt=json',
      { params: { checkedValues } }
    );
    return res.data.response.docs;
  });
  console.log(data);
  const onSubmit = (data: any) => {
    console.log(data);
  };

  function handleSelect(checkedName: string) {
    const newNames = checkedValues?.includes(checkedName)
      ? checkedValues?.filter((name: string) => name !== checkedName)
      : [...(checkedValues ?? []), checkedName];
    setCheckedValues(newNames);
    return newNames;
  }

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6">Search words*</Typography>
            <TextField
              {...register('search', { required: true })}
              placeholder="search words"
              size="small"
              fullWidth
              variant="outlined"
            />
            <br />
            <br />
            <Typography variant="h6">Search words in*</Typography>
            <Controller
              control={control}
              render={({ field }) => (
                <FormGroup {...field} row>
                  {searchFilters.map((filter) => (
                    <FormControlLabel
                      key={filter}
                      labelPlacement="end"
                      control={
                        <Checkbox
                          value={filter}
                          onChange={(event) => handleSelect(event.target.value)}
                        />
                      }
                      label={filter}
                    />
                  ))}
                </FormGroup>
              )}
              name="title"
            />

            <br />
            <br />
            <Typography variant="h6">Top of Results*</Typography>
            <Controller
              control={control}
              render={({ field }) => (
                <FormGroup {...field} row>
                  {filterTopOfResults.map((filter) => (
                    <FormControlLabel
                      key={filter}
                      labelPlacement="end"
                      control={
                        <Checkbox
                          value={filter}
                          onChange={(event) => handleSelect(event.target.value)}
                        />
                      }
                      label={filter}
                    />
                  ))}
                </FormGroup>
              )}
              name="docType"
            />

            <br />
            <br />
            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
          </form>

          {data?.map((item: any) => (
            <>
              <Typography>{item.title.toString()}</Typography>
              <Typography>{item.docType.toString()}</Typography>
              <div>{item.p.toString()}</div>
              <hr />
            </>
          ))}
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
