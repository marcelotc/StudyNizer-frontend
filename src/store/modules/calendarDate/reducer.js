const INITIAL_STATE = {
    date: "",
}

const calendarDate = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET-DATE': {
            const { data } = action.payload;
            return  { ...state,  date: data}; 
        }
        default: {
            return state;
        }
    }
}

export default calendarDate; 