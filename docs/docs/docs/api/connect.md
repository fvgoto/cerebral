# Connect

## Choosing a view type
Cerebral technically can use any view layer. Currently it officially supports [React](https://facebook.github.io/react/) and [Inferno](http://infernojs.org/). From a Cerebral perspective they have the exact same API, you just have to choose to import from **cerebral/react** or **cerebral/inferno**. For specific API differences of the two view libraries please check their documentation.

Choose React if you want a huge ecosystem of shared components and documentation. Inferno is faster than React and is recommended to be used when you do not depend heavily on 3rd party components.

## Connecting the controller
```js
import React from 'react'
import {render} from 'react-dom'
import {Controller} from 'cerebral'
import {Container} from 'cerebral/react'
import App from './components/App'

const controller = Controller()

render((
  <Container controller={controller}>
    <App />
  </Container>
), document.querySelector('#app'))
```

## Exposing state
```js
import React from 'react'
import {connect} from 'cerebral/react'
import {state} from 'cerebral/tags'

export default connect({
  isLoading: state`app.isLoading`
},
  function App(props) {
    props.isLoading
  }
)
```

Expose state based on props passed to component:

```js
import React from 'react'
import {connect} from 'cerebral/react'
import {state, props} from 'cerebral/tags'

export default connect({
  isLoading: state`${props`module`}.isLoading`
},
  function App(props) {
    props.isLoading
  }
)
```

## Exposing signals
```js
import React from 'react'
import {connect} from 'cerebral/react'
import {signal} from 'cerebral/tags'

export default connect({
  clicked: signal`app.somethingClicked`
},
  function App(props) {
    props.clicked
  }
)
```

Expose signals based on props passed to component:

```js
import React from 'react'
import {connect} from 'cerebral/react'
import {signal, props} from 'cerebral/tags'

export default connect({
  clicked: signal`${props.module}.somethingClicked`
},
  function App(props) {
    props.clicked
  }
)
```

## Strict rendering
Due to Cerebrals "render on path change" it is possible to optimize component rendering.

```js
import React from 'react'
import {render} from 'react-dom'
import {Controller} from 'cerebral'
import {Container} from 'cerebral/react'
import App from './components/App'

const controller = Controller({
  options: {strictRender: true}
})

render((
  <Container controller={controller}>
    <App />
  </Container>
), document.querySelector('#app'))
```

Now your components will only render when the exact state path defined changes:

```js
import React from 'react'
import {connect} from 'cerebral/react'
import {state} from 'cerebral/tags'

export default connect({
  isLoading: state`app.isLoading`
},
  function App(props) {
    props.isLoading
  }
)
```

This component will only render when exactly **app.isLoading** changes. It will not change if there is a change to path: **app** or **app.isLoading.foo**.

With **strict mode** Cerebral automatically adds interest in child paths on objects and arrays. So for example a component showing a list renders when some nested path has a change:

```js
import React from 'react'
import {connect} from 'cerebral/react'
import {state} from 'cerebral/tags'

export default connect({
  list: state`app.list`
  // Is actually: list: state`app.list.**`
},
  function App(props) {
    props.list
  }
)
```

Sometimes you want to optimize as the list is only interested in changes to the keys of an object or items in the array. For example when you have a list of users, you only want to rerender the list itself when keys are added/removed from the map:

```js
import React from 'react'
import {connect} from 'cerebral/react'
import {state} from 'cerebral/tags'

export default connect({
  users: state`app.users.*`
},
  function App(props) {
    Object.keys(props.users)
  }
)
```

There is one **gotchas** with strict mode though:

Lets say you point to path **app.isLoading** in a component. If you change out **app** path, the component will not render. This throws an error and tell you to not replace the **app** path or change the component dependency to be **app** instead
