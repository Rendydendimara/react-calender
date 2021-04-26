import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

// Styles
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  ButtonClick: {
  	display: 'flex',
  	justifyContent: 'center',
  	padding: '10px'
  },
  button: {
  	marginRight: '10px'
  }
});

const FormData = ({ handleSetEvent }) => {
  // Local state
  const [nama, setNama] = useState('');
  const [kegiatan, setKegiatan] = useState('');
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(true);
  const [waktuPelaksanaanMulai, setWaktuPelaksanaanMulai] = useState(undefined);
  const [waktuPelaksanaanBerakhir, setWaktuPelaksanaanBerkahir] = useState(undefined);
  const classes = useStyles();

  // Mtehod untuk menghandle perubahan state nama
  const handleChangeNama = (e) => {
    setNama(e.target.value);
  } 

  // Mtehod untuk menghandle perubahan state kegiatan
  const handleChangeKegiatan = (e) => {
    setKegiatan(e.target.value);
  } 

  // Mtehod untuk menghandle perubahan state waktu pelaksanaan mulai
  const handleChangeWaktuPelaksanaanMulai = (e) => {
    setWaktuPelaksanaanMulai(e.target.value);
  } 

  // Mtehod untuk menghandle perubahan state waktu pelaksanaan berakhir
  const handleChangeWaktuPelaksanaanBerakhir = (e) => {
    setWaktuPelaksanaanBerkahir(e.target.value);
  } 

  // Mtehod untuk menghandle reset seluruh state local
  const handleReset = () => {
    setNama('');
    setKegiatan('');
    setWaktuPelaksanaanMulai('');
    setWaktuPelaksanaanBerkahir('');
  } 

  // Mtehod untuk menghandle saat menambahkan event/kegiatan
  const handleOnSubmit = (e) => {
  	e.preventDefault();
  	// Memanggil method handleSetEvent sambil memberikan data kegiatan
  	handleSetEvent({nama, kegiatan, waktuPelaksanaanMulai, waktuPelaksanaanBerakhir});
  	// Membersihkan state lokal
  	handleReset();
  	// Membuat tombol submit/tambahkan kegiatan di aktifkan kembali
  	setIsLoadingSubmit(false);
  }

  // Mengecek perubahan yang ada pada state lokal dengan useEffect()
  useEffect(() => {
  	// Cek apakaah semua values sudah terisi atau belum
	const checkAlreadyValues = () => {
	  if(nama && kegiatan && waktuPelaksanaanMulai && waktuPelaksanaanBerakhir) return false; // data sudah terisi lengkap
	  else return true; // data belum terisi lengkap
	}

  	// Menghandle konsisi tombol submit, aktif atau nonaktif
  	// Jika data state lokal belum terisis maka tombol submit akan dinonaktifkan sementara
  	// Jika data state lokal sudah terisi maka tombol submit akan aktif 
    setIsLoadingSubmit(checkAlreadyValues());  	
  }, [nama, kegiatan, waktuPelaksanaanMulai, waktuPelaksanaanBerakhir]);
 
  return (
    <Container>
	  <Grid container spacing={1}>
	    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
	      <form autoComplete="off">
			<TextField
		      placeholder="Masukan Nama Kamu"
		      label="Nama"
		      onChange={handleChangeNama}
		      defaultValue={nama}
		      variant="outlined"
		      margin="normal"
		      fullWidth
		      value={nama}
		    />
			<TextField
		      placeholder="Masukan Kegiatan Kami"
		      label="Kegiatan"
		      onChange={handleChangeKegiatan}
		      defaultValue={kegiatan}
		      variant="outlined"
		      margin="normal"
		      value={kegiatan}
		      fullWidth
		    />
		    <Grid container spacing={1}>
		      <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
			    <TextField
			      id="date"
			      label="Waktu Mulai"
			      type="datetime-local"
			      variant="outlined"
			      onChange={handleChangeWaktuPelaksanaanMulai}
			      margin="normal"
			      value={waktuPelaksanaanMulai}
			      fullWidth
	 	       	  InputLabelProps={{
			        shrink: true,
			      }}
			    />
		      </Grid>
		      <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
			    <TextField
			      id="date"
			      label="Waktu Berakhir"
			      type="datetime-local"
			      variant="outlined"
			      onChange={handleChangeWaktuPelaksanaanBerakhir}
			      margin="normal"
			      value={waktuPelaksanaanBerakhir}
			      fullWidth
			      InputLabelProps={{
			        shrink: true,
			      }}
			    />
		      </Grid>
	        </Grid>
		    <div className={classes.ButtonClick}>
		      <Button
		        variant="contained"
		        color="primary"
		        size="small"
		        onClick={handleOnSubmit}
		        type="submit"
		 	 	disabled={isLoadingSubmit}
		        startIcon={<AddIcon />}
		        className={classes.button}
		      > Tambahkan
		      </Button>
		      <Button
		        variant="contained"
		        color="primary"
		        size="small"
		        onClick={handleReset}
		        startIcon={<RotateLeftIcon />}
		        className={classes.button}
		      > Reset
		      </Button>
		    </div>
		  </form>
	    </Grid>
	    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
		  <Card>
		    <CardContent>
			  <Typography className={classes.title} color="textSecondary" gutterBottom>
			    Kegiatan
			  </Typography>
			  <Typography variant="body2" component="p">
			    Nama: {nama}
			  </Typography>
			  <Typography variant="body2" component="p">
			    Kegiatan: {kegiatan}
			  </Typography>
			  <Typography variant="body2" component="p">
			    Waktu Pelaksanaan: {waktuPelaksanaanMulai} - {waktuPelaksanaanBerakhir}
			  </Typography>
			</CardContent>
		  </Card>
	    </Grid>
	  </Grid>
  	</Container>
  )
};

export default FormData;