import React, {useEffect, useState} from 'react';
import {Header} from "../../others/components/Header";
import {Content} from "../../others/components/Content";
import {Spacer} from "../../others/components/Spacer";
import {Text} from "../../others/components/Text";
import {Button} from "../../others/components/Button";
import {useTranslation} from "react-i18next";
import styles from "./alerted.module.css";
import {useNavigate} from "react-router-dom";
import {Card} from "../../others/components/Card";
import {useSosInfoContext} from "../../others/contexts/sosInfo";
import {ImgLocationPin} from "../../medias/images/UGT_Asset_UI_LocationPin";
import {ImgAlertCircle} from "../../medias/images/UGT_Asset_UI_AlertCircle";

const IconAlertCircleRed = () => {
    return <svg width="102" height="102" viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle opacity="0.3" cx="51" cy="51" r="51" fill="#FF766D"/>
        <circle cx="51" cy="51" r="30" fill="#C01A0F"/>
        <path d="M59.7504 58.3262V49.0762C59.7504 43.9757 55.6008 39.8262 50.5004 39.8262C45.4 39.8262 41.2504 43.9757 41.2504 49.0762V58.3262C40.2286 58.3262 39.4004 59.1543 39.4004 60.1762V62.0262C39.4004 63.048 40.2286 63.8762 41.2504 63.8762H59.7504C60.7722 63.8762 61.6004 63.048 61.6004 62.0262V60.1762C61.6004 59.1544 60.7722 58.3262 59.7504 58.3262ZM43.1004 49.0762C43.1004 44.9889 46.4138 41.6762 50.5004 41.6762C54.587 41.6762 57.9004 44.9889 57.9004 49.0762V58.3262H43.1004V49.0762ZM59.7504 62.0262H41.2504V60.1762H59.7504V62.0262Z" fill="white"/>
        <path d="M41.3476 39.9236L40.0403 38.6162C37.3603 41.2956 35.7002 44.9956 35.7002 49.0761C35.7002 51.8585 36.4864 54.454 37.827 56.6802L39.4113 55.7299C38.2378 53.7819 37.5502 51.5107 37.5502 49.0761C37.5502 45.5056 39.0024 42.2681 41.3476 39.9236Z" fill="white"/>
        <path d="M60.9607 38.6152L59.6533 39.9226C61.9979 42.2678 63.4502 45.5053 63.4502 49.0758C63.4502 51.5104 62.7625 53.7815 61.5897 55.7296L63.1739 56.6799C64.5139 54.4538 65.3002 51.8575 65.3002 49.0758C65.3002 44.9953 63.6401 41.2953 60.9607 38.6152Z" fill="white"/>
        <path d="M63.5755 36L62.2676 37.3079C65.2831 40.3228 67.1503 44.4853 67.1503 49.0758C67.1503 52.206 66.266 55.1265 64.7577 57.6302L66.3419 58.5811C68.018 55.7987 69.0003 52.5537 69.0003 49.0757C69.0003 43.9747 66.9259 39.3497 63.5755 36Z" fill="white"/>
        <path d="M38.7321 37.3079L37.4248 36C34.0745 39.3497 32 43.9747 32 49.0757C32 52.5537 32.9824 55.7986 34.6579 58.5811L36.2421 57.6302C34.7343 55.1259 33.85 52.2053 33.85 49.0757C33.85 44.4853 35.7173 40.3228 38.7321 37.3079Z" fill="white"/>
    </svg>;
}

const Alerted = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [location, setLocation] = useState<string | undefined>('');
    const [counter, setCounter] = useState(5);
    const [canceled, setCanceled] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const { currentValue, clearStore } = useSosInfoContext();

    const onSubmit = () => {
        console.log('Request submitted', currentValue);
        setSubmitted(true);
        // clearStore();
    }

    const onCancel = () => {
        console.log('Request canceled', currentValue);
        setCanceled(true);
        // clearStore();
    }

    useEffect(() => {
        if(canceled) return;
        if(counter === 0) onSubmit();

        const timer = setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    useEffect(() => {
        if(!currentValue || !currentValue.phoneNumber) navigate("/");
        setLocation(currentValue.address);
    }, []);

    return (
        <React.Fragment>
            <Header hasHeadline hasLangSelector />
            <Content>
                {submitted ?
                    <>
                        <Card>
                            <Card className={styles.locationCard}>
                                <ImgLocationPin fill="#000" /><Text>{location}</Text>
                            </Card>

                            <Spacer size={20} />

                            <Card className={styles.centerH}>
                                <IconAlertCircleRed />
                            </Card>

                            <Card>
                                <h1>{t('alerted_title_success')}</h1>
                            </Card>

                            <Card className={styles.textCenter}>
                                <Text className={styles.text}>{t('alerted_subtitle_success')}</Text>
                            </Card>

                            <Spacer size={20} />

                            <Card className={styles.textCenter}>
                                <Text className={styles.text}>{t('alerted_confirmed')}</Text>
                            </Card>
                        </Card>
                    </>
                :<>
                    <Card>
                        <Card className={styles.locationCard}>
                            <ImgLocationPin fill="#000" /><Text>{location}</Text>
                        </Card>

                        <Card className={styles.centerH}>
                            <ImgAlertCircle fill="#FFF" />
                        </Card>

                        <Card>
                            <h1>{t('alerted_title')}</h1>
                        </Card>

                        <Card className={styles.textCenter}>
                            <Text className={styles.text}>{t('alerted_subtitle')}</Text>
                        </Card>
                    </Card>

                    <Spacer size={20} />
                    <div style={{display: "flex", justifyContent: "center"}}>
                        {!submitted && !canceled &&
                        <Button className={styles.submitButton} fullWidth onClick={onCancel} >
                            <Text>{t('alerted_btn')} ({counter})</Text>
                        </Button>}

                        {canceled && <Text className={styles.text}>{t('alerted_canceled')}</Text>}
                        {submitted && <Text className={styles.text}>{t('alerted_confirmed')}</Text>}
                    </div>
                </>
                }
            </Content>
        </React.Fragment>
    );
};

export default Alerted;