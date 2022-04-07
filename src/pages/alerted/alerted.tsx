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
import {ImgAlertRedCircle} from "../../medias/images/UGT_Asset_UI_AlertRedCircle";

enum PageStatus { COUNT_DOWN, CANCELED, CONFIRMED};

const Alerted = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [counter, setCounter] = useState(5);
    const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.COUNT_DOWN);

    const { currentValue, updateValue } = useSosInfoContext();

    const parseBackMessage = () => {
        return `${t('name')}: ${currentValue.name}
                ${t('phone_number')}: ${currentValue.phoneNumber}
                ${t('emergency')}: ${t('emergency_option_' + currentValue.emergencyCode)}
                ${t('location')}: ${currentValue.address}
                ${t('comment')}: ${currentValue.addressComment}
                `
    }

    const onSubmit = () => {
        console.log('Request submitted to backend: ', parseBackMessage());
        setPageStatus(PageStatus.CONFIRMED);
        updateValue({requestPending: false});
    }

    const onCancel = () => {
        console.log('Request canceled: ', parseBackMessage());
        setPageStatus(PageStatus.CANCELED);
        updateValue({requestPending: false});
    }

    useEffect(() => {
        if(pageStatus === PageStatus.CANCELED) return;
        if(counter === 0) onSubmit();

        const timer = setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    useEffect(() => {
        if(!currentValue.requestPending) navigate("/emergency");
    }, []);

    return (
        <React.Fragment>
            <Header hasHeadline hasLangSelector />
            <Content>
                {pageStatus === PageStatus.CONFIRMED ?
                    <>
                        <Card>
                            <Card className={styles.locationCard}>
                                <ImgLocationPin fill="#000" /><Text>{currentValue.address}</Text>
                            </Card>

                            <Spacer size={20} />

                            <Card className={styles.centerH}>
                                <ImgAlertRedCircle />
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
                            <ImgLocationPin fill="#000" /><Text>{currentValue.address}</Text>
                        </Card>

                        <Spacer size={20} />

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
                        {pageStatus === PageStatus.COUNT_DOWN &&
                        <Button className={styles.submitButton} fullWidth onClick={onCancel} >
                            <Text>{t('alerted_btn')} ({counter})</Text>
                        </Button>}

                        {pageStatus === PageStatus.CANCELED && <Text className={styles.text}>{t('alerted_canceled')}</Text>}
                    </div>
                </>
                }
            </Content>
        </React.Fragment>
    );
};

export default Alerted;