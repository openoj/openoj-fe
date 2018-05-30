import { message } from 'antd';
import constants from '../configs/constants';

export default {
  onError(e) {
    message.error(e.message, constants.msgDuration.error);
  },
};
