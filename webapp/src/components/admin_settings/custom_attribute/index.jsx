import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCustomEmojisInText} from 'mattermost-redux/actions/emojis'

import {getProfilesByIds} from 'mattermost-redux/actions/users';

import CustomAttribute from './custom_attribute.jsx';

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getProfilesByIds,
            getCustomEmojisInText,
        }, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(CustomAttribute);
