import React, { useState } from 'react';
import FormData from './components/FormData';
import Calender from './components/Calender';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// Styles
const useStyles = makeStyles({
  header: {
    marginTop: '20px',
  } 
})

function App() {
  // Global State 
  const [events, setEvents] = useState([{}]); // State Array of Object yang menyimpan seluruh event/kegiatan

  const classes = useStyles();

  // Method untuk mengupdate/menambahkan daftar kegiatan/event
  // Menerima parameter berupa objct yang langsung di extract
  const handleSetEvent = ({ nama, kegiatan, waktuPelaksanaanMulai, waktuPelaksanaanBerakhir }) => {
    // Update state array events dengan melakukan push menggunakan metode ES6 
    setEvents(oldEvent => [...oldEvent, {
      id: events.length,
      nama: nama,
      title: kegiatan,
      start: new Date(waktuPelaksanaanMulai), // convert ke format tanggal
      end: new Date(waktuPelaksanaanBerakhir), // convert ke format tanggal
    }]);
  }

  return (
    <div className={classes.header}>
      <main>
        <Grid container spacing={1}>
          <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
            <FormData handleSetEvent={handleSetEvent} />
          </Grid>
          <Grid item xl={9} lg={9} md={9} sm={12} xs={12}>
            <Calender events={events} handleSetEvent={handleSetEvent} />
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default App;
