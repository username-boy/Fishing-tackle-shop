const {defineConfig} = require('@vue/cli-service')
const path = require("path")

// 按需引入vant组件库样式
const {VantResolver} = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
	plugins: [
	  ComponentsPlugin({
		resolvers: [VantResolver()],
	  }),
	],
  },
  pluginOptions: {
	'style-resources-loader': {
	  preProcessor: 'less',
	  patterns: [
		path.resolve(__dirname,"./src/styles/index.less")
	  ],
	},
  },
})
