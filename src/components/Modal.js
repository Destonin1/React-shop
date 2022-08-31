import { createModal } from 'react-modal-promise';
import "./Modal.css";

const MyBootrapModal = ({ isOpen, onResolve, onReject, text, title, param, onlyOkBtn = false }) => {
    const submit = () => onResolve(param);
    const reject = () => onReject();
  
    return (
        <div className={isOpen ? "modal modal_active":"modal"}>
            <div className={isOpen ? "modal-block modal-block_active":"modal-block"}>
                <div className="modal-header">
                    <h3 className="modal-title">{title}</h3>
                    <button className="modal-close" onClick={reject}>&times;</button>
                </div>
                <div className="modal-body">
                <p className="modal-text">{text}</p>
                </div>
                <div className="modal-footer modal-footer-small">
                    <button className="btn-accept btn-modal" onClick={submit}>Ok</button>
                    {onlyOkBtn ? "" :<button className="btn-cancel btn-modal" onClick={reject}>Cancel</button>} 
                </div>
            </div>
            <div className="modal-bg"></div>
        </div>
      
    );
  };

export const myModal = createModal(MyBootrapModal);