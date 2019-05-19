const asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers')
            }
        }, 1500);
    });
};

asyncAdd(4, 'a').then((res) => {
    console.log('Res: ', res);
    return asyncAdd(res, 22);
}).then((res) => {
    console.log('Res: ', res);
}).catch((errorMessage) => {
    console.log(errorMessage);
});

// const somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Hey. It worked!');
//         reject('Unable to fulfill promise');
//     }, 2500);
// });

// somePromise.then((message) => {
//     console.log('Success: ', message);
// }, (errorMessage) => {
//     console.log('Error: ', errorMessage);
// });