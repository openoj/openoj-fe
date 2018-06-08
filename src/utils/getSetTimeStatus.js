import moment from 'moment';

export default function(startTime, endTime, currentTime) {
  if(moment(currentTime).isBefore(startTime)) {
    return 'Pending';
  }
  else if(moment(currentTime).isSame(endTime) || moment(currentTime).isAfter(endTime)) {
    return 'Ended';
  }
  else {
    return 'Running';
  }
}
