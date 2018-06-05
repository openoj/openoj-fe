import { message } from 'antd';
import constants from "../configs/constants";

export default function (data) {
  if(!data.msg) return;
  if(data.result === 'success') {
    message.success(data.msg, constants.msgDuration.success);
  }
  else if(data.result === 'error') {
    message.error(data.msg, constants.msgDuration.error);
  }
}
