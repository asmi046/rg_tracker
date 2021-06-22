module.exports = {
    
    pwa: {
      name: 'RubEx MSE',
      themeColor: '#C4041C',
      msTileColor: '#000000',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black',
  

      iconPaths:{
        favicon32: './favicon/icon32.png',
        favicon16: './favicon/icon16.png',
        appleTouchIcon: './favicon/icon256.png',
        maskIcon: './favicon/icon256.png',
        msTileImage: './favicon/icon256.png'
      },
      // настройки манифеста
      manifestOptions: {
        name: 'RubEx MSE',
        short_name: 'RG MSE',
        start_url:"/index.html",
        display: 'standalone',
        background_color: '#C40411',
        icons:[ 
            { 'src': './favicon/icon256.png', 'sizes': '192x192', 'type': 'image/png' }, 
            { 'src': './favicon/icon256.png', 'sizes': '512x512', 'type': 'image/png' }, 
            { 'src': './favicon/icon256.png', 'sizes': '192x192', 'type': 'image/png', 'purpose': 'maskable' }, 
            { 'src': './favicon/icon256.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'maskable' } ]
      },
  
      workboxOptions: {
        exclude: [".htaccess"]
      }
    }
  }