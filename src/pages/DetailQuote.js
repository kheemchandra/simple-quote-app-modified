import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import { useHttp } from "../hooks/use-http";

import HighlightedQuote from "../components/quotes/HighlightedQuote";
import Comments from "../components/comments/Comments";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { getQuote } from "../lib/api"; 

const DetailQuote = () => {
  const { sendRequest, status, data:quote, error} = useHttp(getQuote);
  const match = useRouteMatch();console.log(match);
  const { quoteID } = useParams();   

  useEffect(() => {
    sendRequest(quoteID);
  }, [sendRequest, quoteID]);

  if(status === 'SEND'){
    return <div className="centered">
      <LoadingSpinner />
    </div>
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments quoteID={quoteID}/>
      </Route>
    </Fragment>
  );
};

export default DetailQuote;
