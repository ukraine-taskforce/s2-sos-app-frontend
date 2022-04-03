import React from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css';
import styles from "./PhoneInput.module.css";
import {ImgClose} from "../../medias/images/UGT_Asset_UI_Close";

export interface PhoneInputProps {
    country: string;
    value: string | undefined;
    placeholder: string;
    onChange: (value: string) => void;
}

interface ClearButton {
    onClick: (value: string) => void;
}

const ClearButton: React.FunctionComponent<ClearButton> = ({onClick}) => {
    return <div className={styles.clearContainer}>
        <ImgClose className={styles.clearButton} onClick={() => onClick("")} alt="clear value" />
    </div>
}

const PhoneInputCustom: React.FunctionComponent<PhoneInputProps> = ({country, value, placeholder, onChange}) => {
    return <div className={styles.wrapper}>
            <PhoneInput country={country}
                               value={value}
                               placeholder={placeholder}
                               onChange={onChange}
                               inputClass={styles.input}
                               containerClass={styles.container}
                               buttonClass={styles.button}
                               dropdownClass={styles.button}
                               enableSearch />

        {value && value.length > 0 && <ClearButton onClick={onChange} />}
    </div>
};

export default PhoneInputCustom;