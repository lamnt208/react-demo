import React from 'react';
import ListItem from 'components/ListItem';

export default class ListDetailPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      item: undefined,
    };
  }
  componentWillMount() {
    const requestURL = 'https://studio.brand-display.com/gallery/widgets?limit=50&status=approved&page=1';
    const me = this;
    fetch(requestURL)
      .then((response) => response.json()).then(function getJson(json) {
        if (json.length > 0) {
          const currentData = json.find((item) => (
            item._id === this.props.params.itemid
          ));
          this.setState({
            item: currentData,
          });
        }
      }.bind(me));
  }
  render() {
    const id = this.state.item ? this.state.item._id : 0;
    return (
      <div>
        <ListItem key={id} item={this.state.item} />
      </div>
    );
  }
}
