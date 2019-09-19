import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const OptionModal = (props) =>(
    < Modal
        ariaHideApp={false}
        isOpen = {props.openModal}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel = "Selected Option" >
        <h2> Selected Option</h2>
        {props.selectedOption && <h3>{props.selectedOption}</h3>}
        <button onClick={props.closeModal}>close</button>
    </Modal>
);

export default OptionModal;