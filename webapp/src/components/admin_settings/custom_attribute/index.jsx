import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getProfilesByIds} from 'mattermost-redux/actions/users';

import CustomAttribute from './custom_attribute.jsx';

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getProfilesByIds,
        }, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(CustomAttribute);
