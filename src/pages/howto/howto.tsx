import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../others/components/Button';
import { Header } from '../../others/components/Header';
import { Spacer } from '../../others/components/Spacer';
import { Text } from '../../others/components/Text';
import { Content } from '../../others/components/Content';
import styles from './howto.module.css';
export function Howto() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <Header hasHeadline hasLangSelector />
            <Content>
                <div className={styles.welcome}>
                    <h1>{t('howto_title')}</h1>
                </div>

                <Spacer size={50} />

                <div>
                    <Text>{t('howto_text')}</Text>
                </div>
                <Spacer size={250} />

                <Button
                    variant='highlight'
                    fullWidth
                    onClick={() => navigate(`/`)}
                >
                    <span className={styles.noWrap}>{t('next')}</span>
                </Button>
            </Content>
        </React.Fragment>
    );
}
