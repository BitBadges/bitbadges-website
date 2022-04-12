/* eslint-disable react-hooks/exhaustive-deps */
import { Badge } from './Badge';
import { RecipientFormItem } from './RecipientFormItem';
const {
    PlusOutlined,
    DownOutlined,
    CalendarOutlined,
    CaretLeftFilled,
    CaretRightFilled,
} = require('@ant-design/icons');
const {
    Typography,
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    Space,
    Divider,
    InputNumber,
} = require('antd');
const isuri = require('isuri');

const React = require('react');
const { useEffect, useState } = require('react');
const { MAX_DATE_TIMESTAMP } = require('../constants');

const { Text } = Typography;
const { useSelector } = require('react-redux');
const { Option } = Select;
export function BadgeDataForm({
    setCurrStepNumber,
    setBadge,
    setRecipients,
    isConceptForm,
    saveSupply,
}) {
    const address = useSelector((state) => state.user.address);
    const [stepNum, setStepNum] = useState(isConceptForm ? 1 : 0);

    let savedBadgeDataStr = window.localStorage.getItem('savedBadgeData');
    if (!savedBadgeDataStr) {
        window.localStorage.setItem('savedBadgeData', '{}');
        savedBadgeDataStr = '{}';
    }
    if (isConceptForm) {
        savedBadgeDataStr = '{}';
    }

    const savedBadgeData = JSON.parse(savedBadgeDataStr);

    const [recipients, setRecipientsArr] = useState(
        savedBadgeData.recipients ? savedBadgeData.recipients : []
    );

    const [nextButtonDisabled, setNextButtonDisabled] = useState(
        savedBadgeData.title ? true : false
    );

    const [title, setTitle] = useState(
        savedBadgeData.title ? savedBadgeData.title : ''
    );
    const [description, setDescription] = useState(
        savedBadgeData.description ? savedBadgeData.description : ''
    );
    const [imageUrl, setImageUrl] = useState(
        savedBadgeData.imageUrl
            ? savedBadgeData.imageUrl
            : 'https://bitbadges.web.app/img/icons/logo.png'
    );
    const [backgroundColor, setBackgroundColor] = useState(
        savedBadgeData.backgroundColor
            ? savedBadgeData.backgroundColor
            : 'black'
    );
    const [expirationDateValue, setExpirationDateValue] = useState(
        savedBadgeData.expirationDateValue
            ? savedBadgeData.expirationDateValue
            : undefined
    );
    const [badgeData, setBadgeData] = useState(
        savedBadgeData.badgeData ? savedBadgeData.badgeData : undefined
    );
    const [type, setType] = useState(
        savedBadgeData.type ? savedBadgeData.type : 0
    );
    const [category, setCategory] = useState(
        savedBadgeData.category ? savedBadgeData.category : 'BitBadge'
    );
    const [externalUrl, setExternalUrl] = useState(
        savedBadgeData.externalUrl ? savedBadgeData.externalUrl : undefined
    );
    const [supply, setSupply] = useState(
        savedBadgeData.supply ? savedBadgeData.supply : 0
    );
    const [items, setItems] = useState(
        savedBadgeData.items
            ? savedBadgeData.items
            : ['BitBadge', 'Attendance', 'Certification']
    );
    const [name, setName] = useState(
        savedBadgeData.name ? savedBadgeData.name : ''
    );
    const [images, setImages] = useState(
        savedBadgeData.images
            ? savedBadgeData.images
            : [
                  {
                      value: 'https://bitbadges.web.app/img/icons/logo.png',
                      label: 'BitBadges Logo',
                  },
                  {
                      value: 'https://png.pngtree.com/element_pic/16/11/26/4f816dc086585b8c9d4516821a15dc6e.jpg',
                      label: 'Trophy',
                  },
                  {
                      value: 'https://library.kissclipart.com/20191129/oq/kissclipart-gold-medal-058a93f291de9771.png',
                      label: 'Medal',
                  },
              ]
    );
    const [newImage, setNewImage] = useState(
        savedBadgeData.newImage ? savedBadgeData.newImage : ''
    );

    const incrementStep = () => {
        if (stepNum === 8) {
            setCurrStepNumber(2);
        } else {
            setStepNum(stepNum + 1);
            setNextButton(stepNum + 1);
        }
    };

    const decrementStep = () => {
        if (stepNum === 0 && !isConceptForm) {
            setCurrStepNumber(0);
        } else if (stepNum === 1 && isConceptForm) {
            setCurrStepNumber(0);
        } else {
            setStepNum(stepNum - 1);
            setNextButton(stepNum - 1);
        }
    };

    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, name]);
        setName('');
    };

    const onNameChange = (event) => {
        setName(event.target.value);
    };

    const addImage = (e) => {
        e.preventDefault();
        setImages([
            ...images,
            {
                value: newImage,
                label: newImage,
            },
        ]);
        setNewImage('');
    };

    const onNewImageChange = (event) => {
        setNewImage(event.target.value);
    };

    const updateBadgeData = () => {
        setBadgeData({
            name: title,
            description,
            image: imageUrl,
            creator: `ETH:${address}`,
            validFrom: expirationDateValue
                ? {
                      start: Date.now(),
                      end: expirationDateValue,
                  }
                : { start: Date.now(), end: MAX_DATE_TIMESTAMP },
            color: backgroundColor ? backgroundColor : 'black',
            type,
            category: category ? category : 'Other',
            url: externalUrl ? externalUrl : '',
        });
        setRecipients(recipients);
        let count = 0;
        for (const recipient of recipients) {
            count += recipient.amount;
        }
        if (!isConceptForm) {
            setSupply(count);
        }

        window.localStorage.setItem(
            'savedBadgeData',
            JSON.stringify({
                recipients,
                title,
                description,
                imageUrl,
                backgroundColor,
                expirationDateValue,
                badgeData,
                type,
                category,
                externalUrl,
                supply,
                items,
                name,
                images,
                newImage,
            })
        );
    };

    useEffect(() => {
        updateBadgeData();
        setNextButton(stepNum);
    }, [
        title,
        description,
        category,
        externalUrl,
        backgroundColor,
        imageUrl,
        expirationDateValue,
        recipients,
    ]);

    const setNextButton = (newStepNum) => {
        if (newStepNum === 0) {
            setNextButtonDisabled(title !== '');
        } else if (newStepNum === 1) {
            setNextButtonDisabled(title === '');
        } else if (newStepNum === 2) {
            setNextButtonDisabled(false);
        } else if (newStepNum === 3) {
            setNextButtonDisabled(!category);
        } else if (newStepNum === 4) {
            setNextButtonDisabled(!isuri.isValid(imageUrl));
        } else if (newStepNum === 5) {
            setNextButtonDisabled(!backgroundColor);
        } else if (newStepNum === 6) {
            setNextButtonDisabled(externalUrl && !isuri.isValid(externalUrl));
        } else if (newStepNum === 7) {
            setNextButtonDisabled(false);
        } else if (newStepNum === 8) {
            setNextButtonDisabled(true);
        }
    };

    return (
        <div style={{ textAlign: 'left' }}>
            <Form.Provider>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <button
                        // className="link-button"
                        style={{
                            // position: 'absolute',
                            // left: 5,
                            backgroundColor: 'inherit',
                            color: '#ddd',
                            fontSize: 17,
                        }}
                        onClick={() => decrementStep()}
                        className="opacity link-button"
                    >
                        <CaretLeftFilled size={40} />
                        Back
                    </button>
                    <Typography.Text
                        strong
                        style={{
                            color: 'white',
                            fontSize: 20,
                            marginLeft: 50,
                            marginRight: 50,
                        }}
                        align="center"
                    >
                        {stepNum} / 8
                    </Typography.Text>
                    {nextButtonDisabled ? (
                        <button
                            // className="link-button"
                            style={{
                                // position: 'absolute',
                                // left: 5,
                                backgroundColor: 'inherit',
                                color: '#ddd',
                                fontSize: 17,
                                cursor: 'not-allowed',
                            }}
                            onClick={() => incrementStep()}
                            className="opacity link-button"
                            disabled={nextButtonDisabled}
                        >
                            Next
                            <CaretRightFilled size={40} />
                        </button>
                    ) : (
                        <button
                            // className="link-button"
                            style={{
                                // position: 'absolute',
                                // left: 5,
                                backgroundColor: 'inherit',
                                color: '#ddd',
                                fontSize: 17,
                            }}
                            onClick={() => incrementStep()}
                            className="opacity link-button"
                        >
                            Next
                            <CaretRightFilled size={40} />
                        </button>
                    )}
                </div>

                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                >
                    {stepNum === 0 && (
                        <>
                            <div
                                style={{
                                    justifyContent: 'center',
                                    display: 'flex',
                                }}
                            >
                                <Typography.Text
                                    style={{
                                        color: 'white',
                                        fontSize: 20,
                                        marginBottom: 10,
                                    }}
                                    strong
                                >
                                    Use Saved Data?
                                </Typography.Text>
                            </div>
                            {title !== '' ? (
                                <>
                                    <div
                                        style={{
                                            justifyContent: 'center',
                                            display: 'flex',
                                        }}
                                    >
                                        <Typography.Text
                                            style={{
                                                color: 'white',
                                                fontSize: 14,
                                            }}
                                            strong
                                        >
                                            Would you like to proceed with your
                                            saved changes from last time or
                                            start from scratch?
                                        </Typography.Text>
                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                flexWrap: 'wrap',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Badge
                                                size={100}
                                                badge={{
                                                    metadata: badgeData,
                                                    supply,
                                                    manager: `ETH:${address}`,
                                                }}
                                                hidePermissions
                                            />
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            justifyContent: 'center',
                                            display: 'flex',
                                            flexWrap: 'wrap ',
                                        }}
                                    >
                                        <Button
                                            style={{
                                                width: '200px',
                                                marginTop: 10,
                                                backgroundColor: '#001529',
                                                color: 'white',
                                                marginRight: 10,
                                                marginLeft: 10,
                                            }}
                                            onClick={() => {
                                                incrementStep();
                                            }}
                                        >
                                            Use Saved Data
                                        </Button>
                                        <Button
                                            style={{
                                                width: '200px',
                                                marginTop: 10,
                                                backgroundColor: '#001529',
                                                color: 'white',

                                                marginRight: 10,
                                                marginLeft: 10,
                                            }}
                                            onClick={() => {
                                                setRecipientsArr([]);
                                                setTitle('');
                                                setDescription('');
                                                setImageUrl(
                                                    'https://bitbadges.web.app/img/icons/logo.png'
                                                );
                                                setBackgroundColor('black');
                                                // setExpirationDate(false);
                                                setExpirationDateValue(
                                                    undefined
                                                );
                                                setType(0);
                                                setCategory('BitBadge');
                                                setExternalUrl(undefined);
                                                setSupply(0);
                                                incrementStep();
                                            }}
                                        >
                                            Start from Scratch
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div
                                        style={{
                                            justifyContent: 'center',
                                            display: 'flex',
                                        }}
                                    >
                                        <Typography.Text
                                            style={{
                                                color: 'white',
                                                fontSize: 14,
                                            }}
                                            strong
                                        >
                                            We have not detected any saved
                                            changes. We will proceed by creating
                                            the badge from scratch.
                                        </Typography.Text>
                                    </div>
                                    <div
                                        style={{
                                            justifyContent: 'center',
                                            display: 'flex',
                                        }}
                                    >
                                        <Button
                                            style={{
                                                width: '50%',
                                                marginTop: 10,
                                                backgroundColor: '#001529',
                                                color: 'white',
                                                marginLeft: 10,
                                            }}
                                            onClick={() => {
                                                setRecipientsArr([]);
                                                setTitle('');
                                                setDescription('');
                                                setImageUrl(
                                                    'https://bitbadges.web.app/img/icons/logo.png'
                                                );
                                                setBackgroundColor('black');
                                                // setExpirationDate(false);
                                                setExpirationDateValue(
                                                    undefined
                                                );
                                                setType(0);
                                                setCategory('BitBadge');
                                                setExternalUrl(undefined);
                                                setSupply(0);
                                                incrementStep();
                                            }}
                                        >
                                            Start from Scratch
                                        </Button>
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {stepNum === 1 && (
                        <>
                            <div
                                style={{
                                    justifyContent: 'center',
                                    display: 'flex',
                                }}
                            >
                                <Typography.Text
                                    style={{
                                        color: 'white',
                                        fontSize: 20,
                                        marginBottom: 10,
                                    }}
                                    strong
                                >
                                    Describe your badge
                                </Typography.Text>
                            </div>
                            <div>
                                <Form.Item
                                    label={
                                        <Text style={{ color: 'white' }} strong>
                                            Title
                                        </Text>
                                    }
                                    required
                                >
                                    <Input
                                        value={title}
                                        onChange={(e) => {
                                            setTitle(e.target.value);
                                        }}
                                        style={{
                                            backgroundColor: '#001529',
                                            color: 'white',
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={
                                        <Text style={{ color: 'white' }} strong>
                                            Description
                                        </Text>
                                    }
                                >
                                    <Input.TextArea
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        style={{
                                            backgroundColor: '#001529',
                                            color: 'white',
                                        }}
                                    />
                                </Form.Item>
                            </div>
                        </>
                    )}
                    {stepNum === 2 && !isConceptForm && (
                        <>
                            <div
                                style={{
                                    justifyContent: 'center',
                                    display: 'flex',
                                }}
                            >
                                <Typography.Text
                                    style={{
                                        color: 'white',
                                        fontSize: 20,
                                        marginBottom: 10,
                                    }}
                                    strong
                                >
                                    Add Recipients (Optional)
                                </Typography.Text>
                            </div>
                            <RecipientFormItem
                                recipients={recipients}
                                setRecipients={setRecipientsArr}
                            />
                        </>
                    )}

                    {stepNum === 2 && isConceptForm && (
                        <>
                            <div
                                style={{
                                    justifyContent: 'center',
                                    display: 'flex',
                                }}
                            >
                                <Typography.Text
                                    style={{
                                        color: 'white',
                                        fontSize: 20,
                                        marginBottom: 10,
                                    }}
                                    strong
                                >
                                    Supply
                                </Typography.Text>
                            </div>
                            <div>
                                <Form.Item
                                    label={
                                        <Text style={{ color: 'white' }} strong>
                                            Total Supply
                                        </Text>
                                    }
                                    required
                                >
                                    <InputNumber
                                        value={supply}
                                        onChange={(e) => {
                                            setSupply(e);
                                            saveSupply(e);
                                        }}
                                        style={{
                                            backgroundColor: '#001529',
                                            color: 'white',
                                            width: '100%',
                                        }}
                                    />
                                </Form.Item>
                            </div>
                        </>
                    )}

                    {/* <Form.Item label={<Text style={{color: 'white'}} strong>Badge Type</Text>}>
                        <Select
                            value={type}
                            defaultValue={type}
                            onSelect={(e) => setType(e)}
                        >
                            <Select.Option value={0}>
                                Public (Image + Category Required)
                            </Select.Option>
                        </Select>
                    </Form.Item> */}

                    {stepNum === 3 && (
                        <>
                            <div
                                style={{
                                    justifyContent: 'center',
                                    display: 'flex',
                                }}
                            >
                                <Typography.Text
                                    style={{
                                        color: 'white',
                                        fontSize: 20,
                                        marginBottom: 10,
                                    }}
                                    strong
                                >
                                    Select a Category
                                </Typography.Text>
                            </div>
                            <Form.Item
                                label={
                                    <Text style={{ color: 'white' }} strong>
                                        Category
                                    </Text>
                                }
                                required={type === 0}
                            >
                                <Select
                                    className="selector"
                                    value={category}
                                    placeholder="Default: Other"
                                    onChange={(e) => setCategory(e)}
                                    style={{
                                        backgroundColor: '#001529',
                                        color: 'white',
                                    }}
                                    suffixIcon={
                                        <DownOutlined
                                            style={{ color: 'white' }}
                                        />
                                    }
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider
                                                style={{ margin: '8px 0' }}
                                            />
                                            <Space
                                                align="center"
                                                style={{ padding: '0 8px 4px' }}
                                            >
                                                <Input
                                                    placeholder="Add Custom Category"
                                                    value={name}
                                                    onChange={onNameChange}
                                                />
                                                <Typography.Link
                                                    onClick={addItem}
                                                    style={{
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    <PlusOutlined /> Add
                                                    Category
                                                </Typography.Link>
                                            </Space>
                                        </>
                                    )}
                                >
                                    {items.map((item) => (
                                        <Option key={item} value={item}>
                                            {item}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </>
                    )}

                    {stepNum === 4 && (
                        <>
                            <div
                                style={{
                                    justifyContent: 'center',
                                    display: 'flex',
                                }}
                            >
                                <Typography.Text
                                    style={{
                                        color: 'white',
                                        fontSize: 20,
                                        marginBottom: 10,
                                    }}
                                    strong
                                >
                                    Select an Image
                                </Typography.Text>
                            </div>
                            <Form.Item
                                label={
                                    <Text style={{ color: 'white' }} strong>
                                        Image URI
                                    </Text>
                                }
                                required={type === 0}
                            >
                                {/* <Input
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        /> */}
                                <Select
                                    className="selector"
                                    value={imageUrl}
                                    // placeholder="Default: Other"
                                    onChange={(e) => setImageUrl(e)}
                                    style={{
                                        backgroundColor: '#001529',
                                        color: 'white',
                                    }}
                                    suffixIcon={
                                        <DownOutlined
                                            style={{ color: 'white' }}
                                        />
                                    }
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider
                                                style={{ margin: '8px 0' }}
                                            />
                                            <Space
                                                align="center"
                                                style={{ padding: '0 8px 4px' }}
                                            >
                                                <Input
                                                    placeholder="Enter Custom Image URI"
                                                    value={newImage}
                                                    onChange={onNewImageChange}
                                                />
                                                <Typography.Link
                                                    disabled={
                                                        !isuri.isValid(newImage)
                                                    }
                                                    onClick={addImage}
                                                    style={{
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    <PlusOutlined /> Add Image
                                                </Typography.Link>
                                            </Space>
                                        </>
                                    )}
                                >
                                    {images.map((item) => (
                                        <Option
                                            key={item.value}
                                            value={item.value}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <img
                                                    src={item.value}
                                                    height="20px"
                                                    style={{ paddingRight: 10 }}
                                                    alt="Label"
                                                />
                                                <div>{item.label}</div>
                                            </div>
                                        </Option>
                                    ))}
                                </Select>
                                <br />
                                <div style={{ fontSize: 12 }}>
                                    <Text style={{ color: 'lightgray' }}>
                                        *If you use a custom image, please use a
                                        permanent file storage solution such as
                                        IPFS.
                                    </Text>
                                </div>
                            </Form.Item>
                        </>
                    )}

                    {stepNum === 5 && (
                        <>
                            <div
                                style={{
                                    justifyContent: 'center',
                                    display: 'flex',
                                }}
                            >
                                <Typography.Text
                                    style={{
                                        color: 'white',
                                        fontSize: 20,
                                        marginBottom: 10,
                                    }}
                                    strong
                                >
                                    Select a Color
                                </Typography.Text>
                            </div>
                            <Form.Item
                                label={
                                    <Text style={{ color: 'white' }} strong>
                                        Color
                                    </Text>
                                }
                                required
                            >
                                <Select
                                    className="selector"
                                    defaultValue={backgroundColor}
                                    onSelect={(e) => setBackgroundColor(e)}
                                    style={{
                                        backgroundColor: '#001529',
                                        color: 'white',
                                    }}
                                    suffixIcon={
                                        <DownOutlined
                                            style={{ color: 'white' }}
                                        />
                                    }
                                >
                                    <Select.Option value="black">
                                        <span style={{ color: 'black' }}>
                                            ⬤
                                        </span>{' '}
                                        Black
                                    </Select.Option>
                                    <Select.Option value="red">
                                        <span style={{ color: 'red' }}>⬤</span>{' '}
                                        Red
                                    </Select.Option>
                                    <Select.Option value="blue">
                                        <span style={{ color: 'blue' }}>⬤</span>{' '}
                                        Blue
                                    </Select.Option>
                                    <Select.Option value="green">
                                        <span style={{ color: 'green' }}>
                                            ⬤
                                        </span>{' '}
                                        Green
                                    </Select.Option>
                                    <Select.Option value="orange">
                                        <span style={{ color: 'orange' }}>
                                            ⬤
                                        </span>{' '}
                                        Orange
                                    </Select.Option>
                                    <Select.Option value="yellow">
                                        <span style={{ color: 'yellow' }}>
                                            ⬤
                                        </span>{' '}
                                        Yellow
                                    </Select.Option>
                                    <Select.Option value="purple">
                                        <span style={{ color: 'purple' }}>
                                            ⬤
                                        </span>{' '}
                                        Purple
                                    </Select.Option>
                                    <Select.Option value="pink">
                                        <span style={{ color: 'pink' }}>⬤</span>{' '}
                                        Pink
                                    </Select.Option>
                                    <Select.Option value="brown">
                                        <span style={{ color: 'brown' }}>
                                            ⬤
                                        </span>{' '}
                                        Brown
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </>
                    )}

                    {stepNum === 6 && (
                        <>
                            <div
                                style={{
                                    justifyContent: 'center',
                                    display: 'flex',
                                }}
                            >
                                <Typography.Text
                                    style={{
                                        color: 'white',
                                        fontSize: 20,
                                        marginBottom: 10,
                                    }}
                                    strong
                                >
                                    Add External URL (Optional)
                                </Typography.Text>
                            </div>
                            <Form.Item
                                label={
                                    <Text style={{ color: 'white' }} strong>
                                        External URL
                                    </Text>
                                }
                            >
                                <Input
                                    value={externalUrl}
                                    onChange={(e) =>
                                        setExternalUrl(e.target.value)
                                    }
                                    style={{
                                        backgroundColor: '#001529',
                                        color: 'white',
                                    }}
                                />
                                <div style={{ fontSize: 12 }}>
                                    <Text style={{ color: 'lightgray' }}>
                                        *Reminder: Badge metadata is not
                                        editable. Please use a URL that will not
                                        change.
                                    </Text>
                                </div>
                            </Form.Item>
                        </>
                    )}

                    {stepNum === 7 && (
                        <>
                            <div
                                style={{
                                    justifyContent: 'center',
                                    display: 'flex',
                                }}
                            >
                                <Typography.Text
                                    style={{
                                        color: 'white',
                                        fontSize: 20,
                                        marginBottom: 10,
                                    }}
                                    strong
                                >
                                    Set Expiration Date (Optional)
                                </Typography.Text>
                            </div>
                            <>
                                {/* <Form.Item
                                    label={
                                        <Text style={{ color: 'white' }} strong>
                                            Expires?
                                        </Text>
                                    }
                                >
                                    {
                                        <Switch
                                            defaultChecked={expirationDate}
                                            onChange={() => {
                                                if (expirationDate) {
                                                    hideExpirationDate();
                                                } else {
                                                    showExpirationDate();
                                                }
                                            }}
                                        />
                                    }
                                </Form.Item> */}

                                {
                                    <Form.Item
                                        label={
                                            <Text
                                                style={{ color: 'white' }}
                                                strong
                                            >
                                                Expiration Date
                                            </Text>
                                        }
                                    >
                                        <DatePicker
                                            style={{
                                                width: '100%',
                                                backgroundColor: '#001529',
                                                color: 'white',
                                            }}
                                            suffixIcon={
                                                <CalendarOutlined
                                                    style={{ color: 'white' }}
                                                />
                                            }
                                            onChange={(date, dateString) => {
                                                setExpirationDateValue(
                                                    new Date(
                                                        dateString
                                                    ).valueOf()
                                                );
                                            }}
                                        />
                                    </Form.Item>
                                }
                            </>
                        </>
                    )}

                    {stepNum === 8 && (
                        <>
                            <div
                                style={{
                                    justifyContent: 'center',
                                    display: 'flex',
                                }}
                            >
                                <Typography.Text
                                    style={{
                                        color: 'white',
                                        fontSize: 20,
                                        marginBottom: 10,
                                    }}
                                    strong
                                >
                                    Confirm Metadata and Continue
                                </Typography.Text>
                            </div>
                            <>
                                {/* <Form.Item
                                    label={
                                        <Text style={{ color: 'white' }} strong>
                                            Expires?
                                        </Text>
                                    }
                                >
                                    {
                                        <Switch
                                            defaultChecked={expirationDate}
                                            onChange={() => {
                                                if (expirationDate) {
                                                    hideExpirationDate();
                                                } else {
                                                    showExpirationDate();
                                                }
                                            }}
                                        />
                                    }
                                </Form.Item> */}
                                <div
                                    style={{
                                        justifyContent: 'center',
                                        display: 'flex',
                                    }}
                                >
                                    <Typography.Text
                                        style={{
                                            color: 'white',
                                            fontSize: 16,
                                            marginBottom: 10,
                                        }}
                                        strong
                                    >
                                        Badge metadata is permanent. Please take
                                        a moment to confirm all metadata is
                                        correct.
                                    </Typography.Text>
                                </div>
                                <div
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Button
                                        disabled={!title.length}
                                        type="primary"
                                        style={{ width: '90%' }}
                                        onClick={() => {
                                            setCurrStepNumber(2);
                                            setBadge(badgeData);
                                        }}
                                    >
                                        Confirm Data and Continue
                                    </Button>
                                </div>
                            </>
                        </>
                    )}

                    {badgeData && badgeData.name && stepNum !== 0 && (
                        <>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: 20,
                                }}
                            >
                                <Text style={{ color: 'white' }} strong>
                                    Badge Preview (Click to View More)
                                </Text>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        flexWrap: 'wrap',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Badge
                                        size={100}
                                        badge={{
                                            metadata: badgeData,
                                            supply,
                                            manager: `ETH:${address}`,
                                        }}
                                        hidePermissions
                                        conceptBadge={isConceptForm}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    {/* <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            disabled={
                                !title.length ||
                                (expirationDate && !expirationDateValue)
                            }
                            type="primary"
                            style={{ width: '48%' }}
                            onClick={() => {
                                setCurrStepNumber(2);
                                setBadge(badgeData);
                            }}
                        >
                            Confirm Data
                        </Button>
                        <Button
                            style={{ width: '48%' }}
                            onClick={async () => {
                                setCurrStepNumber(0);
                            }}
                        >
                            Go Back
                        </Button>
                    </div> */}
                </Form>
            </Form.Provider>
        </div>
    );
}
