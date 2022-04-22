import React from 'react';
import { Layout, Row, Col } from 'antd';
import YoutubeEmbed from '../components/YouTubeEmbed';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../components/Badge';
import {
    LINK_COLOR,
    PRIMARY_BLUE,
    PRIMARY_TEXT,
    SAMPLE_BADGE,
    SECONDARY_BLUE,
    SECONDARY_TEXT,
} from '../constants';

const { Content } = Layout;

export function Home() {
    const navigate = useNavigate();

    return (
        <>
            <Layout
                style={{
                    background: `linear-gradient(0deg, ${SECONDARY_BLUE} 0,${PRIMARY_BLUE} 75%)`,
                    textAlign: 'center',
                }}
            >
                <Content>
                    <div
                        className="primary-text"
                        style={{
                            fontSize: '4rem',
                        }}
                    >
                        BitBadges
                    </div>
                    <div
                        className="primary-text"
                        style={{
                            marginBottom: '1rem',
                            fontSize: '2rem',
                            color: SECONDARY_TEXT,
                        }}
                    >
                        Issue Cross-Chain NFT Badges to Other Users!
                    </div>
                    <div>
                        <img src="bitbadgeslogo.png" alt="BitBadges logo" />
                    </div>
                </Content>
                <Content
                    style={{
                        padding: '1rem 5rem',
                    }}
                >
                    <Row
                        style={{
                            marginTop: '5rem',
                            marginBottom: '1rem',
                        }}
                    >
                        <div
                            className="primary-text"
                            style={{ fontSize: '3rem' }}
                        >
                            What is an NFT Badge?
                        </div>
                    </Row>
                    <Row>
                        <div
                            className="primary-text"
                            style={{
                                fontSize: '1.3em',
                                marginLeft: '10%',
                                marginRight: '10%',
                            }}
                        >
                            An NFT (non-fungible token) is a digital token
                            stored on the blockchain which can be provably owned
                            by someone. An NFT badge is an NFT given to someone
                            for doing something such as attending a concert,
                            running a marathon, or graduating college! Check out
                            some example badges below or an{' '}
                            <button
                                className="link-button-nav"
                                style={{ color: LINK_COLOR }}
                                onClick={() =>
                                    navigate(
                                        '/user/ETH:0xe00dD9D317573f7B4868D8f2578C65544B153A27'
                                    )
                                }
                            >
                                example portfolio here
                            </button>
                            .
                        </div>
                    </Row>
                    <Row
                        style={{
                            marginBottom: '3rem',
                            justifyContent: 'center',
                        }}
                    >
                        <div className="badge-flex-display">
                            {[0, 0, 0, 0, 0].map(() => {
                                return (
                                    <Badge badge={SAMPLE_BADGE} size={100} />
                                );
                            })}
                        </div>
                    </Row>
                </Content>
                <Content
                    style={{
                        padding: '1rem 5rem',
                    }}
                >
                    <Row
                        style={{
                            marginTop: '5rem',
                            marginBottom: '1rem',
                        }}
                    >
                        <div
                            className="primary-text"
                            style={{ fontSize: '3rem' }}
                        >
                            What is BitBadges?
                        </div>
                    </Row>
                    <Row>
                        <div
                            className="primary-text"
                            style={{
                                fontSize: '1.3em',
                                marginLeft: '10%',
                                marginRight: '10%',
                                marginBottom: '2rem',
                            }}
                        >
                            BitBadges runs on its own blockchain that was custom
                            built to support NFT badges. We created this
                            blockchain because we believed that a) existing
                            blockchains aren't fully suited for badges to go
                            mainstream, and b) we feel that badges should be
                            considered separate from collectibles. Even though
                            BitBadges is its own blockchain, it is{' '}
                            <u>identity-preserving</u>. You can directly use
                            your address from any supported chain with{' '}
                            <u>no bridges</u>!
                        </div>
                    </Row>
                    <Row justify="space-around">
                        <Col xs={24} xl={7}>
                            <div className="home-page-info">
                                <Row>
                                    <div
                                        style={{
                                            padding: '0 0.3rem',
                                            fontWeight: 'bolder',
                                            fontSize: '1rem',
                                            textAlign: 'left',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: '1.8rem',
                                                textAlign: 'center',
                                            }}
                                        >
                                            Blockchain
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            The BitBadges blockchain was custom
                                            built with features that existing
                                            Layer-1 NFT chains don't support
                                            natively.
                                        </div>
                                        <br />
                                        <br />
                                        <div>
                                            1) Scalability - We offer
                                            lightweight and hybrid options to
                                            create NFTs in addition to full
                                            smart contracts.
                                        </div>
                                        <div>
                                            2) Cross-Chain - BitBadges offers
                                            the capability for an Ethereum user
                                            to issue a badge to a Bitcoin user,
                                            for example.
                                        </div>
                                        <div>
                                            3) Hidden - These hidden badges are
                                            stored on the blockchain for lookup
                                            purposes only.
                                        </div>
                                        <div>
                                            4) Privacy Preserving - Many use
                                            cases of BitBadges such as
                                            transcripts and diplomas contain
                                            sensitive information. BitBadges
                                            offers the option to fully encrypt
                                            the contents of a badge or use
                                            zero-knowledge proofs.
                                        </div>
                                    </div>
                                </Row>
                            </div>
                        </Col>
                        <Col xs={24} xl={7}>
                            <div className="home-page-info">
                                <Row>
                                    <div
                                        style={{
                                            padding: '0 0.3rem',
                                            fontWeight: 'bolder',
                                            fontSize: '1rem',
                                            textAlign: 'left',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: '1.8rem',
                                                textAlign: 'center',
                                            }}
                                        >
                                            Website
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            The BitBadges website is the
                                            all-in-one user interface for the
                                            BitBadges blockchain.
                                        </div>
                                        <br />
                                        <br />
                                        <div>
                                            1) Browse - You can browse trending
                                            badges, recent activity, or other
                                            users' portfolios.
                                        </div>
                                        <div>
                                            2) Mint - You can mint new badges
                                            via the Mint tab.
                                        </div>
                                        <div>
                                            3) Display - Display your badges to
                                            the world! This site offers many
                                            profile customization options. Also,
                                            the 'Offering' tab on your portfolio
                                            is your place to show off the badges
                                            you are currently handing out!
                                        </div>
                                        <br />
                                        <br />
                                        <div>
                                            In the future, we hope to add many
                                            new features to this site such as
                                            content hosting, integrations, and
                                            much more!
                                        </div>
                                    </div>
                                </Row>
                            </div>
                        </Col>
                        <Col xs={24} xl={7}>
                            <div className="home-page-info">
                                <Row>
                                    <div
                                        style={{
                                            padding: '0 0.3rem',
                                            fontWeight: 'bolder',
                                            fontSize: '1rem',
                                            textAlign: 'left',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: '1.8rem',
                                                textAlign: 'center',
                                            }}
                                        >
                                            Developer Tools
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            We welcome any developers to join
                                            the BitBadges ecosystem and build on
                                            top of the BitBadges blockchain. We
                                            offer a public API and SDK which can
                                            be found{' '}
                                            <a
                                                href="https://bitbadges.github.io/"
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{
                                                    color: LINK_COLOR,
                                                }}
                                                className="link-button-nav"
                                            >
                                                here
                                            </a>
                                            .
                                            <br />
                                            <br />
                                            <div>
                                                There are many cool things
                                                planned for developers in the
                                                future such as grants, seed
                                                funds, and much more!
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Content>
                <Content
                    style={{
                        padding: '1rem 5rem',
                    }}
                >
                    <Row
                        justify="space-around"
                        style={{
                            marginTop: '5rem',
                            marginBottom: '1rem',
                        }}
                    >
                        <div
                            className="primary-text"
                            style={{ fontSize: '3rem' }}
                        >
                            Meet the Team
                        </div>
                    </Row>
                    <Row justify="space-around">
                        <Col xs={24} xl={11}>
                            <div
                                style={{
                                    alignItems: 'center',
                                }}
                                className="home-page-info"
                            >
                                <Row>
                                    <Col span={4}>
                                        <img
                                            src="untitled-design-56.png"
                                            style={{
                                                maxWidth: '14vw',
                                                width: '100%',
                                                height: 'auto',
                                            }}
                                            alt="Andrew M. K. Nassief"
                                        />
                                    </Col>
                                    <Col span={20}>
                                        <div
                                            style={{
                                                padding: '0 3rem',
                                                textAlign: 'center',
                                                fontWeight: 'bolder',
                                            }}
                                        >
                                            <div style={{ fontSize: '1.8rem' }}>
                                                Andrew M. K. Nassief
                                            </div>
                                            <div style={{ fontSize: '1rem' }}>
                                                Serial entrepreneur with years
                                                of experience across a variety
                                                of startups and big projects.
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xs={24} xl={11}>
                            <div
                                style={{
                                    alignItems: 'center',
                                }}
                                className="home-page-info"
                            >
                                <Row>
                                    <Col
                                        span={4}
                                        style={{
                                            alignItems: 'center',
                                            display: 'flex',
                                        }}
                                    >
                                        <img
                                            src="61992896.jpg"
                                            style={{
                                                maxWidth: '14vw',
                                                width: '100%',
                                                height: 'auto',
                                            }}
                                            alt="Trevor Miller"
                                        />
                                    </Col>
                                    <Col span={20}>
                                        <div
                                            style={{
                                                padding: '0 3rem',
                                                textAlign: 'center',
                                                fontWeight: 'bolder',
                                            }}
                                        >
                                            <div style={{ fontSize: '1.8rem' }}>
                                                Trevor Miller
                                            </div>
                                            <div style={{ fontSize: '1rem' }}>
                                                Trevor Miller is a passionate
                                                creator and blockchain developer
                                                who likes working on many new
                                                things. He is currently
                                                researching disruptive models
                                                for education.
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Content>
                <Content
                    style={{
                        padding: '1rem 5rem',
                    }}
                >
                    <Row
                        style={{
                            marginTop: '5rem',
                            marginBottom: '1rem',
                        }}
                    >
                        <div
                            className="primary-text"
                            style={{ fontSize: '3rem' }}
                        >
                            Partner Projects
                        </div>
                    </Row>
                    <Row justify="space-around">
                        <Col xs={24} xl={11}>
                            <a
                                className="scale home-page-info"
                                style={{
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    color: PRIMARY_TEXT,
                                }}
                                href="https://decentralizeduniversity.org/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Row justify="space-around">
                                    <Col
                                        span={6}
                                        style={{
                                            alignItems: 'center',
                                            display: 'flex',
                                        }}
                                    >
                                        <img
                                            src="decentralized-university.png"
                                            style={{
                                                maxWidth: '20vw',
                                                width: '100%',
                                            }}
                                            alt="Decentralized University"
                                        />
                                    </Col>
                                    <Col span={18}>
                                        <div
                                            style={{
                                                padding: '0 3rem',
                                                textAlign: 'center',
                                                fontWeight: 'bolder',
                                            }}
                                        >
                                            <div style={{ fontSize: '1.8rem' }}>
                                                Decentralized University
                                            </div>
                                            <div style={{ fontSize: '1rem' }}>
                                                The Decentralized University is
                                                a powerful, new organization
                                                aimed to level the playing field
                                                in academics through
                                                decentralization. BitBadges will
                                                be used to issue cross-chain,
                                                digital certifications such as
                                                diplomas or transcripts.
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </a>
                        </Col>
                        <Col xs={24} xl={11}>
                            <a
                                className="scale home-page-info"
                                style={{
                                    alignItems: 'center',
                                    color: PRIMARY_TEXT,
                                    cursor: 'pointer',
                                }}
                                href="https://cloutcontracts.net/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Row justify="space-around">
                                    <Col
                                        span={6}
                                        style={{
                                            alignItems: 'center',
                                            display: 'flex',
                                        }}
                                    >
                                        <img
                                            src="cloutcontracts.png"
                                            style={{
                                                maxWidth: '20vw',
                                                width: '100%',
                                            }}
                                            alt="CloutContracts"
                                        />
                                    </Col>
                                    <Col span={18}>
                                        <div
                                            style={{
                                                padding: '0 3rem',
                                                textAlign: 'center',
                                                fontWeight: 'bolder',
                                            }}
                                        >
                                            <div style={{ fontSize: '1.8rem' }}>
                                                CloutContracts
                                            </div>
                                            <div style={{ fontSize: '1rem' }}>
                                                CloutContracts aims to further
                                                decentralize and disrupt not
                                                just social media, but the
                                                internet. They want to be
                                                tailored towards both creators
                                                and developers. BitBadges plans
                                                to possibly integrate with
                                                CloutContracts as an
                                                interoperable sidechain for
                                                badge issuing.
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </a>
                        </Col>
                    </Row>
                </Content>
                <Content
                    style={{
                        padding: '1rem 5rem',
                    }}
                >
                    <Row
                        style={{
                            marginTop: '5rem',
                            marginBottom: '1rem',
                        }}
                    >
                        <div
                            className="primary-text"
                            style={{ fontSize: '3rem' }}
                        >
                            Demo Videos
                        </div>
                    </Row>
                    <Row justify="space-around">
                        <Col xs={24} xl={11}>
                            <YoutubeEmbed embedId={'kRnFKrDM-mA'} />
                        </Col>
                        <Col xs={24} xl={11}>
                            <YoutubeEmbed embedId={'vgL1BR4PZNU'} />
                        </Col>
                    </Row>
                </Content>
                <Content
                    style={{
                        padding: '1rem 5rem',
                    }}
                >
                    <Row
                        style={{
                            marginTop: '5rem',
                            marginBottom: '1rem',
                        }}
                    >
                        <div
                            className="primary-text"
                            style={{ fontSize: '3rem' }}
                        >
                            Roadmap
                        </div>
                    </Row>
                    <Row
                        justify="space-around"
                        style={{ width: '100%', fontSize: 30, color: 'white' }}
                    >
                        <div>Coming Soon....</div>
                    </Row>
                </Content>
            </Layout>
        </>
    );
}
