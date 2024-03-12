import ReactDOM from 'react-dom';


/* A função do portal é fazer render de componentes fora do DOM principal (root)
    do React, permitindo que sejam renderizados em qualquer parte da página. 
    É como se os tirasse do root e colocasse noutro DOM ficando esse componente mais 
    à frente de todos os outros 
*/
const Modal = ({ children }) => {
    const modalRoot = document.getElementById('modal-root');
    return ReactDOM.createPortal(
        children,
        modalRoot
    );
};

export default Modal;