import React from 'react';
import { Modal } from 'semantic-ui-react';
import AddEntryForm, { AddEntryValues } from './AddEntryForm';
// import AddPatientForm, { PatientFormValues } from './AddPatientForm';
import Notification from "../components/Notification";
// <Segment inverted color="red">{`Error: ${error}`}</Segment>
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