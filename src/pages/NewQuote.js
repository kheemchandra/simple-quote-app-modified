import { useHistory } from 'react-router-dom';

import { useHttp } from '../hooks/use-http';

import QuoteForm from '../components/quotes/QuoteForm';
import { addQuote } from '../lib/api';

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote, true);
  const history = useHistory();

  const addQuoteHandler = (quoteData) => {    
      sendRequest(quoteData).then((res) => { 
        history.push('/quotes');
      }).catch(e => {
        console.log('Something went wrong!')
      });  
  }
 
  return <QuoteForm isLoading={status === 'SEND'} onAddQuote={addQuoteHandler}/>
};

export default NewQuote;