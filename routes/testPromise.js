// let data = "";

const func = async (data) => {
  //   let result = "";
  //   data += `${data} ${timeOut}\n`;

  var promise = new Promise(function (resolve, reject) {
    const timeOut = Math.floor(Math.random() * 5) + 1;

    setTimeout(function () {
      resolve(`${data}: ${timeOut}`);
    });
  });
  return promise;
};

const array = [1, 2, 3];

// const testPromise = array.map(async (item) => {
//   await func(item);
// })
(async () => {
  for (let job of array.map(
    (item) => () =>
      new Promise((resolve, reject) => {
        try {
          resolve(func(item));
        } catch (error) {
          reject(error);
        }
      })
  )) {
    const result = await job();
    console.log(result);
  }
})();
