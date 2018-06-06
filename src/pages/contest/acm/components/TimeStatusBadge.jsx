import { Badge } from 'antd';
import getSetTimeStatus from "../../../../utils/getSetTimeStatus";

export default ({ start, end }) => {
  const status = getSetTimeStatus(start, end);
  return (
    status === 'Pending' ?
      <Badge status="processing" text={status}/>
      :
      status === 'Running' ?
        <Badge status="error" text={status}/>
        :
        <Badge status="success" text={status}/>
  );
};
