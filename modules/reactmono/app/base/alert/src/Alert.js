import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ducks from './ducks';

const { action: { removeAlert } } = ducks;

const Alert = ({ alerts, removeAlert }) => {
    const getIconType = (type) => {
        switch (type) {
            case 'success':
                return 'done';

            case 'warning':
                return 'info';

            default:
                return type;
        }
    };

    return (
        alerts &&
        alerts.length > 0 &&
        <div className={'alerts-area'}>
            {alerts.map(alert => (
                alert.id &&
                <div key={`${alert.id}`} id={`alert-${alert.id}`} className={`alert alert-${alert.type}`}
                    style={{left: alert.position}}>
                    <div className={'alert-column icon-wrapper'}>
                        <i className={`material-icons icon-${alert.type}`}>{getIconType(alert.type)}</i>
                    </div>
                    <div className={'alert-column alert-message'}>
                        <div className={'alert-row alert-title'}>
                            <span>{alert.type}</span>
                        </div>
                        <div className={'alert-row alert-text'}>
                            <span>{alert.msg}</span>
                        </div>
                    </div>
                    <div className={'alert-column alert-close'}
                         onClick={(e) => removeAlert(alert.id)}>
                        <span className="button-close"><wbr/></span>
                    </div>
                </div>
            ))}
        </div>
    );
};

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
    removeAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps, { removeAlert } )(Alert);
