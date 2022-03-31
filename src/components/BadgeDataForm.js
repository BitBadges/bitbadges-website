import { Badge } from './Badge';
import { RecipientFormItem } from './RecipientFormItem';
const { PlusOutlined } = require('@ant-design/icons');
const {
    Typography,
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    InputNumber,
    Switch,
    Avatar,
    Space,
    Divider,
} = require('antd');
const isuri = require('isuri');

const React = require('react');
const { useEffect, useState } = require('react');
const { MAX_DATE_TIMESTAMP } = require('../constants');

const { Text } = Typography;
const { useSelector } = require('react-redux');
const { Option } = Select;
export function BadgeDataForm({ setCurrStepNumber, setBadge, setRecipients }) {
    const address = useSelector((state) => state.user.address);

    let savedBadgeDataStr = window.localStorage.getItem('savedBadgeData');
    if (!savedBadgeDataStr) {
        window.localStorage.setItem('savedBadgeData', '{}');
        savedBadgeDataStr = '{}';
    }

    const savedBadgeData = JSON.parse(savedBadgeDataStr);

    const [recipients, setRecipientsArr] = useState(
        savedBadgeData.recipients ? savedBadgeData.recipients : []
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
    const [expirationDate, setExpirationDate] = useState(
        savedBadgeData.expirationDate
            ? savedBadgeData.expirationDate
            : undefined
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
            validFrom:
                expirationDate && expirationDateValue
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
        setSupply(count);
        window.localStorage.setItem(
            'savedBadgeData',
            JSON.stringify({
                recipients,
                title,
                description,
                imageUrl,
                backgroundColor,
                expirationDate,
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

    const showExpirationDate = () => {
        setExpirationDate(true);
    };

    const hideExpirationDate = () => {
        setExpirationDate(false);
    };

    useEffect(() => {
        updateBadgeData();
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

    return (
        <div>
            <Form.Provider>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                >
                    <Form.Item label={<Text strong>Title</Text>} required>
                        <Input
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                    </Form.Item>
                    <RecipientFormItem
                        recipients={recipients}
                        setRecipients={setRecipientsArr}
                    />
                    <Form.Item label={<Text strong>Description</Text>}>
                        <Input.TextArea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Item>

                    {/* <Form.Item label={<Text strong>Badge Type</Text>}>
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

                    <Form.Item
                        label={<Text strong>Category</Text>}
                        required={type == 0}
                    >
                        <Select
                            value={category}
                            placeholder="Default: Other"
                            onChange={(e) => setCategory(e)}
                            dropdownRender={(menu) => (
                                <>
                                    {menu}
                                    <Divider style={{ margin: '8px 0' }} />
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
                                            style={{ whiteSpace: 'nowrap' }}
                                        >
                                            <PlusOutlined /> Add Category
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

                    <Form.Item
                        label={<Text strong>Image URI</Text>}
                        required={type == 0}
                    >
                        {/* <Input
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        /> */}
                        <Select
                            value={imageUrl}
                            // placeholder="Default: Other"
                            onChange={(e) => setImageUrl(e)}
                            dropdownRender={(menu) => (
                                <>
                                    {menu}
                                    <Divider style={{ margin: '8px 0' }} />
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
                                            disabled={!isuri.isValid(newImage)}
                                            onClick={addImage}
                                            style={{ whiteSpace: 'nowrap' }}
                                        >
                                            <PlusOutlined /> Add Image
                                        </Typography.Link>
                                    </Space>
                                </>
                            )}
                        >
                            {images.map((item) => (
                                <Option key={item.value} value={item.value}>
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
                                        />
                                        <div>{item.label}</div>
                                    </div>
                                </Option>
                            ))}
                        </Select>
                        <br />
                        <div style={{ fontSize: 10 }}>
                            <Text>
                                *Please use a permanent file storage solution
                                like IPFS, or else, you risk your image failing
                                if the URL goes down or changes.
                            </Text>
                        </div>
                    </Form.Item>

                    <Form.Item label={<Text strong>Color</Text>}>
                        <Select
                            defaultValue={backgroundColor}
                            onSelect={(e) => setBackgroundColor(e)}
                        >
                            <Select.Option value="black">
                                <span style={{ color: 'black' }}>⬤</span> Black
                            </Select.Option>
                            <Select.Option value="red">
                                <span style={{ color: 'red' }}>⬤</span> Red
                            </Select.Option>
                            <Select.Option value="blue">
                                <span style={{ color: 'blue' }}>⬤</span> Blue
                            </Select.Option>
                            <Select.Option value="green">
                                <span style={{ color: 'green' }}>⬤</span> Green
                            </Select.Option>
                            <Select.Option value="orange">
                                <span style={{ color: 'orange' }}>⬤</span>{' '}
                                Orange
                            </Select.Option>
                            <Select.Option value="yellow">
                                <span style={{ color: 'yellow' }}>⬤</span>{' '}
                                Yellow
                            </Select.Option>
                            <Select.Option value="purple">
                                <span style={{ color: 'purple' }}>⬤</span>{' '}
                                Purple
                            </Select.Option>
                            <Select.Option value="pink">
                                <span style={{ color: 'pink' }}>⬤</span> Pink
                            </Select.Option>
                            <Select.Option value="brown">
                                <span style={{ color: 'brown' }}>⬤</span> Brown
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label={<Text strong>External URL</Text>}>
                        <Input
                            value={externalUrl}
                            onChange={(e) => setExternalUrl(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item label={<Text strong>Expires?</Text>}>
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
                    </Form.Item>

                    {expirationDate && (
                        <Form.Item label={<Text strong>Expiration Date</Text>}>
                            <DatePicker
                                style={{ width: '100%' }}
                                onChange={(date, dateString) => {
                                    setExpirationDateValue(
                                        new Date(dateString).valueOf()
                                    );
                                }}
                            />
                        </Form.Item>
                    )}

                    {badgeData && badgeData.name && (
                        <Form.Item label={<Text strong>Badge Preview</Text>}>
                            <Badge
                                size={60}
                                badge={{
                                    metadata: badgeData,
                                    supply,
                                    manager: `ETH:${address}`,
                                }}
                                hidePermissions
                            />
                        </Form.Item>
                    )}

                    <Button
                        disabled={
                            !title.length ||
                            (expirationDate && !expirationDateValue)
                        }
                        type="primary"
                        style={{ width: '50%' }}
                        onClick={() => {
                            setCurrStepNumber(2);
                            setBadge(badgeData);
                        }}
                    >
                        Confirm Data
                    </Button>
                    <Button
                        style={{ width: '50%' }}
                        onClick={async () => {
                            setCurrStepNumber(0);
                        }}
                    >
                        Go Back
                    </Button>

                    <Button
                        size="small"
                        style={{ width: '100%', marginTop: 10 }}
                        onClick={() => {
                            setRecipientsArr([]);
                            setTitle('');
                            setDescription('');
                            setImageUrl(
                                'https://bitbadges.web.app/img/icons/logo.png'
                            );
                            setBackgroundColor('black');
                            setExpirationDate(false);
                            setExpirationDateValue(undefined);
                            setType(0);
                            setCategory('BitBadge');
                            setExternalUrl(undefined);
                            setSupply(0);
                        }}
                    >
                        Reset to Defaults
                    </Button>
                </Form>
            </Form.Provider>
        </div>
    );
}
