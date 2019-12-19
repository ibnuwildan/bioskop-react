
  
const INITIAL_STATE = {
    username: '',
    email: '',
    role: '',
    id:'',
    password:'',
    cart:[]
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                username: action.payload.username,
                email: action.payload.email,
                role: action.payload.role,
                password: action.payload.password,
                id: action.payload.id
            }
        case 'LOGOUT':
            return INITIAL_STATE
        default:
            return INITIAL_STATE
    }
}