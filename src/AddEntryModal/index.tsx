import React from 'react';
import { Modal } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';
import Notification from "../components/Notification";

import { AddEntryValues } from "../types";

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: AddEntryValues) => void;
    error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new entry</Modal.Header>
        <Modal.Content>
            <Notification message={error} />
            <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </Modal.Content>
    </Modal>
);

export default AddEntryModal;