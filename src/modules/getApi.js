import $ from 'jquery';

export default function (type, data, resolve, reject) {
  if (!reject) {
    return console.error('Reject is not defined');
  }
  $.ajax({
    url: `./api/public/appapi/?service=${type}`,
    data,
    type: 'GET',
    success(res) {
      res && res.data && res.data.info && resolve ? resolve(res.data.info) : reject(res);
    },
    error(e) {
      console.log(e);
    }
  })
  if (this && this !== window) return this;
}