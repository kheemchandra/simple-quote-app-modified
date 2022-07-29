import { Fragment } from "react";
import { useParams, Route, Link } from "react-router-dom";

import HighlightedQuote from "../components/quotes/HighlightedQuote";
import Comments from "../components/comments/Comments";

const DUMMY_COMMENTS = [
  { id: "q1", author: "Kheem", text: "Hi there, how are you?" },
  { id: "q2", author: "Ashu", text: "Learning React is fun!" },
  { id: "q3", author: "Ram Lal", text: "Heavy rainfall is here |:(" },
];

const DetailQuote = () => {
  const params = useParams();
  console.log(params);
  const quote = DUMMY_COMMENTS.find((q) => q.id === params.quoteID);

  if (!quote) {
    return <p className="centered">No quote found!</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path="/quotes/:quoteID" exact>
        <div className="centered">
          <Link className="btn--flat" to={`/quotes/${params.quoteID}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path="/quotes/:quoteID/comments">
        <Comments />
      </Route>
    </Fragment>
  );
};

export default DetailQuote;
