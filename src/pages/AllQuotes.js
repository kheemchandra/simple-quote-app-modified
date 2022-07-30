import { useEffect } from "react";
import { useHttp } from "../hooks/use-http";

import QuoteList from "../components/quotes/QuoteList"; 
import LoadingSpinner from "../components/UI/LoadingSpinner"; 
import NoQuotesFound from "../components/quotes/NoQuotesFound";

import { getAllQuotes } from "../lib/api";
 
const AllQuotes = () => {
  const { sendRequest, status, data: quotes, error} = useHttp(getAllQuotes);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]); 

  if(status === 'SEND'){
    return <div className="centered"><LoadingSpinner /></div>
  }

  if(error){
    return <p className="centered">{error}</p>
  }

  if(status === 'COMPLETE' && (!quotes || quotes.length === 0)){
    return <NoQuotesFound />
  }
  
  if(status === 'COMPLETE' && quotes && quotes.length > 0){
    return <QuoteList quotes={quotes} />
  }
};

export default AllQuotes;