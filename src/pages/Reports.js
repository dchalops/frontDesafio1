/* eslint-disable camelcase */
/* eslint-disable import/extensions */
import axios from 'axios';
import * as Yup from 'yup';
import { filter } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sentenceCase } from 'change-case';

import { useFormik, Form, FormikProvider } from 'formik';

import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from 'react-chartjs-2';
// material

import {
  Box,
  Card,
  Alert,
  AlertTitle,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TextField,
  InputAdornment,
  IconButton,
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import LinearProgress from '@mui/material/LinearProgress';

import { register } from '../redux/actions/authActions';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu, ReportListHead } from '../sections/@dashboard/reports';

import UsersListCall from '../redux/calls/UsersListCall';
import MyBarChart from './MyBarChart';
import { DOMAIN } from '../redux/constants';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'candidate', label: 'Lista Electoral', alignRight: false },
  { id: 'votes', label: 'Votos', alignRight: false },
  // { id: 'party', label: 'Partido', alignRight: false },
  { id: 'percentage', label: 'Porcentaje', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}


export default function ElectoralReports() {
  // ...resto del código (hasta processedData)

  const [votingData, setVotingData] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('candidate');
  const [evento_electoral_id, setEventoElectoralId] = useState(null);
  const [canton, setCanton] = useState(null);
  const [provincia, setProvincia] = useState(null);
  const [response, setResponse] = useState(null);
  const [options, setOptions] = useState([]);
  const [cantones, setCantones] = useState([]);
  const [evento, setEvento] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
        const response = await getVotingData();
        setResponse(response);
        
        if (response && response.resultados_por_evento) {
            const results = response.resultados_por_evento;

            const dataForTableAndChart = [];

            results.forEach(evento => {
                if (evento && evento.votos_por_lista) {
                    evento.votos_por_lista.forEach(voto => {
                        if (voto) {
                            dataForTableAndChart.push({
                                id: voto.lista, 
                                candidate: voto.lista,
                                votes: voto.total_votos,
                                party: evento.evento_electoral,
                            });
                        }
                    });
                }
            });

            setVotingData(dataForTableAndChart);
        }
    }

    fetchData();
    
  }, [canton, evento_electoral_id]);

  useEffect(() => {
    getEvento();
    getProvincias();
  }, []);

  const getVotingData = async () => {
    try {
      setError(false)
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      // Construir la URL con las variables si tienen un valor válido
      let url = `${DOMAIN}/api/v1/accounts/resultados_votos/`;
  
      if (evento_electoral_id !== null && evento_electoral_id !== undefined && evento_electoral_id !== '') {
        url += `?evento_electoral_id=${evento_electoral_id}`;
      }else{
        setError(true)
        setVotingData([]);
        return null;
      }
  
      if (canton !== null && canton !== undefined && canton !== '') {
        url += `${evento_electoral_id ? '&' : '?'}canton=${canton}`;
      }
  
      if (provincia !== null && provincia !== undefined && provincia !== '') {
        url += `${evento_electoral_id || canton ? '&' : '?'}provincia=${provincia}`;
      }
  
      const response = await axios.get(url, config);
      return response.data;
      
    } catch (error) {
      console.log(error);
      return null; // You can also choose to throw the error or handle it differently.
    }
  };


  const getEvento = async () => {
    try {
      
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      const url = `${DOMAIN}/api/v1/accounts/eventos/`;
  
      const response = await axios.get(url, config);
      setEvento(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };


  const getProvincias = async () => {
    try {
      
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      const url = `${DOMAIN}/api/v1/accounts/provincias/`;
  
      const response = await axios.get(url, config);
      setOptions(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const getCantones = async (id) => {
    try {
      
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      const url = `${DOMAIN}/api/v1/accounts/cantones/${id}`;
  
      const response = await axios.get(url, config);
      setCantones(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const totalVotes = votingData.reduce((total, vote) => total + vote.votes, 0);

  const processedData = votingData.map(vote => ({
    ...vote,
    percentage: `${((vote.votes / totalVotes) * 100).toFixed(2)  }%`
  }));

  const chartData = {
    labels: processedData.map(vote => vote.candidate),
    datasets: [
      {
        label: 'Votos',
        data: processedData.map(vote => vote.votes),
        backgroundColor: processedData.map(() => 'rgba(75, 192, 192, 0.6)'),
        borderColor: processedData.map(() => 'rgba(75, 192, 192, 1)'),
        borderWidth: 1,
      },
    ],
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const getComparator = (order, orderBy) => order === 'desc'
      ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
      : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);

  const sortedData = [...processedData].sort(getComparator(order, orderBy));

  const handleProvincias = (id) => {
    if(id){
      getCantones(id);
    
    }else{
      getCantones();
    }
    setProvincia(id);
  };

  return (
    <Page title="Reportes Electorales">
      <Container>
        <Typography variant="h4" gutterBottom>
          Reportes Electorales
        </Typography>
        {
          error ? (
            <Alert severity="error" style={{marginTop: 10}}>
              <AlertTitle>Selecciona evento electoral</AlertTitle>
              {error}
            </Alert>
          ) : null
        }
        <Card style={{marginTop: 20}}>
          <FormControl sx={{ minWidth: 120, marginTop: 2 }}>
            <InputLabel id="filter-label">Filtrar por evento electoral:</InputLabel>
            <Select
              labelId="filter-label"
              id="filter-select"
              value={evento_electoral_id}
              onChange={(e) => setEventoElectoralId(e.target.value)}
            >
              <MenuItem value="">Todos</MenuItem>
              {evento.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120, marginLeft: 5, marginTop: 2 }}>
            <InputLabel id="filter-label">Filtrar por provincia:</InputLabel>
            <Select
              labelId="filter-label"
              id="filter-select"
              onChange={(e) => handleProvincias(e.target.value)}
            >
              <MenuItem value="">Todos</MenuItem>
              {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120, marginLeft: 5, marginTop: 2 }}>
            <InputLabel id="filter-label">Filtrar por canton:</InputLabel>
            <Select
              labelId="filter-label"
              id="filter-select"
              value={canton}
              onChange={(e) => setCanton(e.target.value)}
            >
              <MenuItem value="">Todos</MenuItem>
              {cantones.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, marginTop: 5 }}>
              <Table>
                <ReportListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={votingData.length}
                  onRequestSort={handleRequestSort}
                />
                
                <TableBody>
                {sortedData.map((row) => {
                    const { id, candidate, votes, party, percentage } = row;
                    return (
                      <TableRow hover key={id}>
                        <TableCell>{candidate}</TableCell>
                        <TableCell>{votes}</TableCell>
                        {/* <TableCell>{party}</TableCell> */}
                        <TableCell>{percentage}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>

        
        {/* <Card style={{ marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom style={{ textAlign: 'center', paddingTop: '10px' }}>
            Gráfica de Votos
          </Typography>
          <Bar data={chartData} />
        </Card> */}
        <Card style={{ marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom style={{ textAlign: 'center', paddingTop: '10px' }}>
            Gráfica de Votos
          </Typography>
          <MyBarChart votingData={response} />
        </Card>
        
      </Container>
      
    </Page>
  );
}
