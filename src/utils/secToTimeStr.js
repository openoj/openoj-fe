function preZeroFill(num, size) {
  if(num >= Math.pow(10, size)) {
    return num.toString();
  }
  else {
    let str = Array(size + 1).join('0') + num;
    return str.slice(str.length - size);
  }
}

export default function secToTimeStr(sec, showDay = false) {
  let d;
  if(showDay) {
    let d = parseInt(sec / 86400, 10);
    sec %= 86400;
  }
  let h = parseInt(sec / 3600, 10);
  sec %= 3600;
  let m = parseInt(sec / 60, 10);
  sec %= 60;
  let s = parseInt(sec, 10);
  let str_d = '';
  if(showDay && d >= 1) {
    str_d = d + 'D ';
  }
  if(sec < 0) {
    return '--';
  }
  else return str_d + preZeroFill(h, 2) + ":" + preZeroFill(m, 2) + ":" + preZeroFill(s, 2);
}
