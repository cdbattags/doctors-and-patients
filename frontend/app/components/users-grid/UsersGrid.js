const UsersGrid = ({ match }) => (
  <div>
    <h2>Patients</h2>

    <Route path={`${match.url}/:userId`} component={EditDetails} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
)