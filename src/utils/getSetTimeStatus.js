import moment from 'moment';

export default function(startTime, endTime) {
  if(moment().isBefore(startTime)) {
    return 'Pending';
  }
  else if(moment().isSame(endTime) || moment().isAfter(endTime)) {
    return 'Ended';
  }
  else {
    return 'Running';
  }
}
