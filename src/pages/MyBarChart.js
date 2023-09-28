import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ApexChart from 'react-apexcharts';
import { BaseOptionChartStyle, BaseOptionChart } from '../components/chart/BaseOptionChart';

const DataVisualization = (votingData) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedVisualization, setSelectedVisualization] = useState('Bar Chart');
  console.log("votingData", votingData);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const renderVisualization = () => {
    switch (selectedVisualization) {
      case 'Bar Chart':
        return <BarChartComponent data={votingData} />;
      case 'Line Chart':
        return <LineChartComponent data={votingData} />;
      case 'Doughnut Chart':
        return <DoughnutChartComponent data={votingData} />;
      case 'Pie Chart':
        return <PieChartComponent data={votingData} />;
      case 'Area Chart':
        return <AreaChartComponent data={votingData} />;
      case 'Radar Chart':
        return <RadarChartComponent data={votingData} />;
      default:
        return <div>Selecciona una visualización</div>;
    }
  };

    function LineChartComponent({ data }) {
        const baseOptions = BaseOptionChart();
    
        if (!data || !data?.votingData?.resultados_por_evento) {
            return <div>No hay datos disponibles.</div>;
        }
    
        const categories = data?.votingData?.resultados_por_evento.reduce((accumulator, evento) => {
            const listas = evento.votos_por_lista.map((voto) => voto.lista);
            return [...accumulator, ...listas];
        }, []);
      
        const seriesData = data?.votingData?.resultados_por_evento.reduce((accumulator, evento) => {
            const votos = evento.votos_por_lista.map((voto) => voto.total_votos);
            return [...accumulator, ...votos];
        }, []);
    
        const options = {
            ...baseOptions,
            xaxis: {
                categories,
            },
        };
        
        const eventos = data?.votingData?.resultados_por_evento;
        
        const totalAusentismoData = eventos.map((evento) => evento.total_ausentismo);
        const totalEmpadronadoData = eventos.map((evento) => evento.total_empadronado);
        const totalVotoBlancoData = eventos.map((evento) => evento.total_voto_blanco);
        const totalVotoNuloData = eventos.map((evento) => evento.total_voto_nulo);
        const totalVotoValidoData = eventos.map((evento) => evento.total_voto_valido);


        const series = [
            {
                name: 'Votos',
                data: seriesData,
            },
            {
                name: 'Total Ausentismo',
                data: totalAusentismoData,
            },
            {
                name: 'Total Voto en Blanco',
                data: totalVotoBlancoData,
            },
            {
                name: 'Total Voto Nulo',
                data: totalVotoNuloData,
            },
            {
                name: 'Total Voto Válido',
                data: totalVotoValidoData,
            },
        ];
    
        return (
        <div>
            <BaseOptionChartStyle />
            <ApexChart options={options} series={series} type="line" height={350} />
        </div>
        );
    }
  
    function DoughnutChartComponent({ data }) {
        const baseOptions = BaseOptionChart();
    
        if (!data || !data?.votingData?.resultados_por_evento) {
            return <div>No hay datos disponibles.</div>;
        }
    
        const categories = data?.votingData?.resultados_por_evento.reduce((accumulator, evento) => {
            const listas = evento.votos_por_lista.map((voto) => voto.lista);
            return [...accumulator, ...listas];
        }, []);
      
        const seriesData = data?.votingData?.resultados_por_evento.reduce((accumulator, evento) => {
            const votos = evento.votos_por_lista.map((voto) => voto.total_votos);
            return [...accumulator, ...votos];
        }, []);
    
        const options = {
        ...baseOptions,
        labels: categories,
        };
    
        const series = seriesData;
        
        return (
        <div>
            <BaseOptionChartStyle />
            <ApexChart options={options} series={series} type="donut" height={350} />
        </div>
        );
    }
  
    function PieChartComponent({ data }) {
        const baseOptions = BaseOptionChart();
    
        if (!data || !data?.votingData?.resultados_por_evento) {
            return <div>No hay datos disponibles.</div>;
        }
    
        const categories = data?.votingData?.resultados_por_evento.reduce((accumulator, evento) => {
            const listas = evento.votos_por_lista.map((voto) => voto.lista);
            return [...accumulator, ...listas];
        }, []);
      
        const seriesData = data?.votingData?.resultados_por_evento.reduce((accumulator, evento) => {
            const votos = evento.votos_por_lista.map((voto) => voto.total_votos);
            return [...accumulator, ...votos];
        }, []);
    
        const options = {
            ...baseOptions,
            labels: categories,
        };
    
        const series = seriesData;
        console.log("series", series);
        return (
        <div>
            <BaseOptionChartStyle />
            <ApexChart options={options} series={series} type="pie" height={350} />
        </div>
        );
    }
  

    function AreaChartComponent({ data }) {
        const baseOptions = BaseOptionChart();
        
        if (!data || !data?.votingData?.resultados_por_evento) {
            return <div>No hay datos disponibles.</div>;
        }
      
        const categories = data?.votingData?.resultados_por_evento.reduce((accumulator, evento) => {
            const listas = evento.votos_por_lista.map((voto) => voto.lista);
            return [...accumulator, ...listas];
        }, []);
      
        const seriesData = data?.votingData?.resultados_por_evento.reduce((accumulator, evento) => {
            const votos = evento.votos_por_lista.map((voto) => voto.total_votos);
            return [...accumulator, ...votos];
        }, []);
      
        const options = {
            ...baseOptions,
            xaxis: {
                categories,
            },
        };
        
        const eventos = data?.votingData?.resultados_por_evento;
        
        const totalAusentismoData = eventos.map((evento) => evento.total_ausentismo);
        const totalEmpadronadoData = eventos.map((evento) => evento.total_empadronado);
        const totalVotoBlancoData = eventos.map((evento) => evento.total_voto_blanco);
        const totalVotoNuloData = eventos.map((evento) => evento.total_voto_nulo);
        const totalVotoValidoData = eventos.map((evento) => evento.total_voto_valido);

        const series = [
            {
                name: 'Votos',
                data: seriesData,
            },
            {
                name: 'Total Ausentismo',
                data: totalAusentismoData,
            },
            {
                name: 'Total Voto en Blanco',
                data: totalVotoBlancoData,
            },
            {
                name: 'Total Voto Nulo',
                data: totalVotoNuloData,
            },
            {
                name: 'Total Voto Válido',
                data: totalVotoValidoData,
            },
        ];
      
        return (
          <div>
            <BaseOptionChartStyle />
            <ApexChart options={options} series={series} type="area" height={350} />
          </div>
        );
    }

    function RadarChartComponent({ data }) {
        const baseOptions = BaseOptionChart();
      
        if (!data || !data?.votingData?.resultados_por_evento) {
            return <div>No hay datos disponibles.</div>;
        }
      
        const categories = data?.votingData?.resultados_por_evento.reduce((accumulator, evento) => {
            const listas = evento.votos_por_lista.map((voto) => voto.lista);
            return [...accumulator, ...listas];
        }, []);
      
        const seriesData = data?.votingData?.resultados_por_evento.reduce((accumulator, evento) => {
            const votos = evento.votos_por_lista.map((voto) => voto.total_votos);
            return [...accumulator, ...votos];
        }, []);
      
        const options = {
            ...baseOptions,
            xaxis: {
                categories,
            },
        };

        const eventos = data?.votingData?.resultados_por_evento;
        
        const totalAusentismoData = eventos.map((evento) => evento.total_ausentismo);
        const totalEmpadronadoData = eventos.map((evento) => evento.total_empadronado);
        const totalVotoBlancoData = eventos.map((evento) => evento.total_voto_blanco);
        const totalVotoNuloData = eventos.map((evento) => evento.total_voto_nulo);
        const totalVotoValidoData = eventos.map((evento) => evento.total_voto_valido);

        const series = [
            {
                name: 'Votos',
                data: seriesData,
            },
            {
                name: 'Total Ausentismo',
                data: totalAusentismoData,
            },
            {
                name: 'Total Voto en Blanco',
                data: totalVotoBlancoData,
            },
            {
                name: 'Total Voto Nulo',
                data: totalVotoNuloData,
            },
            {
                name: 'Total Voto Válido',
                data: totalVotoValidoData,
            },
        ];
      
        return (
          <div>
            <BaseOptionChartStyle />
            <ApexChart options={options} series={series} type="radar" height={350} />
          </div>
        );
    }

    /*
    function BarChartComponent({ data }) {
        const baseOptions = BaseOptionChart();
    
        if (!data || !data?.votingData?.resultados_por_evento) {
            return <div>No hay datos disponibles.</div>;
        }
    
        const eventos = data?.votingData?.resultados_por_evento;
        const categories = eventos.map((evento) => evento.evento_electoral);
    
        // Preparar datos para las barras adicionales
        const totalAusentismoData = eventos.map((evento) => evento.total_ausentismo);
        const totalEmpadronadoData = eventos.map((evento) => evento.total_empadronado);
        const totalVotoBlancoData = eventos.map((evento) => evento.total_voto_blanco);
        const totalVotoNuloData = eventos.map((evento) => evento.total_voto_nulo);
        const totalVotoValidoData = eventos.map((evento) => evento.total_voto_valido);
    
        const options = {
            ...baseOptions,
            xaxis: {
                categories,
            },
        };
        
        const series = [
            {
                name: 'Votos',
                data: categories.map((evento, index) => ({
                    evento,
                    votos: data?.votingData?.resultados_por_evento[index].votos_por_lista.map((voto) => voto.total_votos),
                })),
            },
            {
                name: 'Total Ausentismo',
                data: totalAusentismoData,
            },
            {
                name: 'Total Empadronado',
                data: totalEmpadronadoData,
            },
            {
                name: 'Total Voto en Blanco',
                data: totalVotoBlancoData,
            },
            {
                name: 'Total Voto Nulo',
                data: totalVotoNuloData,
            },
            {
                name: 'Total Voto Válido',
                data: totalVotoValidoData,
            },
        ];
    
        return (
            <div>
                <BaseOptionChartStyle />
                <ApexChart options={options} series={series} type="bar" height={350} />
            </div>
        );
    }
    */
    function BarChartComponent({ data }) {
        const baseOptions = BaseOptionChart();
        console.log("datawwwassa", data?.votingData);
        if (!data || !data?.votingData?.resultados_por_evento) {
            return <div>No hay datos disponibles.</div>;
        }
      
        const categories = data?.votingData?.resultados_por_evento.reduce((accumulator, evento) => {
            const listas = evento.votos_por_lista.map((voto) => voto.lista);
            return [...accumulator, ...listas];
        }, []);
      
        const seriesData = data?.votingData?.resultados_por_evento.reduce((accumulator, evento) => {
            const votos = evento.votos_por_lista.map((voto) => voto.total_votos);
            return [...accumulator, ...votos];
        }, []);
        
        const options = {
            ...baseOptions,
            xaxis: {
                categories,
            },
        };

        const eventos = data?.votingData?.resultados_por_evento;

        const totalAusentismoData = eventos.map((evento) => evento.total_ausentismo);
        const totalEmpadronadoData = eventos.map((evento) => evento.total_empadronado);
        const totalVotoBlancoData = eventos.map((evento) => evento.total_voto_blanco);
        const totalVotoNuloData = eventos.map((evento) => evento.total_voto_nulo);
        const totalVotoValidoData = eventos.map((evento) => evento.total_voto_valido);

        const series = [
            {
                name: 'Votos',
                data: seriesData,
            },
            {
                name: 'Total Ausentismo',
                data: totalAusentismoData,
            },
            {
                name: 'Total Voto en Blanco',
                data: totalVotoBlancoData,
            },
            {
                name: 'Total Voto Nulo',
                data: totalVotoNuloData,
            },
            {
                name: 'Total Voto Válido',
                data: totalVotoValidoData,
            },
        ];
      
        return (
          <div>
            <BaseOptionChartStyle />
            <ApexChart options={options} series={series} type="bar" height={350} />
          </div>
        );
    }

  return (
    <div>
      <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
        <DropdownToggle caret>
          {selectedVisualization}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setSelectedVisualization('Bar Chart')}>Bar Chart</DropdownItem>
          <DropdownItem onClick={() => setSelectedVisualization('Line Chart')}>Line Chart</DropdownItem>
          <DropdownItem onClick={() => setSelectedVisualization('Doughnut Chart')}>Doughnut Chart</DropdownItem>
          <DropdownItem onClick={() => setSelectedVisualization('Pie Chart')}>Pie Chart</DropdownItem>
          <DropdownItem onClick={() => setSelectedVisualization('Area Chart')}>Area Chart</DropdownItem>
          <DropdownItem onClick={() => setSelectedVisualization('Radar Chart')}>Radar Chart</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div className="visualization-content">
        {votingData ? renderVisualization() : <div>Cargando datos...</div>}
      </div>
    </div>
  );
};

export default DataVisualization;
