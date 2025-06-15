export function dataDesensitization(
  data: string,
  flag: string,
  befor: number,
  after: number,
) {
  const str = data + '';
  if (flag === 'tel') {
    // let reg = new RegExp(`(\d{${ befor?befor:3 }})\d*(\d{${ after?after:3 }})`);
    return str.replace(
      new RegExp(`(\\d{${befor ? befor : 3}})\\d*(\\d{${after ? after : 3}})`),
      '$1****$2',
    );
  } else if (flag === 'identity') {
    return str.replace(
      new RegExp(`(\\d{${befor ? befor : 1}})\\d*(\\d{${after ? after : 1}})`),
      '$1***********$2',
    );
  } else if (flag === 'name') {
    return str.slice(0, 1) + '*'.repeat(str.length - 1);
  } else if (flag === 'email') {
    if (str.lastIndexOf('@') != -1) {
      return (
        str.slice(0, befor ? befor : 1) +
        '******' +
        str.slice(str.lastIndexOf('@'))
      );
    }
  } else if (flag === 'bank') {
    return (
      str.substring(0, befor ? befor : 4) +
      '*********' +
      str.substring(str.length - (after ? after : 3))
    );
  }

  return data;
}
