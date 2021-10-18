const initialState = { avatar: require('../../Images/ic_tag_faces.png') }

function setAvatar(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'SET_AVATAR':
            if (action && action.value) {
                nextState = {
                    avatar: action.value
                }
            }
            return nextState !== undefined ? nextState : state;
        default:
            return state;
    }
}

export default setAvatar;