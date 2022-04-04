import React from "react";
import {Text} from "./Text";
import styles from "./FormErrorText.module.css";

interface FormErrorTextI {}

const FormErrorText: React.FunctionComponent<FormErrorTextI> = ({children}) => {
    return <Text className={styles.errorMessage}>{children}</Text>
}

export default FormErrorText;