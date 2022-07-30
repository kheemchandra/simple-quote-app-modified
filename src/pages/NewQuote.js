import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useHttp } from '../hooks/use-http';

import QuoteForm from '../components/quotes/QuoteForm';
import { addQuote } from '../lib/api';

const NewQuote = () => {
  const { sendRequest, status, error, data } = useHttp(addQuote, true);
  const history = useHistory();

  const addQuoteHandler = (quoteData) => {  
      sendRequest(quoteData);
       
  }
 
  useEffect(() => {
    if(status === 'COMPLETE' && data){ 
      history.push('/quotes')
    }
  }, [status, data, history]);

  return <QuoteForm error={error} isLoading={status === 'SEND'} onAddQuote={addQuoteHandler}/>
};

export default NewQuote;