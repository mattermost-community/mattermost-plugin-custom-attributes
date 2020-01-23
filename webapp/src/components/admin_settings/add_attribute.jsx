// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import PropTypes from 'prop-types';

import CustomAttribute from './custom_attribute'


export default class AddAttribute extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        users: PropTypes.array,
        groups: PropTypes.array,
        onChange: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
            name: this.props.name,
            users: this.props.users,
            groups: this.props.groups,
            error: false,
        };
    }

    handleCancel = () => {
        this.setState({
            collapsed: true,
            name: null,
            users: null,
            groups: null,
            error: false
        })
    }

    onInput = ({id, name, users, groups}) => {
        this.setState({name, users, groups, error:false});
    }

    handleSave = (e) => {
        const usersEmpty = !this.state.users || this.state.users.trim() == "";
        const groupsEmpty = !this.state.groups || this.state.groups.trim() == "";

        if ( !this.state.name || this.state.name.trim() == "" || (usersEmpty && groupsEmpty)){
            this.setState({error:true})
            return
        }
        
        this.props.onChange({id: this.props.id, name:this.state.name, users:this.state.users, groups:this.state.groups});
        this.setState({
            collapsed: true,
            name: null,
            users: null,
            groups: null,
        })
    }

    render() {
        if (this.state.collapsed) {
            return (
                <div style={{paddingTop:'10px'}}>
                    <a
                        style={styles.addLink}
                        onClick={() => {
                            this.setState({collapsed: false});
                        }}
                    >{'+ Add Custom Attribute'}</a>
                </div>
            );
        }

        let errorBanner = null
        if (this.state.error) {
            errorBanner = ( 
                <div style={styles.alertDiv}>
                   <p style={styles.alertText}> {'You must provide a value for name and users or group.'}
                   </p>
                </div>
            )
        }

        return (
            <div>
                <CustomAttribute 
                    name={this.props.name} 
                    users={this.props.users}
                    groups={this.props.groups}
                    onChange={this.onInput}
                    hideDelete={true}
                    markdownPreview={false} /> 

                <div class="row" style={{padding:'0px'}}>
                    <div style={styles.buttonBorder}
                        className='col-xs-12 col-sm-2'>
                        <a
                            style={styles.button}
                            onClick={this.handleSave}
                        >
                            {'Add Attribute'}
                        </a>
                    </div>
                    <div className='col-xs-12 col-sm-2'> 
                        <a
                            style={styles.button}
                            onClick={this.handleCancel}
                        >
                            {'Cancel'}
                        </a>
                    </div>
                </div>
                {errorBanner}
            </div>

        );
    }
}

const styles = {
    addLink: {
        color: '#145DBF',
        fontSize: '14px',
        fontFamily: 'Open Sans',
        fontWeight: '600',
        lineHeight: '18px'
    },
    button: {
        height: '19px',
        width: '92px',	
        color: '#0A5AC2',	
        fontFamily: 'Open Sans',
        fontSize: '14px',
        fontWeight: '600',
        lineHeight: '20px'
    },
    buttonBorder: {	
        boxSizing: 'border-box',
        border: '1px solid #0A5AC2',	
        borderRadius: '4px',
        height: '36px',
        width: '118px'
    },
}