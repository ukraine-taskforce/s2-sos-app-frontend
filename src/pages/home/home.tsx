import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../others/components/Button';
import { Header } from '../../others/components/Header';
import { Spacer } from '../../others/components/Spacer';
import { Text } from '../../others/components/Text';
import { Content } from '../../others/components/Content';
import styles from './home.module.css';
export function Home() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <Header hasHeadline hasLangSelector />
            <Content>
                <div className={styles.welcome}>
                    <h1>{t('home_welcome')}</h1>
                    <Text>{t('home_welcome_text')}</Text>
                </div>

                <Spacer size={50} />

                <div className={styles.infoRow}>
                    <Button
                        variant='highlight'
                        onClick={() => navigate(`/login`)}
                    >
                        <span className={styles.noWrap}>{t('register')}</span>
                    </Button>
                    <Button variant='white' onClick={() => navigate(`/login`)}>
                        <span className={styles.noWrap}>{t('login')}</span>
                    </Button>
                </div>
                <Spacer size={250} />
                <div>
                    <p>{t('send_help_text')}</p>
                </div>
                <Button
                    variant='emergency'
                    fullWidth
                    onClick={() => navigate(`/login`)}
                >
                    <span className={styles.noWrap}>
                        {t('send_help_button')}
                    </span>
                </Button>
            </Content>
        </React.Fragment>
    );
}
