export default function ($event) {
  $event && $event.target ? $event.target.src = './default.jpg' : console.error('获取元素错误！');
  if (this && this !== window) return this;
}