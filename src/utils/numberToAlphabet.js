export default function (number) {
    number = parseInt(number, 10);
    let radix = 26;
    let cnt = 1;
    let p = radix;
    while(number >= p) {
      number -= p;
      cnt++;
      p *= radix;
    }
    let res = [];
    for(; cnt>0; cnt--) {
      res.push(String.fromCharCode(number%radix+65));
      number /= radix;
    }
    return res.reverse().join('');
}
