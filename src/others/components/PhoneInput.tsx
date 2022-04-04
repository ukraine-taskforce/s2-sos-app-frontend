import React from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css';
import styles from "./PhoneInput.module.css";
import {ImgClose} from "../../medias/images/UGT_Asset_UI_Close";
import {useTranslation} from "react-i18next";

export interface PhoneInputProps {
    country: string;
    value: string | undefined;
    placeholder: string;
    onChange: (value: string, countryCode: string) => void;
    isValid?: boolean;
}

interface ClearButton {
    onClick: (value: string) => void;
}

const ClearButton: React.FunctionComponent<ClearButton> = ({onClick}) => {
    return <div className={styles.clearContainer}>
        <ImgClose className={styles.clearButton} onClick={() => onClick("")} alt="clear value" />
    </div>
}

const PhoneInputCustom: React.FunctionComponent<PhoneInputProps> = ({country, value, placeholder, onChange, isValid = true}) => {
    const { t } = useTranslation();
    const countriesListTranslation = JSON.parse(t('landing_phone_input'));

    return <div className={`${styles.wrapper} ${!isValid && styles.invalid}`}>
            <PhoneInput country={country}
                               value={value}
                               placeholder={placeholder}
                               onChange={(phone, data: {countryCode: string}) => onChange(`+${phone}`, data.countryCode)}
                               inputClass={styles.input}
                               containerClass={styles.container}
                               buttonClass={styles.button}
                               dropdownClass={styles.button}
                               localization={countriesListTranslation}
                               enableSearch />

        {value && value.length > 0 && <ClearButton onClick={() => onChange('', '')} />}
    </div>
};

export default PhoneInputCustom;