import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCustomEmojisInText} from 'mattermost-redux/actions/emojis';

import {getProfilesByIds} from 'mattermost-redux/actions/users';
import {getTeam} from 'mattermost-redux/actions/teams';

import CustomAttribute from './custom_attribute.jsx';

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getProfilesByIds,
            getTeam,
            getCustomEmojisInText,
        }, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(CustomAttribute);
