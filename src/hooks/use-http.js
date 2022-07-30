// { sendRequest, httpState}
// httpState = { data, error, status}
// status = 'pending' || null || send || completed

import { useReducer, useCallback } from "react";

const httpReducer = (state, action) => {
  if(action.type === 'Sending'){
    return {
      data: null,
      error: null,
      status: 'SEND'
    }
  }
  else if(action.type === 'Success'){
    return {
      data: action.successData,
      error: null,
      status: 'COMPLETE'
    }
  }
  else if(action.type === 'Failure'){
    return {
      data: null,
      error: action.errorMessage,
      status: 'COMPLETE'
    }
  }
  else{
    return {
      data: null,
      error: null,
      status: null, // PENDING
    }
  }
}

export const useHttp = function(requestFunc, isPending=false){
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: isPending ? null : 'SEND',
    data: null,
    error: null
  });

  const sendRequest = useCallback(async (requestData) => {
    dispatch({type: 'Sending'})
    try{
      const response = await requestFunc(requestData); 
      dispatch({type: 'Success', successData: response})
    }catch(e){ 
      dispatch({type: 'Failure', errorMessage: e.message || 'Something went wrong!'})
    }

  }, [dispatch, requestFunc]);

  return {
    sendRequest,
    ...httpState
  }
}