import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
// import AddPatientForm, { PatientFormValues } from './AddPatientForm';

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    // onSubmit: (values: PatientFormValues) => void;
    error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, error }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add a new entry</Modal.Header>
        <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <div><p>jee jee</p></div>
        </Modal.Content>
    </Modal>
);

export default AddEntryModal;