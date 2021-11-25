import React, { useState } from "react";

import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

export default function Modal() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    return (
        <div className="modal">
            <button onClick={toggleModal}>Open modal</button>

            <ReactModal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="My dialog"
            >
                <div>My modal dialog.</div>
                <button onClick={toggleModal}>Close modal</button>
            </ReactModal>
        </div>
    );
}

