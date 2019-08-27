module.exports = {
    plugins: [
        require('precss'),
        require('autoprefixer')({
            overrideBrowserslist: [
                ">0.1%"
            ]
        })
    ]
}