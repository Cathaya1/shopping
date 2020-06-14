module.exports = {
  presets: [
    '@vue/app'
  ],
  ignore: [
    './src/lib/mui/js/*.js'
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "mint-ui",
        "style": true
      }
    ]
  ]
}
