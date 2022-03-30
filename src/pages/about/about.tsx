import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../../others/components/Button';
import { Header } from '../../others/components/Header';
import { Spacer } from '../../others/components/Spacer';
import { Text } from '../../others/components/Text';
import { Content } from '../../others/components/Content';
import { List } from '../../others/components/List';

import styles from './about.module.css';
export function About() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <Header hasLangSelector backLink='/' />
            <Content>
                <div className={styles.welcome}>
                    <h1>{t('about_title')}</h1>
                    <Text>{t('about_text')}</Text>
                </div>

                <Spacer size={50} />

                <List ordered>
                    <li>
                        <p>
                            {t('about_first')}
                            <br />
                            <span>{t('about_first_small')}</span>
                        </p>
                    </li>
                    <li>
                        <p>
                            {t('about_second')} <br />
                            <span>{t('about_second_small')}</span>
                        </p>
                    </li>
                    <li>
                        <p>
                            {t('about_third')} <br />
                            <span>{t('about_third_small')}</span>
                        </p>
                    </li>
                </List>

                {/* <div className={styles.infoRow}>
                    <Button
                        variant='highlight'
                        onClick={() => navigate(`/login`)}
                    >
                        <span className={styles.noWrap}>{t('register')}</span>
                    </Button>
                    <Button variant='white' onClick={() => navigate(`/login`)}>
                        <span className={styles.noWrap}>{t('login')}</span>
                    </Button>
                </div> */}
                {/* <Spacer size={250} />
                <div className={styles.emergency}>
                    <span>{t('or')}</span>

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
                </Button> */}
            </Content>
        </React.Fragment>
    );
}
