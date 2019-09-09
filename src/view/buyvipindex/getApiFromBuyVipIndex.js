export default function (type, data, resolve, reject) {
  $.ajax({
    url: `./index.php?g=appapi&m=Mall&a=${type}`,
    data,
    type: "GET",
    dataType: "json",
    success(res) {
      res && resolve ? resolve(res) : reject(res);
    },
    error(e) {
      console.log(e);
    }
  });
  if (this && this !== window) return this;
}