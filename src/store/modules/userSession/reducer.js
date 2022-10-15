const INITIAL_STATE = {
    userInfo: {
        name: '',
        token: ''
    }
}

const userSession = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET-LOGIN': {
            const {userInfo} = action.payload;
            return  { ...state,  userInfo}; 
        }
        default: {
            return state;
        }
    }
}

export default userSession; 