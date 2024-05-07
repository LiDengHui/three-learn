let publicPath = 'three-learn';
if (process.env.NODE_ENV === 'development') {
    publicPath = './';
}
module.exports = {
    publicPath,
};
