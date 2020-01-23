import React from 'react';
import PropTypes from 'prop-types';

const {formatText, messageHtmlToComponent} = window.PostUtils;

export default class CustomAttribute extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        name: PropTypes.string,
        users: PropTypes.array,
        groups: PropTypes.array,
        hideDelete: PropTypes.boolean,
        markdownPreview: PropTypes.boolean,
        onDelete: PropTypes.func,
        onChange: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            users: this.props.users,
            groups: this.props.groups,
            error: null,
        };
    }

    handleNameInput = (e) => {
        if (!e.target.value || e.target.value.trim() == ""){
            this.setState({error: 'Attribute name cannot be empty.'})
        }
        else if (this.state.users || this.state.groups) {
            this.setState({error: null})
        }

        this.setState({name:e.target.value});
        this.props.onChange({id: this.props.id, name:e.target.value, users:this.state.users, groups:this.state.groups})
    }

    handleUsersInput = (e) => {
        const usersEmpty = !e.target.value || e.target.value.trim() == "";
        const groupsEmpty = !this.state.groups || this.state.groups.trim() == "";

        if (usersEmpty && groupsEmpty){
            this.setState({error: 'Attribute must include at least one user or group.'})
        }
        else if (this.state.name) {
            this.setState({error: null})
        }
        
        this.setState({users:e.target.value});
        this.props.onChange({id: this.props.id, name:this.state.name, users:e.target.value, groups: this.state.groups})
    }

    handleGroupsInput = (e) => {
        const usersEmpty = !e.target.value || e.target.value.trim() == "";
        const groupsEmpty = !this.state.groups || this.state.groups.trim() == "";

        if (usersEmpty && groupsEmpty){
            this.setState({error: 'Attribute must include at least one user or group.'})
        }
        else if (this.state.name) {
            this.setState({error: null})
        }
        
        this.setState({groups:e.target.value});
        this.props.onChange({id: this.props.id, name:this.state.name, users:this.state.users, groups:e.target.value})
    }

    handleDelete = () => {
        this.props.onDelete(this.props.id)
    }

    getMarkdownPreview = () => {
        if (!this.props.markdownPreview){
            return null
        }

        const formattedText = formatText(this.state.name);
        return messageHtmlToComponent(formattedText)
    }

    render () {
        let deleteButton = null;
        if (!this.props.hideDelete) {
            deleteButton = (
                <div className='col-xs-12 col-sm-1' style={{paddingLeft:'5px'}}>
                    <a
                        style={styles.deleteIcon}
                        onClick={this.handleDelete}
                    >
                        {'\u2296'}
                    </a>
                </div>
                );
        }

        let errorLabel = null;
        if (this.state.error){
            errorLabel = this.state.error
        }

        return (
            <React.Fragment>
                {this.getMarkdown()}
                <div className='row' style={{padding:'10px 0px'}}>
                    <div className='col-xs-12 col-sm-5' style={{padding:'0px'}}>
                        <input
                            id={`name-${this.props.id}`}
                            className='form-control'
                            type='text'
                            placeholder='Name markdown'
                            value={this.state.name}
                            onChange={this.handleNameInput}
                        />
                    </div>
                    <div className='col-xs-12 col-sm-4'>
                        <input
                            id={`users-${this.props.id}`}
                            className='form-control'
                            type='text'
                            placeholder='User1 User2'
                            value={this.state.users}
                            onChange={this.handleUsersInput}
                        />
                    </div>
                    <div className='col-xs-12 col-sm-2'>
                        <input
                            id={`groups-${this.props.id}`}
                            className='form-control'
                            type='text'
                            placeholder='Group1 Group2'
                            value={this.state.groups}
                            onChange={this.handleGroupsInput}
                        />
                    </div>                  
                    {deleteButton}
                    
                </div>
                {errorLabel}
            </React.Fragment>);
    }
}

const styles = {
    deleteIcon: {
        height: '20px',
        width: '24px',	
        color: '#DB1C34',	
        fontFamily: 'material',
        fontSize: '20px',
        lineHeight: '20px',
        paddingLeft: '5px'
    }
}