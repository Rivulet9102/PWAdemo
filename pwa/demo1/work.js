let total = 0
for (let index = 0; index < 1000000; index++) {
    total += 1
}

// console.log(total);
self.postMessage({total:total})