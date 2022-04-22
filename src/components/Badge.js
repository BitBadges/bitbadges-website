import Meta from 'antd/lib/card/Meta';
import { Avatar, Tooltip, Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSnowflake,
    faGlobe,
    faWallet,
    faCloud,
    faSquareMinus,
    faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import React from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { signAndSubmitPrivateApiTxn } from '../api/api';
import { BadgeModal } from './BadgeModal';
import { PRIMARY_BLUE, PRIMARY_TEXT, SECONDARY_TEXT } from '../constants';

export function Badge({
    badge,
    size,
    hidePermissions,
    collectedBadge,
    offeredBadge,
    conceptBadge,
    managing,
    hideModal,
}) {
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const balanceMap = useSelector((state) => state.user.userBalancesMap);
    const profileInfo = useSelector((state) => state.user.profileInfo);
    // const navigate = useNavigate();

    if (!badge) return <></>;

    if (!size) size = 50;

    let balance =
        balanceMap && balanceMap[badge._id] && balanceMap[badge._id].received
            ? balanceMap[badge._id].received
            : undefined;

    const supplyIcon = (
        <>
            {collectedBadge ? (
                <Tooltip
                    className={`like-button-badge`}
                    title={`This user owns ${balance}.`}
                >
                    <div style={{}}>
                        <FontAwesomeIcon icon={faWallet} /> {balance}
                    </div>
                </Tooltip>
            ) : (
                <Tooltip
                    className={`like-button-badge`}
                    title={`Total Supply: ${badge.supply}`}
                >
                    <div style={{}}>
                        <FontAwesomeIcon
                            // style={{ fontSize: 30 }}
                            icon={faGlobe}
                        />{' '}
                        {badge.supply}
                    </div>
                </Tooltip>
            )}
        </>
    );

    const addRemoveIcon = (
        <>
            {profileInfo.offering.includes(badge._id) || conceptBadge ? (
                <Tooltip
                    className={`like-button-badge`}
                    title={`Remove from Offering`}
                >
                    <FontAwesomeIcon
                        // style={{ fontSize: 30 }}
                        icon={faSquareMinus}
                        onClick={async (event) => {
                            event.stopPropagation();

                            try {
                                const data = {
                                    badgeId: badge._id,
                                };

                                // console.log(data);

                                if (conceptBadge) {
                                    const error =
                                        await signAndSubmitPrivateApiTxn(
                                            '/badges/removeConcept',
                                            data
                                        );
                                    console.log(error);
                                } else {
                                    const error =
                                        await signAndSubmitPrivateApiTxn(
                                            '/badges/removeOffering',
                                            data
                                        );
                                    console.log(error);
                                }
                            } catch (err) {
                                // setTxnSubmitted(false);
                                // setTransactionIsLoading(false);
                            }
                        }}
                    />
                </Tooltip>
            ) : (
                <Tooltip
                    className={`like-button-badge`}
                    title={`Add to Offering`}
                >
                    <FontAwesomeIcon
                        // style={{ fontSize: 30 }}
                        icon={faSquarePlus}
                        onClick={async (event) => {
                            event.stopPropagation();

                            try {
                                const data = {
                                    badgeId: badge._id,
                                };

                                const error = await signAndSubmitPrivateApiTxn(
                                    '/badges/addOffering',
                                    data
                                );
                                console.log(error);
                            } catch (err) {
                                // setTxnSubmitted(false);
                                // setTransactionIsLoading(false);
                            }
                        }}
                    />
                </Tooltip>
            )}
        </>
    );

    const rightMostIcon = (
        <>
            {conceptBadge && (
                <Tooltip
                    className={`like-button-badge`}
                    title={`This badge is just a concept.`}
                >
                    <div style={{}}>
                        <FontAwesomeIcon icon={faCloud} /> {balance}
                    </div>
                </Tooltip>
            )}
            {offeredBadge && !conceptBadge && (
                <Tooltip
                    className={`like-button-badge`}
                    title={`This badge has already been created.`}
                >
                    <div style={{}}>
                        <FontAwesomeIcon icon={faSnowflake} />
                    </div>
                </Tooltip>
            )}
            {!offeredBadge && !conceptBadge && (
                <>
                    {' '}
                    {profileInfo.likes.includes(badge._id) ? (
                        <Tooltip className={`like-button-badge`} title="Unlike">
                            <HeartFilled
                                onClick={async (event) => {
                                    event.stopPropagation();

                                    try {
                                        const data = {
                                            badgeId: badge._id,
                                        };

                                        const error =
                                            await signAndSubmitPrivateApiTxn(
                                                '/badges/unlike',
                                                data
                                            );
                                        console.log(error);
                                    } catch (err) {
                                        // setTxnSubmitted(false);
                                        // setTransactionIsLoading(false);
                                    }
                                }}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip className={`like-button-badge`} title="Like">
                            <HeartOutlined
                                onClick={async (event) => {
                                    event.stopPropagation();

                                    try {
                                        const data = {
                                            badgeId: badge._id,
                                        };

                                        const error =
                                            await signAndSubmitPrivateApiTxn(
                                                '/badges/like',
                                                data
                                            );
                                        console.log(error);

                                        // setTransactionIsLoading(false);
                                    } catch (err) {
                                        // setTxnSubmitted(false);
                                        // setTransactionIsLoading(false);
                                    }
                                }}
                            />
                        </Tooltip>
                    )}
                </>
            )}
        </>
    );

    return (
        <>
            <Card
                style={{
                    width: 230,
                    margin: 8,
                    textAlign: 'center',
                    borderRadius: '8%',
                    backgroundColor: PRIMARY_BLUE,
                    color: PRIMARY_TEXT,
                }}
                hoverable
                onClick={() => setModalIsVisible(true)}
                cover={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            color: PRIMARY_TEXT,
                        }}
                    >
                        <Avatar
                            style={{
                                verticalAlign: 'middle',
                                border: '3px solid',
                                borderColor: badge.metadata.color
                                    ? badge.metadata.color
                                    : 'black',
                                margin: '1rem',
                                cursor: 'pointer',
                                backgroundColor: badge.metadata.image
                                    ? PRIMARY_TEXT
                                    : badge.metadata.color,
                            }}
                            // className="badge-avatar"   //For scaling on hover
                            src={
                                badge.metadata.image
                                    ? badge.metadata.image
                                    : undefined
                            }
                            size={size}
                            onError={(e) => {
                                return false;
                            }}
                        />
                    </div>
                }
            >
                <Meta
                    title={
                        <div
                            style={{
                                fontSize: 20,
                                color: PRIMARY_TEXT,
                                fontWeight: 'bolder',
                            }}
                        >
                            {badge.metadata.name}
                        </div>
                    }
                    description={
                        <div
                            style={{
                                color: SECONDARY_TEXT,
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: 17,
                                width: '100%',
                            }}
                        >
                            <div
                                style={{
                                    width: 'calc(100% / 3)',
                                    textAlign: 'left',
                                }}
                            >
                                {supplyIcon}
                            </div>

                            <div style={{ width: 'calc(100% / 3)' }}>
                                {managing && addRemoveIcon}
                            </div>
                            <div
                                style={{
                                    width: 'calc(100% / 3)',
                                    textAlign: 'right',
                                }}
                            >
                                {rightMostIcon}
                            </div>
                        </div>
                    }
                />
            </Card>

            {!hideModal && (
                <BadgeModal
                    modalIsVisible={modalIsVisible}
                    setModalIsVisible={setModalIsVisible}
                    conceptBadge={conceptBadge}
                    badge={badge}
                    hidePermissions={hidePermissions}
                />
            )}
        </>
    );
}
