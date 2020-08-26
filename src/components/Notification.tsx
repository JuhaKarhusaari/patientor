import React from "react";
import { Card, Icon, Container, Transition } from "semantic-ui-react";

const Notification: React.FC<{ message: string | undefined }> = ({ message }) => {
    const hide = 800;
    const show = 800;
 
    const notificationStyle = {
        fontSize: '16px',
        padding: 10,
        marginBottom: 10,
    };

    return(
        <Container style={notificationStyle}>
            <Transition visible={message ? true : false} animation='scale' duration={{ hide, show }}>
                <Card style={{ 
                        heigth: "300px",
                        width: "800",
                        color: 'firebrick',
                        background: 'lightsalmon',
                        borderRadius: "5px",
                        borderStyle: "solid",
                        }}>
                    <Card.Description style={{ color: "black" }}>
                        <Icon name="warning circle" /><strong>{message}</strong>
                    </Card.Description>
                </Card>
            </Transition>
        </Container>
    );
};

export default Notification;