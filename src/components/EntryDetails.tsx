import React from "react";

// Components
import HealthRatingBar from "./HealthRatingBar";
import { Header, Icon } from "semantic-ui-react";

// Types & Utils
import { Entry } from "../types";
import { assertNever } from "../utils";

// Reducers & State
import { useStateValue } from "../state";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {  
    const [{ diagnoses }] = useStateValue();
   
    switch (entry.type) {
        case "Hospital":
            return (
                <div className="ui segment" >
                    <Header as="h3">{entry.date} <Icon name="user doctor" /></Header>
                    <p>{entry.description}</p>
                    {entry.diagnosisCodes && diagnoses 
                        ? entry.diagnosisCodes.map(code =>
                            <li key={code}><strong>{code}</strong> {diagnoses[code] ? diagnoses[code].name : null}</li>
                            )
                        : null
                    }
                </div>
            );
        case "OccupationalHealthcare":
            return (
                <div className="ui segment" >
                    <Header as="h3">{entry.date} <Icon name="user doctor" /></Header>
                    <p>{entry.description}</p>
                    {entry.diagnosisCodes && diagnoses
                        ? entry.diagnosisCodes.map(code =>
                            <li key={code}><strong>{code}</strong> {diagnoses[code] ? diagnoses[code].name : null}</li>
                        )
                        : null
                    }
                </div>
            );
        case "HealthCheck":
            return (
                <div className="ui segment" >
                    <Header as="h3">{entry.date} <Icon name="user doctor" /></Header>
                    <p>{entry.description}</p>
                    <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
                </div>
            );
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;