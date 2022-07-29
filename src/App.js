import { Switch, Route, Redirect } from "react-router-dom";

import AllQuotes from "./pages/AllQuotes";
import DetailQuote from "./pages/DetailQuote";
import NewQuote from "./pages/NewQuote";
import NoDataFound from "./pages/NoDataFound";
import Layout from "./components/layout/Layout";


function App() {
  return (
    <Layout >
    <Switch>
      <Route path='/' exact>
        <Redirect to='/quotes' />
      </Route>
      <Route path='/quotes' exact>
        <AllQuotes />
      </Route>
      <Route path='/quotes/:quoteID'>
        <DetailQuote />
      </Route>
      <Route path='/new-quote'>
        <NewQuote />
      </Route>
      <Route path='*'>
        <NoDataFound />
      </Route>
    </Switch>
    </Layout>
  );
}

export default App;
