import QuoteList from "../components/quotes/QuoteList";

const DUMMY_COMMENTS = [
  {id: 'q1', author: 'Kheem', text: 'Hi there, how are you?'},
  {id: 'q2', author: 'Ashu', text: 'Learning React is fun!'},
  {id: 'q3', author: 'Ram Lal', text: 'Heavy rainfall is here |:('},
] 

const AllQuotes = () => {

  if(!DUMMY_COMMENTS){
    return <h1 className="centered focused">Failed to fetch</h1>
  }

  return <QuoteList quotes={DUMMY_COMMENTS} />
};

export default AllQuotes;