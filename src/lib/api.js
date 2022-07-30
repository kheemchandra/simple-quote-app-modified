// const FIREBASE_DOMAIN = 'https://access-drive-files-default-rtdb.firebaseio.com/';
const FIREBASE_DOMAIN = 'https://react-http-customhooks-76e6f-default-rtdb.firebaseio.com';

export const getAllQuotes = async () => {
  try{
    const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`)
    if(!response.ok){
      throw new Error('Failed to fetch Quotes!')
    }
    const data = await response.json();
    const transferedData = [];
    for(const key in data){
      transferedData.push({
        id: key,
        ...data[key]
      })
    }
    return transferedData;
  }catch(e){
    throw new Error('Failed to fetch quotes!');
  }
};

export const getQuote = async(quoteID) => {
  try{
    const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteID}.json`);
    if(!response.ok){
      throw new Error('Failed to fetch Quote!')
    }
    const quote = await response.json();
    return quote;

  }catch(e){
    throw new Error('Failed to fetch Quote!');
  }

}

export const addQuote = async(requestData) => {
  try{
    const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify(requestData)
    });
    if(!response.ok){
      throw new Error('Failed to add Quote!')
    }
    const data = await response.json(); 
    return data.name;
  }catch (e){
    throw new Error('Failed to add Quote!');
  }
};

export const getAllComments = async (quoteID) => {
  try{
    const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteID}.json`);
    if(!response.ok){
      throw new Error('Failed to fetch comments!')
    }
    const data = await response.json();
    const transferedData = [];
    for(const key in data){
      transferedData.push({
        id: key,
        ...data[key]
      })
    }
    return transferedData;
  }catch(e){
    throw new Error('Failed to fetch comments!');
  }
};

export const addComment = async(requestData) => {
  try{
    const response = await fetch(`${FIREBASE_DOMAIN}/comments/${requestData.quoteID}.json`, {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify({text: requestData.comment})
    });
    if(!response.ok){
      throw new Error('Failed to add comment!')
    }
    const data = await response.json(); 
    return data.name;
  }catch (e){
    throw new Error('Failed to add comment!');
  }
};