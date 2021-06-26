import React, { useState, useEffect, useCallback } from 'react';

const [titleName, setTitleName] = useState(undefined);

const bookContext = React.createContext({
    titleName,
    setTitleName
});

const bookContextProvider = (props) => {

    const dataHandler = (title) => {
        setTitleName(title);
    };

    const contextValue = {
        titleName: title,
        setTitleName: dataHandler
    };

    return (
        <ReferenceDataContext.Provider value={{ titleName, setTitleName }}>
            {props.children}
        </ReferenceDataContext.Provider>
    );
};

export { bookContext, bookContextProvider };