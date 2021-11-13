const SEND_MESSAGE = 'SEND-MESSAGE'
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'

let initialState = {
    messages: [
        { id: 1, message: 'hi' },
        { id: 2, message: 'yo' },
        { id: 3, message: 'ho' },
        { id: 4, message: 'ha' },
    ],
    dialogs: [
        { id: 1, name: 'Lera' },
        { id: 2, name: 'Roma' },
        { id: 3, name: 'Kyma' },
        { id: 4, name: 'Kym' },
    ],
    newMessageBody: ''

}

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            };


        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, { id: 6, message: body }]
            };


        default:
            return state;

    }
}
export const sendMessageActionCreator = () => {
    return {
        type: 'SEND-MESSAGE'
    }
}
export const updateNewMessageBodyCreator = (body) => ({ type: 'UPDATE-NEW-MESSAGE-BODY', body: body })

export default dialogsReducer;