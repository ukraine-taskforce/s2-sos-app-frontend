import React, {useState} from 'react';
import {Header} from "../../others/components/Header";
import {Content} from "../../others/components/Content";
import {Spacer} from "../../others/components/Spacer";
import {Text} from "../../others/components/Text";
import {Button} from "../../others/components/Button";
import {useTranslation} from "react-i18next";
import {Input} from "../../others/components/Input";
import PhoneInput from "../../others/components/PhoneInput";
import styles from "./landing.module.css";
import { ImgLocationPin } from '../../medias/images/UGT_Asset_UI_LocationPin';
import {useNavigate} from "react-router-dom";
import ToggleButton from "../../others/components/ToggleButton";

interface EmergenciesOptions {
    selectedItem: number;
    onClick: (e: number) => void;
}

const EmergenciesOptions = ({selectedItem, onClick}: EmergenciesOptions) => {
    const emergency_codes = [1, 2, 3];
    const { t } = useTranslation();

    return <div style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap"}}>
        {emergency_codes.map(e => <ToggleButton key={e}
                                                active={e === selectedItem}
                                                value={t(`landing_emergency_${e}`)}
                                                onClick={() => onClick(e)} />)}
    </div>
}

const Landing = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [emergency, setEmergency] = useState<number>(0);

    const onSubmit = () => {
        const obj = {phoneNumber, name, location, emergency};
        console.log('Submitted!', obj);
        navigate('/alerted');
    }

    const isFormValid = phoneNumber.trim().length > 3;

    return (
        <React.Fragment>
            <Header hasHeadline hasLangSelector />
            <Content>
                <h1>{t('landing_title')}</h1>
                <Spacer size={50} />

                <Text>{t('phone_number')} <span className={styles.requiredField}>*</span></Text>
                <Spacer size={10} />
                <PhoneInput country={'ua'} value={phoneNumber} placeholder={t('phone_number')} onChange={setPhoneNumber} />
                <Spacer size={30} />

                <Text>{t('landing_emergency_label')}</Text>
                <Spacer size={10} />
                <EmergenciesOptions selectedItem={emergency} onClick={setEmergency} />
                <Spacer size={35} />

                <Text>{t('landing_name')}</Text>
                <Spacer size={10} />
                <Input value={name} label={t('landing_name')} placeholder={t('landing_name_placeholder')} onChange={setName} />
                <Spacer size={35} />

                <Text>{t('landing_location')}</Text>
                <Spacer size={10} />
                <Input value={location} label={t('landing_location')} placeholder={t('landing_location_placeholder')} onChange={setLocation} />
                <Spacer size={20} />

                <Button className={styles.submitButton} fullWidth onClick={onSubmit} disabled={!isFormValid}>
                    <div>
                        <ImgLocationPin fill='var(--color-white)' />
                        <Text>{t('landing_submit_btn')}</Text>
                    </div>
                </Button>
            </Content>
        </React.Fragment>
    );
};

export default Landing;