import React from "react";
import {Card} from "./Card";
import styles from "./ToggleButton.module.css";
import {Text} from "./Text";

interface ToggleButtonI {
    value: string;
    active: boolean;
    onClick: (e: any) => void;
}

const ToggleButton: React.FunctionComponent<ToggleButtonI> = ({value, active, onClick}) => {
    return <Card onClick={onClick} className={`${styles.card} ${active && styles.activeCard}`}>
        <Text>{value}</Text>
    </Card>
}

export default ToggleButton;