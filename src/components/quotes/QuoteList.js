import { Fragment } from 'react';
import { useLocation, useHistory } from 'react-router-dom';


import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, isAscending) => {
  return quotes.sort((q1, q2) => {
    if(isAscending){
      return q1.id > q2.id ? 1:-1;
    }else{
      return q1.id < q2.id ? 1:-1;
    }
  })
}

const QuoteList = (props) => {
  const location = useLocation();
  const history = useHistory();

  const search = new URLSearchParams(location.search);
  
  const isAscending = search.get('sort') === 'asc'; 
  
  const quotes = sortQuotes(props.quotes, isAscending) 

  const sortingHandler = () => {
    history.push({
      location: location.pathname,
      search: `?sort=${isAscending ? 'desc': 'asc'}`
    })
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortingHandler}>Sort {isAscending ? 'Descending': 'Ascending'}</button>
      </div>
      <ul className={classes.list}>
        {quotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
