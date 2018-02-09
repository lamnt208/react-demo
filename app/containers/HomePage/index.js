/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { firebaseService } from 'containers/App/firebase';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Pager, Button, Table, Glyphicon, ButtonToolbar, PageHeader, Row, Col } from 'react-bootstrap';
import FormModal from './FormModal';
import { loadListItem } from './actions';
import { makeSelectRepos, makeSelectLoading } from './selectors';
import json2csv from 'json2csv';
// import { writeFile } from 'fs-'

export class HomePage extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            locationValues: {},
            page: 1,
            size: 10,
            totalPage: 1,
            locationsList: [],
        };
    }

    componentWillMount() {
        this.props.onLoad();
    }

    componentWillReceiveProps(nextProps) {
        const { data } = nextProps;
        let totalPage = data.length / 10;
        totalPage = Math.floor(totalPage) === totalPage ? totalPage : Math.floor(totalPage) + 1;
        const page = 1;

        this.setState({
            page,
            totalPage,
            locationsList: this.onGetLocations(page, nextProps),
        });
    }

    onGetLocations(page, props) {
        const { data } = props;
        const min = (page - 1) * 10;
        const max = page * 10 > data.length ? data.length : page * 10;
        return data.slice(min, max);
    }

    next = () => {
        this.setState({
            page: this.state.page + 1,
            locationsList: this.onGetLocations(this.state.page + 1, this.props),
        });
    }

    prev = () => {
        this.setState({
            page: this.state.page - 1,
            locationsList: this.onGetLocations(this.state.page - 1, this.props),
        });
    }

    close = () => {
        this.setState({ showModal: false });
        this.props.onLoad();
    }

    open = () => {
        this.setState({ showModal: true });
    }

    export = () => {
        const { data } = this.props;
        const fieldNames = ['ID', 'Street Name', 'Ward', 'District', 'City', 'Country'];
        const fields = ['id', 'streetName', 'ward', 'district', 'city', 'country'];
        const csv = json2csv({ data, fields, fieldNames });
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += csv;
        window.open(encodeURI(csvContent));
    }

    removeLocations = (id) => () => {
        firebaseService.locations.remove(id);
        this.props.onLoad();
    }

    editLocations = (locationValues) => () => {
        this.setState({ showModal: true, locationValues });
    }

    renderTable() {
        const { loading } = this.props;
        const { locationsList: data, page, totalPage  } = this.state;
        if (loading) {
            return (
                <h4>Loading...</h4>
            );
        }
        return (
            <div>
                 <Table striped bordered condensed hover responsive>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Street Name</th>
                            <th>Ward</th>
                            <th>District</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 && data.map(each => (
                            <tr>
                                <td>{each.id}</td>
                                <td>{each.streetName}</td>
                                <td>{each.ward}</td>
                                <td>{each.district}</td>
                                <td>{each.city}</td>
                                <td>{each.country}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button bsStyle="danger" bsSize="small" onClick={this.removeLocations(each.id)}><Glyphicon glyph="glyphicon glyphicon-remove-circle" /> Remove</Button>
                                        <Button bsStyle="info" bsSize="small" onClick={this.editLocations(each)}><Glyphicon glyph="glyphicon glyphicon-edit" /> Edit</Button>
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <span>{page} / {totalPage} pages</span>
                <Pager>
                    <Pager.Item onClick={this.prev} disabled={page === 1}>Previous</Pager.Item>{' '}
                    <Pager.Item onClick={this.next} disabled={page === totalPage}>Next</Pager.Item>
                </Pager>;
            </div>
        );
    }

    render() {
      const { locationValues} = this.state;
      return (
          <div>
              <PageHeader>
                  8Bit Rockstars <small>Nguyen Tien Lam</small>
              </PageHeader>
              <h3>Locations</h3>
              <Row>
                  <Col md={12}>
                      <ButtonToolbar>
                          <Button bsStyle="primary" bsSize="small" className="btn-action" onClick={this.open}>
                              <Glyphicon glyph="glyphicon glyphicon-plus" /> Add New Location
                          </Button>
                          <Button bsSize="small" onClick={this.export}> 
                              <Glyphicon glyph="glyphicon glyphicon-download" /> Export CSV
                          </Button>
                      </ButtonToolbar>
                      <FormModal show={this.state.showModal} onClose={this.close} data={locationValues} />
                  </Col>
              </Row>
              <Row>
                  <Col md={12}>
                      {this.renderTable()}
                  </Col>
              </Row>
          </div>
      );
    }
}

HomePage.propTypes = {
    loading: React.PropTypes.bool,
    data: React.PropTypes.array,
    onLoad: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
    return {
        onLoad: () => dispatch(loadListItem()),
    };
}
const mapStateToProps = createStructuredSelector({
    data: makeSelectRepos(),
    loading: makeSelectLoading(),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
