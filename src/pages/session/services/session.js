import api from '../../../configs/api';
import { get, post } from '../../../utils/request';

export function fetch() {
  return get(api.session.status);
}

export function login(data) {
  return post(api.session.login, data);
}
