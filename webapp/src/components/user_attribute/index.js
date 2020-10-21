import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {id as pluginId} from '../../manifest';
import {getAttributes} from '../../actions';

import UserAttribute from './user_attribute.jsx';

const REDUCER = `plugins-${pluginId}`;

function mapStateToProps(state, ownProps) {
    const id = ownProps.user ? ownProps.user.id : '';
    const data = state[REDUCER].attributes[id];
    const fromWebhook = ownProps.overwriteName && ownProps.overwriteIcon;
    let attributes;
    if (data) {
        attributes = data.attributes;
    }

    return {
        id,
        attributes,
        fromWebhook,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getAttributes,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAttribute);
