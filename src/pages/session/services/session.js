import api from '../../../configs/api';
import request from '../../../utils/request';

export function fetch() {
  return request(api.session.status);
}
