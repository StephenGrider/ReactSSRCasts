import { baseConfig as config } from '~app/etc/base';

export const getStateVar = () => {
    return config.initialStateVarName || 'initialState';
};
