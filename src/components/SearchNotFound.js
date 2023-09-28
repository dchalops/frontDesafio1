import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        No encontrado
      </Typography>
      <Typography variant="body2" align="center">
        No se han encontrado resultados para &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Intente verificar errores tipográficos o usar palabras completas.
      </Typography>
    </Paper>
  );
}
