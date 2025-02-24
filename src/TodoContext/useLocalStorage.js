import React from "react";

//Función que define un customedHook
function useLocalStorage(itemName, initialValue) { //Los hooks inician con use
  
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() =>{
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;
        
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
          setItem(parsedItem);
        }
  
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }    
    }, 2000);
    //Se aplica la siguiente linea para indicar que solo queremos realizar esto una vez
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  }

  return {
    item, 
    saveItem, 
    loading, 
    error
  }; //Retorna lo que se necesita en otras funciones
}

export {useLocalStorage};