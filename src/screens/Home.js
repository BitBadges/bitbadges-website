import React from 'react';
import { Layout, Typography, Row, Col } from 'antd';
import YoutubeEmbed from '../components/YouTubeEmbed';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../components/Badge';

const { Content } = Layout;

export function Home() {
    const navigate = useNavigate();
    const sampleBadge = {
        metadata: {
            name: 'Sample',
            description: '',
            image: 'https://bitbadges.web.app/img/icons/logo.png',
            creator: 'ETH:0xe00dD9D317573f7B4868D8f2578C65544B153A27',
            validFrom: {
                start: 1649341503574,
                end: 8640000000000000,
            },
            color: 'black',
            type: 0,
            category: 'BitBadge',
            url: '',
        },
        permissions: {
            canMintMore: true,
            canRevoke: true,
            canOwnerTransfer: true,
        },
        supply: 0,
        manager: 'ETH:0xe00dD9D317573f7B4868D8f2578C65544B153A27',
        _id: 'f729504ee514b7c2e9c5dbfae92da5493007cb558d44e236dd19aa934dc0254a',
    };

    return (
        <>
            <Layout
                style={{
                    background: 'linear-gradient(0deg, #3e83f8 0,#001529 75%)',
                }}
            >
                <Content
                    style={{
                        padding: '2rem 0',
                        textAlign: 'center',
                    }}
                >
                    <div
                        style={{
                            padding: '20 1rem',
                            width: '100%',
                            marginRight: 'auto',
                            marginLeft: 'auto',
                        }}
                    >
                        <div>
                            <Typography.Text
                                strong
                                level={3}
                                style={{
                                    color: 'white',
                                    fontFamily: "'Inter',sans-serif",
                                    fontSize: '4rem',
                                    // paddingBottom: '1rem',
                                    fontStyle: 'normal',
                                    lineHeight: '1.2',
                                    width: '100%',
                                    wordBreak: 'break-word',
                                    wordWrap: 'break-word',
                                }}
                            >
                                BitBadges
                            </Typography.Text>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <Typography.Text
                                strong
                                level={3}
                                style={{
                                    color: '#dedede',
                                    fontFamily: "'Inter',sans-serif",
                                    fontSize: '2rem',
                                    fontStyle: 'normal',
                                    lineHeight: '1.2',
                                    width: '100%',
                                    wordBreak: 'break-word',
                                    wordWrap: 'break-word',
                                }}
                            >
                                Issue Cross-Chain NFT Badges to Other Users!
                            </Typography.Text>
                        </div>
                        <div>
                            <img src="bitbadgeslogo.png" alt="BitBadges logo" />
                        </div>
                    </div>
                </Content>
                <Content
                    style={{
                        // background:
                        //     'linear-gradient(0deg, #Ea1795 0,#3e83f8 100%)',

                        alignItems: 'center',
                        // padding: '3rem 0',
                        textAlign: 'center',
                        width: '100%',
                        padding: '1rem 5rem',
                    }}
                >
                    <Row
                        justify="space-around"
                        style={{
                            width: '100%',
                            marginTop: '5rem',
                            marginBottom: '1rem',
                        }}
                    >
                        <Col span={24}>
                            <div
                                style={{
                                    color: 'white',
                                    fontFamily: "'Inter',sans-serif",
                                    fontSize: '3em',
                                    fontWeight: 'bolder',
                                    // paddingBottom: '1rem',
                                    fontStyle: 'normal',
                                    lineHeight: '1.2',
                                    width: '100%',
                                    wordBreak: 'break-word',
                                    wordWrap: 'break-word',
                                }}
                            >
                                What is an NFT Badge?
                            </div>
                        </Col>
                    </Row>
                    <Row justify="space-around" style={{ width: '100%' }}>
                        <Col xs={24}>
                            <div
                                style={{
                                    color: 'white',
                                    fontFamily: "'Inter',sans-serif",
                                    fontSize: '1.3em',
                                    fontWeight: 'bold',
                                    // paddingBottom: '1rem',
                                    fontStyle: 'normal',
                                    lineHeight: '1.2',
                                    // width: '100%',
                                    marginLeft: '10%',
                                    marginRight: '10%',
                                    wordBreak: 'break-word',
                                    wordWrap: 'break-word',
                                    marginBottom: '2rem',
                                }}
                            >
                                An NFT (non-fungible token) is a digital token
                                stored on the blockchain which can be provably
                                owned by someone. An NFT badge is an NFT given
                                to someone for doing something such as attending
                                a concert, running a marathon, or graduating
                                college! Check out some example badges below or
                                an{' '}
                                <button
                                    className="link-button-nav"
                                    style={{ color: '#0000EE' }}
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
                        </Col>
                    </Row>
                    <Row
                        justify="space-around"
                        style={{
                            width: '100%',
                            marginBottom: '3rem',
                        }}
                    >
                        {/* <Col span={24}> */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                            }}
                        >
                            {[0, 0, 0, 0, 0].map((elem) => {
                                return <Badge badge={sampleBadge} size={100} />;
                            })}
                        </div>
                    </Row>
                </Content>
                <Content
                    style={{
                        // background:
                        //     'linear-gradient(0deg, #Ea1795 0,#3e83f8 100%)',

                        alignItems: 'center',
                        // padding: '3rem 0',
                        textAlign: 'center',
                        width: '100%',
                        padding: '1rem 5rem',
                    }}
                >
                    <Row
                        justify="space-around"
                        style={{
                            width: '100%',
                            marginTop: '5rem',
                            marginBottom: '1rem',
                        }}
                    >
                        <Col span={24}>
                            <div
                                style={{
                                    color: 'white',
                                    fontFamily: "'Inter',sans-serif",
                                    fontSize: '3em',
                                    fontWeight: 'bolder',
                                    // paddingBottom: '1rem',
                                    fontStyle: 'normal',
                                    lineHeight: '1.2',
                                    width: '100%',
                                    wordBreak: 'break-word',
                                    wordWrap: 'break-word',
                                }}
                            >
                                What is BitBadges?
                            </div>
                        </Col>
                    </Row>
                    <Row justify="space-around" style={{ width: '100%' }}>
                        <Col xs={24}>
                            <div
                                style={{
                                    color: 'white',
                                    fontFamily: "'Inter',sans-serif",
                                    fontSize: '1.3em',
                                    fontWeight: 'bold',
                                    // paddingBottom: '1rem',
                                    fontStyle: 'normal',
                                    lineHeight: '1.2',
                                    // width: '100%',
                                    marginLeft: '10%',
                                    marginRight: '10%',
                                    wordBreak: 'break-word',
                                    wordWrap: 'break-word',
                                    marginBottom: '2rem',
                                }}
                            >
                                BitBadges runs on its own blockchain that was
                                custom built to support NFT badges. We created
                                this blockchain because we believed that a)
                                existing blockchains aren't fully suited for
                                badges to go mainstream, and b) we feel that
                                badges should be considered separate from
                                collectibles. Even though BitBadges is its own
                                blockchain, it is <u>identity-preserving</u>.
                                You can directly use your address from any
                                supported chain with <u>no bridges</u>!
                            </div>
                        </Col>
                    </Row>
                    <Row justify="space-around" style={{ width: '100%' }}>
                        <Col xs={24} xl={7}>
                            <div
                                style={{
                                    borderRadius: '10px',
                                    background: '#3e83f8',
                                    boxShadow:
                                        'inset 0 0 0 1px #ebebf0,0 15px 30px 0 rgba(0,0,0,0.15)',
                                    height: '100%',
                                    width: '100%',
                                    padding: '1rem',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    color: 'white',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Row
                                    justify="space-around"
                                    style={{ width: '100%' }}
                                >
                                    <Col span={24}>
                                        <div
                                            style={{
                                                padding: '0 0.3rem',
                                                textAlign: 'center',
                                                fontWeight: 'bolder',
                                            }}
                                        >
                                            <div style={{ fontSize: '1.8rem' }}>
                                                Blockchain
                                            </div>
                                            <div style={{ fontSize: '1rem' }}>
                                                The BitBadges blockchain was
                                                custom built with features that
                                                existing Layer-1 NFT chains
                                                don't support natively.
                                                <br />
                                                <br />
                                                <div
                                                    style={{
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    1) Scalability - We offer
                                                    lightweight and hybrid
                                                    options to create NFTs in
                                                    addition to full smart
                                                    contracts.
                                                </div>
                                                <div
                                                    style={{
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    2) Cross-Chain - BitBadges
                                                    offers the capability for an
                                                    Ethereum user to issue a
                                                    badge to a Bitcoin user, for
                                                    example.
                                                </div>
                                                <div
                                                    style={{
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    3) Hidden - These hidden
                                                    badges are stored on the
                                                    blockchain for lookup
                                                    purposes only.
                                                </div>
                                                <div
                                                    style={{
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    4) Privacy Preserving - Many
                                                    use cases of BitBadges such
                                                    as transcripts and diplomas
                                                    contain sensitive
                                                    information. BitBadges
                                                    offers the option to fully
                                                    encrypt the contents of a
                                                    badge or use zero-knowledge
                                                    proofs.
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xs={24} xl={7}>
                            <div
                                style={{
                                    borderRadius: '10px',
                                    background: '#3e83f8',
                                    boxShadow:
                                        'inset 0 0 0 1px #ebebf0,0 15px 30px 0 rgba(0,0,0,0.15)',
                                    height: '100%',
                                    width: '100%',
                                    padding: '1rem',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    color: 'white',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Row
                                    justify="space-around"
                                    style={{ width: '100%' }}
                                >
                                    <Col span={24}>
                                        <div
                                            style={{
                                                padding: '0 0.3rem',
                                                textAlign: 'center',
                                                fontWeight: 'bolder',
                                            }}
                                        >
                                            <div style={{ fontSize: '1.8rem' }}>
                                                Website
                                            </div>
                                            <div style={{ fontSize: '1rem' }}>
                                                The BitBadges website is the
                                                all-in-one user interface for
                                                the BitBadges blockchain.
                                                <br />
                                                <br />
                                                <div
                                                    style={{
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    1) Browse - You can browse
                                                    trending badges, recent
                                                    activity, or other users'
                                                    portfolios.
                                                </div>
                                                <div
                                                    style={{
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    2) Mint - You can mint new
                                                    badges via the Mint tab.
                                                </div>
                                                <div
                                                    style={{
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    3) Display - Display your
                                                    badges to the world! This
                                                    site offers many profile
                                                    customization options. Also,
                                                    the 'Offering' tab on your
                                                    portfolio is your place to
                                                    show off the badges you are
                                                    currently handing out!
                                                </div>
                                                <br />
                                                <br />
                                                <div
                                                    style={{
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    In the future, we hope to
                                                    add many new features to
                                                    this site such as content
                                                    hosting, integrations, and
                                                    much more!
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col xs={24} xl={7}>
                            <div
                                style={{
                                    borderRadius: '10px',
                                    background: '#3e83f8',
                                    boxShadow:
                                        'inset 0 0 0 1px #ebebf0,0 15px 30px 0 rgba(0,0,0,0.15)',
                                    height: '100%',
                                    width: '100%',
                                    padding: '1rem',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    color: 'white',
                                    justifyContent: 'space-between',
                                }}
                                href="https://decentralizeduniversity.org/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Row
                                    justify="space-around"
                                    style={{ width: '100%' }}
                                >
                                    <Col span={24}>
                                        <div
                                            style={{
                                                padding: '0 0.3rem',
                                                textAlign: 'center',
                                                fontWeight: 'bolder',
                                            }}
                                        >
                                            <div style={{ fontSize: '1.8rem' }}>
                                                Developer Tools
                                            </div>
                                            <div style={{ fontSize: '1rem' }}>
                                                We welcome any developers to
                                                join the BitBadges ecosystem and
                                                build on top of the BitBadges
                                                blockchain. We offer a public
                                                API and SDK which can be found{' '}
                                                <a
                                                    href="https://bitbadges.github.io/"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    style={{ color: 'blue' }}
                                                >
                                                    here
                                                </a>
                                                .
                                                <br />
                                                <br />
                                                <div
                                                    style={{
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    There are many cool things
                                                    planned for developers in
                                                    the future such as grants,
                                                    seed funds, and much more!
                                                </div>
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
                        alignItems: 'center',
                        // minHeight: '40vh',
                        textAlign: 'center',
                        width: '100%',
                        padding: '1rem 5rem',
                    }}
                >
                    <Row
                        justify="space-around"
                        style={{
                            width: '100%',
                            marginTop: '5rem',
                            marginBottom: '1rem',
                        }}
                    >
                        <Col span={24}>
                            <div
                                style={{
                                    color: 'white',
                                    fontFamily: "'Inter',sans-serif",
                                    fontSize: '3em',
                                    fontWeight: 'bolder',
                                    // paddingBottom: '1rem',
                                    fontStyle: 'normal',
                                    lineHeight: '1.2',
                                    width: '100%',
                                    wordBreak: 'break-word',
                                    wordWrap: 'break-word',
                                }}
                            >
                                Meet the Team
                            </div>
                        </Col>
                    </Row>
                    <Row justify="space-around" style={{ width: '100%' }}>
                        <Col xs={24} xl={11}>
                            <div
                                style={{
                                    borderRadius: '10px',
                                    background: '#3e83f8',
                                    boxShadow:
                                        'inset 0 0 0 1px #ebebf0,0 15px 30px 0 rgba(0,0,0,0.15)',
                                    height: '100%',
                                    width: '100%',
                                    padding: '1rem',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    color: 'white',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Row
                                    justify="space-around"
                                    style={{ width: '100%' }}
                                >
                                    <Col
                                        span={4}
                                        style={{
                                            alignItems: 'center',
                                            display: 'flex',
                                        }}
                                    >
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
                                    borderRadius: '10px',
                                    background: '#3e83f8',
                                    boxShadow:
                                        'inset 0 0 0 1px #ebebf0,0 15px 30px 0 rgba(0,0,0,0.15)',
                                    height: '100%',
                                    width: '100%',
                                    padding: '1rem',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    color: 'white',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Row
                                    justify="space-around"
                                    style={{ width: '100%' }}
                                >
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
                        alignItems: 'center',
                        // minHeight: '40vh',
                        textAlign: 'center',
                        width: '100%',
                        padding: '1rem 5rem',
                    }}
                >
                    <Row
                        justify="space-around"
                        style={{
                            width: '100%',
                            marginTop: '5rem',
                            marginBottom: '1rem',
                        }}
                    >
                        <Col span={24}>
                            <div
                                style={{
                                    color: 'white',
                                    fontFamily: "'Inter',sans-serif",
                                    fontSize: '3em',
                                    fontWeight: 'bolder',
                                    // paddingBottom: '1rem',
                                    fontStyle: 'normal',
                                    lineHeight: '1.2',
                                    width: '100%',
                                    wordBreak: 'break-word',
                                    wordWrap: 'break-word',
                                }}
                            >
                                Partner Projects
                            </div>
                        </Col>
                    </Row>
                    <Row justify="space-around" style={{ width: '100%' }}>
                        <Col xs={24} xl={11}>
                            <a
                                className="scale"
                                style={{
                                    borderRadius: '10px',
                                    background: '#3e83f8',
                                    boxShadow:
                                        'inset 0 0 0 1px #ebebf0,0 15px 30px 0 rgba(0,0,0,0.15)',
                                    height: '100%',
                                    width: '100%',
                                    padding: '1rem',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    color: 'white',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer',
                                }}
                                href="https://decentralizeduniversity.org/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Row
                                    justify="space-around"
                                    style={{ width: '100%' }}
                                >
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
                                                // height: '100%',
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
                                className="scale"
                                style={{
                                    borderRadius: '10px',
                                    background: '#3e83f8',
                                    boxShadow:
                                        'inset 0 0 0 1px #ebebf0,0 15px 30px 0 rgba(0,0,0,0.15)',
                                    height: '100%',
                                    width: '100%',
                                    padding: '1rem',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    color: 'white',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer',
                                }}
                                href="https://cloutcontracts.net/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Row
                                    justify="space-around"
                                    style={{ width: '100%' }}
                                >
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
                                                // height: '100%',
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
                        // background:
                        //     'linear-gradient(0deg, #Ea1795 0,#3e83f8 100%)',

                        alignItems: 'center',
                        // padding: '3rem 0',
                        textAlign: 'center',
                        width: '100%',
                        padding: '1rem 5rem',
                    }}
                >
                    <Row
                        justify="space-around"
                        style={{
                            width: '100%',
                            marginTop: '5rem',
                            marginBottom: '1rem',
                        }}
                    >
                        <Col span={24}>
                            <div
                                style={{
                                    color: 'white',
                                    fontFamily: "'Inter',sans-serif",
                                    fontSize: '3em',
                                    fontWeight: 'bolder',
                                    // paddingBottom: '1rem',
                                    fontStyle: 'normal',
                                    lineHeight: '1.2',
                                    width: '100%',
                                    wordBreak: 'break-word',
                                    wordWrap: 'break-word',
                                }}
                            >
                                Demo Videos
                            </div>
                        </Col>
                    </Row>
                    <Row justify="space-around" style={{ width: '100%' }}>
                        <Col xs={24} xl={11}>
                            <div>
                                <YoutubeEmbed embedId={'kRnFKrDM-mA'} />
                            </div>
                        </Col>
                        <Col xs={24} xl={11}>
                            <div>
                                <YoutubeEmbed embedId={'vgL1BR4PZNU'} />
                            </div>
                        </Col>
                    </Row>
                </Content>
                <Content
                    style={{
                        // background:
                        //     'linear-gradient(0deg, #Ea1795 0,#3e83f8 100%)',

                        alignItems: 'center',
                        // padding: '3rem 0',
                        textAlign: 'center',
                        width: '100%',
                        padding: '1rem 5rem',
                    }}
                >
                    <Row
                        justify="space-around"
                        style={{
                            width: '100%',
                            marginTop: '5rem',
                            marginBottom: '1rem',
                        }}
                    >
                        <Col span={24}>
                            <div
                                style={{
                                    color: 'white',
                                    fontFamily: "'Inter',sans-serif",
                                    fontSize: '3em',
                                    fontWeight: 'bolder',
                                    // paddingBottom: '1rem',
                                    fontStyle: 'normal',
                                    lineHeight: '1.2',
                                    width: '100%',
                                    wordBreak: 'break-word',
                                    wordWrap: 'break-word',
                                }}
                            >
                                Roadmap
                            </div>
                        </Col>
                    </Row>
                    <Row
                        justify="space-around"
                        style={{ width: '100%', fontSize: 30, color: 'white' }}
                    >
                        <Col xs={24}>
                            <div>Coming Soon....</div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </>
    );
}
