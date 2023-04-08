import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
    const [state, setState] = useState(() => {
        const persistedStateSerialized = localStorage.getItem(key);
        if (persistedStateSerialized) {
            const persistedState = JSON.parse(persistedStateSerialized);

            return persistedState;
        }

        return initialValue;
    });

    const setLocalStorageState = (value) => {
        setState(value);

        const newValue = typeof(value) === 'function' ? value() : value;
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [
        state,
        setLocalStorageState,
    ];
};
