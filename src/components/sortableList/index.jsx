import React from 'react';
import PropTypes from 'prop-types';
import { observer, propTypes as MobxPropTypes } from 'mobx-react';
import Sortable from 'sortablejs';
import assign from 'lodash/assign';
import omit from 'lodash/omit';

@observer
class SortableContainer extends React.Component {

  static propTypes = {
    renderItem: PropTypes.func.isRequired,
    list: MobxPropTypes.arrayOrObservableArray.isRequired, // mobx array
    onEnd: PropTypes.func,
    sortableOptions: PropTypes.object, // see https://github.com/RubaXa/Sortable
  }

  componentDidMount() {
    const options = assign({}, { onEnd: this.props.onEnd }, this.props.sortableOptions);
    this.sortContainer = Sortable.create(this.container, options);
  }

  componentWillUnmount() {
    this.sortContainer.destroy();
  }

  render() {
    const { renderItem } = this.props;
    return (
      <div
        {...omit(this.props, ['renderItem', 'list', 'onEnd', 'sortableOptions'])}
        ref={(div) => { this.container = div; }}
      >
        {
          this.props.list.map((item, index) => {
            return renderItem(item, index);
          })
        }
      </div>
    );
  }
}
export default SortableContainer;
