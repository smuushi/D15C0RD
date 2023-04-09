import { useDispatch } from "react-redux";
// const dispatch = useDispatch();

const RECEIVEACTIVEMODAL = "modal/RECEIVEACTIVEMODAL"

const IATEMYWORDS = "literally nothing will match this in the reducers.. just trying to reset stuff to their default."


//---misc---//



// export const modalOpener = () => (e) => {
//     e.preventDefault();

//     useDispatch()
// }
// to be used explicitly with an onclick or some event lmao
// jk.. this doesn't work because the useDispatch hook has to be declared inside the component.. 
// so I just imported the AC below I guess. :T

//---AC---//

export const activateModalAC = (someIdentifier) => ({
    type: RECEIVEACTIVEMODAL,
    modalId: someIdentifier
})

export const resetModalAC = () => ({
    type: IATEMYWORDS
})


//---MODAL REDUCER---//

export const ModalReducer = (state = null, action) => {

    // debugger
    let nextState = state;

    switch(action.type) {

        case RECEIVEACTIVEMODAL:

            nextState = action.modalId;
            return nextState;
            
            
        case IATEMYWORDS:
            nextState = null;
            return nextState

        default: 
            return nextState;
    }


}