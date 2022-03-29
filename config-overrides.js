const webpack = require('webpack');

module.exports = function override(config, env) {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve('crypto-browserify'),
        https: require.resolve('https-browserify'),
        http: require.resolve('stream-http'),
        url: require.resolve('url'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
    };
    config.plugins.push(
        ...[
            // Work around for Buffer is undefined:
            // https://github.com/webpack/changelog-v5/issues/10
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }),
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
        ]
    );

    return config;
};
