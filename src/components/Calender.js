import React, { useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Container from '@material-ui/core/Container';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import PersonIcon from '@material-ui/icons/Person';
import EventNoteIcon from '@material-ui/icons/EventNote';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

// Styles 
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    margin: '0 auto'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// Fade Effect Component
const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

// Setting warna background untuk tanggal hari ini yang ditentukan
const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  });

const Calendarr = ({ events, handleSetEvent }) => {
  const classes = useStyles();
  const localizer = momentLocalizer(moment) // or globalizeLocalizer
  let allViews = Object.keys(Views).map(k => Views[k])

  // Local State
  const [openModal, setOpenModal] = React.useState(false); // boolean
  const [eventSelect, setEventSelect] = useState({
    nama: '',    
    title: '',
    start: '',
    end: '', 
  }) // object

  // Method untuk menghandle perubaahan pada state eventSelect
  const handleSetEventSelect = (event) => {
    setEventSelect({
      nama: event.nama,
      kegiatan: event.title, 
      start: moment(new Date(event.start)).format('lll'), 
      end: moment(new Date(event.end)).format('lll')
    });

    // Setelah berhasil mengisi nilai pada state eventSelect, lanjut membuka modal
    // Data pada modal berisi nilai state eventSelect jadi nilai eventSelect wajib ada sebelum modal ditampilkan
    setOpenModal(true);
  }

  // Method untuk handle tutup modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container style={{height: '100vh'}}>
      <Calendar
        events={events}
        views={allViews}
        defaultDate={new Date(2020, 11, 15)}
        components={{
          timeSlotWrapper: ColoredDateCellWrapper,
        }}
        localizer={localizer}
        onSelectEvent={event => handleSetEventSelect(event)}
        onSelectSlot={handleSetEvent}
      />
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title"><EventNoteIcon /> {eventSelect.kegiatan}</h2>
            <p id="spring-modal-description"><PersonIcon /> nama: {eventSelect.nama}</p>
            <p id="spring-modal-description"><EventAvailableIcon /> Waktu Pelaksanaan: {eventSelect.start} - {eventSelect.end}</p>
          </div>
        </Fade>
      </Modal>
    </Container>
  );  
}  

export default Calendarr;