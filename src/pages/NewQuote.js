import QuoteForm from '../components/quotes/QuoteForm';

const NewQuote = () => {

  const addQuoteHandler = () => {
    console.log('We recieved the data')
  }
  return <QuoteForm onAddQuote={addQuoteHandler}/>
};

export default NewQuote;