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
import {useNavigate} from "react-router-dom";
import {useSosInfoContext} from "../../others/contexts/sosInfo";
import {validatePhoneNumber} from "../../others/helpers/validatePhoneNumber";
import FormErrorText from "../../others/components/FormErrorText";
import {setSosInfoStorage} from "../../others/storage/sosInfoStorage";

const Landing = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { currentValue, updateValue } = useSosInfoContext();
    const [phoneNumberError, setPhoneNumberError] = useState<string | undefined>();

    const onSaveInfo = () => {
        setSosInfoStorage(currentValue);
        navigate('/emergency');
    }

    const isPhoneNumberValid = currentValue.phoneNumber && currentValue.phoneNumber.trim().length > 4 && !phoneNumberError;
    const isFormValid = isPhoneNumberValid && currentValue.name;

    const setPhoneNumber = (newValue: string, countryCode: string) => {
        setPhoneNumberError(undefined);
        updateValue({phoneNumber: newValue});

        const validationResult = validatePhoneNumber(newValue, countryCode);
        if(validationResult.isInvalid) setPhoneNumberError(validationResult.error);
    }

    const setName = (newValue: string) => updateValue({name: newValue});
    const setAddress = (newValue: string) => updateValue({address: newValue});

    return (
        <React.Fragment>
            <Header hasHeadline hasLangSelector />
            <Content>
                <h1>{t('landing_title')}</h1>
                <Spacer size={50} />

                <Text required>{t('phone_number')}</Text>
                <Spacer size={10} />
                <PhoneInput country={'ua'}
                            value={currentValue.phoneNumber}
                            placeholder={t('phone_number')}
                            isValid={!phoneNumberError}
                            onChange={(value: string, countryCode: string) => setPhoneNumber(value, countryCode)} />
                {phoneNumberError && <FormErrorText>{t(`landing_phoneNumber_${phoneNumberError}`)}</FormErrorText>}
                <Spacer size={30} />

                <Text required>{t('landing_name')}</Text>
                <Spacer size={10} />
                <Input value={currentValue.name || ''} label={t('landing_name')} placeholder={t('landing_name_placeholder')} onChange={setName} />
                <Spacer size={35} />

                <Text>{t('landing_address')}</Text>
                <Spacer size={10} />
                <Input value={currentValue.address || ''} label={t('landing_address')} placeholder={t('landing_address_placeholder')} onChange={setAddress} />
                <Spacer size={20} />

                <Text className={styles.footerMsg}>{t('landing_footer_msg')}</Text>
                <Spacer size={20} />

                <Button className={styles.saveInfoButton} fullWidth onClick={onSaveInfo} disabled={!isFormValid}>
                    <Text>{t('landing_save_info_btn')}</Text>
                </Button>
            </Content>
        </React.Fragment>
    );
};

export default Landing;