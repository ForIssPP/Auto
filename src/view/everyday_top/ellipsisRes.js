export default function (res) {
  return res.map(e => {
    const totalcoin = e.totalcoin;
    if (1e8 > totalcoin && totalcoin > 1e6) {
      e.totalcoin = Math.ceil(totalcoin / 1e3) / 10 + "万";
    } else if (1e8 < totalcoin) {
      e.totalcoin = Math.ceil(totalcoin / 1e7) / 10 + "亿";
    }
    return e;
  });;
}