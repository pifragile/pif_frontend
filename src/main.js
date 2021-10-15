import { h, createApp} from 'vue';

import App from './App';
import DotFlow from './DotFlow';

const NotFoundComponent = { template: '<p>Page not found</p>' }

const routes = {
  '/': App,
  '/dotflow': DotFlow
}

const SimpleRouter = {
  data: () => ({
    currentRoute: window.location.pathname
  }),

  computed: {
    CurrentComponent() {
      return routes[this.currentRoute] || NotFoundComponent
    }
  },

  render() {
    return h(this.CurrentComponent)
  }
}

createApp(SimpleRouter).mount('#app')