import { get } from '../../../utils/request';
import apis from '../../../configs/apis';
import limits from '../../../configs/limits';
import convertLikeQuery from "../../../utils/convertLikeQuery";

export async function getList(query) {
  if(!query.page) {
    query.page = 1;
  }
  convertLikeQuery(query, ['title']);
  let params = {
    offset: (query.page - 1) * limits.problem.list,
    limit: limits.problem.list,
    ...query,
  };
  let ret = await get(apis.problem.index, params);
  return {
    data: ret.results,
    page: query.page,
    total: Math.floor((ret.count - 1) / limits.problem.list + 1),
    title: ret.title ? ret.title : null,
  };
}

export function getDetail(id) {
  return get(`${apis.problem.index}id/`);
}
