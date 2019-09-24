const { override, fixBabelImports, addLessLoader } = require('customize-cra');


module.exports = override(
     fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
       }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#CC9933',
            '@error-color': 'orange',
        },
    }),
 );
