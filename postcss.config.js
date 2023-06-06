module.exports = {
  plugins: {
    // ...
    'postcss-px-to-viewport': {
      // options
      unitToConvert: "px",
      viewportWidth: 750,
      unitPrecision: 2,
      propList: [
        "*"
      ],
      viewportUnit: "vw",
      fontViewportUnit: "vw",
      selectorBlackList: [],
      minPixelValue: 2,
      mediaQuery: false,
      replace: true,
      exclude: /(\/|\\)(node_modules)(\/|\\)/,
    }
  }
}

