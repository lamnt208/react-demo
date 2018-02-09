
import React from 'react';
import classNames from 'classnames';
import { Modal, Button, Col, Row, HelpBlock } from 'react-bootstrap';
import { firebaseService } from 'containers/App/firebase';
import mapsApi from 'google-maps-api';
import { GOOGLE_MAP_API_KEY } from './constants';
import googleService from './services';
import styles from './styles.css';

class FormModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            submitting: false,
            values: {},
            center: { lat: 10.7782718, lng: 106.6998434 },
            map: null,
            maps: null,
            edit: false,
            inprogress: false,
            validation: {
                streetName: { error: '' },
                ward: { error: '' },
                district: { error: '' },
            },
        };
    }

    componentDidMount() {
        // Workaround uncancellable promise and depricated isMounted in react
        this.mounted = true;
    }

    componentWillReceiveProps(nextProps) {
        const { data } = nextProps;
        if (data && data !== this.props.data) {
            this.setState({
                edit: true,
                values: data,
                center: data.position,
            }, () => {
                this.initMap();
            });
        } else {
            this.setState({
                values: {},
                edit: false,
            });
            this.initMap();
        }
    }

    onGenerateAddress(values, callback) {
        let address = '';
        if (values.streetName) {
            address += values.streetName;
        }
        if (address && values.ward) {
            address += `${values.ward}, `;
        }

        if (address && values.district) {
            address += `${values.district}, `;
        }

        if (address && values.city) {
            address += `${values.city}, `;
        }

        if (address && values.country) {
            address += `${values.country}`;
        }

        googleService.getByAddress(address)
            .then(response => response.json())
            .then(data => {
                const item = {
                    ...values,
                };
                const address = data.results[0];
                if (address.geometry) {
                    item.position = {
                        lat: address.geometry.location.lat,
                        lng: address.geometry.location.lng,
                    };
                }
                item.formatted_address = address.formatted_address;
                this.setState({
                    center: item.position,
                    values: item,
                }, () => {
                    this.initMap();
                    callback(item);
                });
            });

    }

    onChangeData = (type) => {
        return (event) => {
            const { values } = this.state;
            values[type] = event.target.value;

            this.setState({
                values,
            });
            this.validation(values);
        };
    }

    onClickMap = (position, marker, maps) => {
        marker.setPosition(position);

        const geocoder = new maps.Geocoder();
        geocoder.geocode({ latLng: position }, (results, status) => {
            if (status === maps.GeocoderStatus.OK) {
                const values = {
                    ...this.state.values,
                    streetName: '',
                    ward: '',
                    district: '',
                    city: '',
                    country: '',
                };
                const address = results[0];
                values.position = {
                    lat: address.geometry.location.lat(),
                    lng: address.geometry.location.lng(),
                };
                values.formatted_address = address.formatted_address;
                address.address_components.forEach(each => {
                    console.log(each);
                    if (each.types[0] === 'street_address' || each.types[0] === 'street_number') {
                        values.streetName = each.long_name;
                    } else if (each.types[0] === 'route') {
                        values.streetName = values.streetName ? `${values.streetName} ${each.long_name}` : each.long_name;
                    } else if (each.types[0] === 'administrative_area_level_3') {
                        values.ward = each.long_name;
                    } else if (each.types[0] === 'administrative_area_level_2') {
                        values.district = each.long_name;
                    } else if (each.types[0] === 'administrative_area_level_1') {
                        values.city = each.long_name;
                    } else if (each.types[0] === 'country') {
                        values.country = each.long_name;
                    }
                });
                this.setState({
                    center: position,
                    values,
                });
            }
        });
    }

    close = () => {
        const { onClose } = this.props;
        if (onClose) {
            onClose();
        }
    }

    submit = () => {
        const data = this.state.values;
        this.validation(data, () => {
            if (!this.state.edit) {
                data.id = (new Date()).getTime();
                this.onGenerateAddress(data, (item) => {
                    console.log(item);
                    firebaseService.locations.create(item);
                    this.close();
                });
            } else {
                firebaseService.locations.update(data);
                this.close();
            }
        });
    }

    initMap = () => {
        mapsApi(GOOGLE_MAP_API_KEY)().then(maps => {
            const element = document.getElementById('map');
            if (element) {
                const { center } = this.state;
                const map = new maps.Map(element, {
                    center,
                    zoom: 14,
                });

                const marker = new maps.Marker({
                    center,
                    map,
                });

                map.addListener('click', (e) => {
                    const p = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                    this.onClickMap(p, marker, maps);
                });
            }
        });
    }

    validation = (values, submitFunc) => {
        let validation = {
            streetName: { error: '' },
            ward: { error: '' },
            district: { error: '' },
        };
        let totalInvalid = 0;

        if (!values.streetName || values.streetName.trim() === '') {
            validation = {
                ...validation,
                streetName: { error: 'Required' },
            };
            totalInvalid++;
        }

        if (!values.city || values.city.trim() === '') {
            validation = {
                ...validation,
                ward: { error: 'Required' },
                district: { error: 'Required' },
            };
            totalInvalid++;
        } else {
            validation = {
                ...validation,
                ward: { error: '' },
                district: { error: '' },
            };
        }
        console.log(totalInvalid);
        this.setState({
            validation,
        });

        if (totalInvalid === 0 && submitFunc) {
            submitFunc();
        }
    }

    render() {
        const { show } = this.props;

        const { values, edit, validation } = this.state;
        return (
            <Modal show={show} onHide={this.close} dialogClassName="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>{!edit ? 'Add New Location' : 'Edit Location'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-horizontal">
                        <Row>
                            <Col md={6}>
                                <Row className={classNames('form-group', validation.streetName.error ? 'has-error' : '')}>
                                    <Col componentClass="label" md={4} className="control-label">
                                        Street Name <span className="required" aria-required="true"> * </span>
                                    </Col>
                                    <Col md={8}>
                                        <input type="text" name="streetName" className="form-control" placeholder="1 Le Duan" value={values.streetName} onChange={this.onChangeData('streetName')} />
                                        <HelpBlock className="text-danger">{validation.streetName.error}</HelpBlock>
                                    </Col>
                                </Row>
                                <Row className={classNames('form-group', validation.ward.error ? 'has-error' : '')}>
                                    <Col componentClass="label" md={4} className="control-label">
                                        Ward <span className="required" aria-required="true"> * </span>
                                    </Col>
                                    <Col md={8}>
                                        <input type="text" name="ward" className="form-control" placeholder="Da Kao" value={values.ward} onChange={this.onChangeData('ward')} />
                                        <HelpBlock className="text-danger">{validation.ward.error}</HelpBlock>
                                    </Col>
                                </Row>
                                <Row className={classNames('form-group', validation.district.error ? 'has-error' : '')}>
                                    <Col componentClass="label" md={4} className="control-label">
                                        District <span className="required" aria-required="true"> * </span>
                                    </Col>
                                    <Col md={8}>
                                        <input type="text" name="district" className="form-control" placeholder="District 1" value={values.district} onChange={this.onChangeData('district')} />
                                        <HelpBlock className="text-danger">{validation.district.error}</HelpBlock>
                                    </Col>
                                </Row>
                                <Row className={classNames('form-group')}>
                                    <Col componentClass="label" md={4} className="control-label">
                                        City
                                    </Col>
                                    <Col md={8}>
                                        <input type="text" name="city" className="form-control" placeholder="Ho Chi Minh" value={values.city} onChange={this.onChangeData('city')} />
                                    </Col>
                                </Row>
                                <Row className={classNames('form-group')}>
                                    <Col componentClass="label" md={4} className="control-label">
                                        Country
                                    </Col>
                                    <Col md={8}>
                                        <input type="text" name="country" className="form-control" placeholder="Viet Nam" value={values.country} onChange={this.onChangeData('country')} />
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={6}>
                                <div id="map" className="map"></div>
                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                    <Button className="btn btn-primary" onClick={this.submit}>Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

FormModal.propTypes = {
    show: React.PropTypes.bool,
    onClose: React.PropTypes.func,
    data: React.PropTypes.object,
};

export default FormModal;
