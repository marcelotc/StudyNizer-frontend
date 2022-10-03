const INITIAL_STATE = {
    date: [],
}

const calendarDate = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET-DATE': {
            const { date } = action.payload;
            return  { ...state,  date: [...state.date, date]}; 
        }
        default: {
            return state;
        }
    }
}

export default calendarDate; 