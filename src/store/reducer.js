const defaultState = {
    avatarTag:1
}
export default (state=defaultState,action) =>{
    let newState = JSON.parse(JSON.stringify(state))

    switch(action.type){
        case 'addAvatarTag':
            newState.avatarTag++;
            break
        default:
            break
    }

    return newState
}