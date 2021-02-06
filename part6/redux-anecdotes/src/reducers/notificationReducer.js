const initialState = 'My notification'

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'CHANGE':
            return action.notification
    }

    return state
}

export const changeNotification = (notification) => ({type: 'CHANGE', notification})

export default reducer