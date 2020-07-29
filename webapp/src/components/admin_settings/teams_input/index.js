import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getTeams, searchTeams as reduxSearchTeams} from 'mattermost-redux/actions/teams';

import TeamsInput from './teams_input.jsx';

const searchTeams = (term, options = {}) => {
    if (!term) {
        return getTeams(0, 20, options);
    }
    return reduxSearchTeams(term, options);
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            searchTeams,
        }, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(TeamsInput);
