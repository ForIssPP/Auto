export default function (...args) {
  let newImages = [],
    loadedImages = 0;

  let postaction = function () {};

  function imageloadpost() {
    loadedImages++;
    if (loadedImages === args.length) {
      postaction(newImages);
    }
  }

  args.forEach((e, i) => {
    newImages[i] = new Image();
    newImages[i].src = e;
    newImages[i].onload = function () {
      imageloadpost();
    };
  });

  return {
    onload(callBack) {
      postaction = callBack || postaction;
    }
  }
}