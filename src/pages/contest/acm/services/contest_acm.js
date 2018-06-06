import { get } from '../../../../utils/request';
import apis from '../../../../configs/apis';
import limits from '../../../../configs/limits';
import convertLikeQuery from '../../../../utils/convertLikeQuery';

export async function getList(query) {
  if(!query.page) {
    query.page = 1;
  }
  delete query.type;
  const originalQuery = {...query};
  convertLikeQuery(query, ['title']);
  let params = {
    offset: (query.page - 1) * limits.contest.acm.list,
    limit: limits.contest.acm.list,
    type: 'acm_contest',
    ...query,
  };
  let ret = await get(apis.contest.acm.index, params);
  return {
    data: ret.results,
    page: parseInt(originalQuery.page, 10),
    total: ret.count,
    title: originalQuery.title,
  };
}

export function getDetail(id) {
  return get(`${apis.contest.acm.index}id/`);
}
