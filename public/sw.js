navigator.serviceWorker.register("/serviceworker.js", {
    scope: "/"
}).then((registration) => {
    console.log(registration)
})