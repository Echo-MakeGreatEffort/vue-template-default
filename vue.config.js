const { defineConfig } = require('@vue/cli-service');
const resolve = (dir) => require('path').join(__dirname, dir);

module.exports = defineConfig({
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'assets',
    indexPath: 'index.html',
    productionSourceMap: false,
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8080,
        https: false
    },
    chainWebpack: (config) => {
        // 通过 style-resources-loader 来添加less全局变量
        const oneOfsMap = config.module.rule('less').oneOfs.store;
        oneOfsMap.forEach((item) => {
            item.use('style-resources-loader')
                .loader('style-resources-loader')
                .options({
                    patterns: ['./src/assets/common.less']
                })
                .end();
        });
        // 将svg图片以雪碧图的方式在项目中加载
        config.module
            .rule('svg')
            .test('/.svg$/')
            .include.add(resolve('src/assets/svg'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader');

        // 别名
        config.resolve.alias.set('@', resolve('src'));

        //优化
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer('terser').tap((args) => {
                args[0].terserOptions.compress.drop_console = true;
                args[0].terserOptions.compress.drop_debugger = true;
                return args;
            });
            config.optimization.splitChunks({
                common: {
                    name: 'common',
                    chunks: 'all',
                    minSize: 1,
                    minChunks: 2,
                    priority: 1
                },
                vendor: {
                    name: 'chunk-libs',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10
                }
            });
        }
    }
});
