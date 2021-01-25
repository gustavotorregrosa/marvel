import React from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router'
import Stories from './pages/stories'

class App extends React.Component {

  render() {


    return (
      <div>
        <Switch>
          <Route path="/stories" exact component={Stories} />
          <Redirect path="/*" to='/stories' />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
