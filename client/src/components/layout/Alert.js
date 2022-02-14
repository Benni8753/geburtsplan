import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert as MuiAlert } from '@mui/material';

const Alert = ({ alerts }) => (
  <div className='alert-wrapper'>
    {alerts.map((alert) => (
      <MuiAlert key={alert.id} severity={alert.alertType}>
        {alert.msg}
      </MuiAlert>
    ))}
  </div>
);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
