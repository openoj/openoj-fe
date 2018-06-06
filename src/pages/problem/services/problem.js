import { get } from '../../../utils/request';
import apis from '../../../configs/apis';
import limits from '../../../configs/limits';

export async function getList(query) {
  let params = {
    offset: (query.page - 1) * limits.problem,
    limit: limits.problem,
  };
  if(query.title) {
    params.title = query.title;
  }
  let ret = await get(apis.problem.index, params);
  return {
    data: ret.results,
    page: query.page,
    total: Math.floor((ret.count - 1) / limits.problem + 1),
    title: ret.title ? ret.title : null,
  };
}

export function getDetail(id) {
  return get(`${apis.session.index}id`);
}
