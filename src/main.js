import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueApollo from 'vue-apollo'
import ApolloClient from 'apollo-boost'

Vue.use(Buefy)
Vue.use(VueApollo)
Vue.config.productionTip = false

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'http://crow.gg'
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})
