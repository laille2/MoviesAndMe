const initialState = { viewedFilms: [] }

function toggleViewed(state = initialState, action) {
    let nextState;
    switch (action.type) {
        case 'TOGGLE_VIEWED':
            const viewedFilmIndex = state.viewedFilms.findIndex(item => item.id === action.value.id)
            if (viewedFilmIndex !== -1) {
                nextState = {
                    ...state,
                    viewedFilms: state.viewedFilms.filter((item, index) => index !== viewedFilmIndex)
                }
            } else {
                nextState = {
                    ...state,
                    viewedFilms: [...state.viewedFilms, action.value]
                }
            }
            return nextState !== undefined ? nextState : state;
        default:
            return state;
    }
}

export default toggleViewed;