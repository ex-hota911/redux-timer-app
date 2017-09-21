import React, { Component } from 'react';
import { connect } from 'react-redux'
import { stop, edit, updateForm, save, start, cancel } from './actions'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const style = {
  margin: 12,
	padding: '0 12px',
};

class SettingPre extends Component {
	handleChange(key, event) {
		this.props.onFormValueChange(key, event.target.value);
	}

	handleClose() {

	}

	render() {
		const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.props.onSave}
      />,
      <FlatButton
        label="Cancel"
        onClick={this.props.onCancel}
      />,
		]
		return (
			<span>
				<RaisedButton onClick={this.props.onEdit} style={style}> Edit Settings </RaisedButton>
				<Dialog
					title="Configure work/break time"
					actions={actions}
					open={this.props.isEditing}>
	        <TextField
							type="number"
							style={{marginRight: 12}}
							value={this.props.workTime}
							onChange={this.handleChange.bind(this, 'workTime')}
							floatingLabelText="Work time (min)"
					/>
	        <TextField
							type="number"
							value={this.props.breakTime}
							onChange={this.handleChange.bind(this, 'breakTime')}
							floatingLabelText="Break time (min)"
					/>
				</Dialog>
			</span>
		);
	}
}

const mapStateToProps = (state) => ({
	isEditing: state.setting.isEditing,
	workTime: state.form.workTime,
	breakTime: state.form.breakTime,
});

const mapDispatchToProps = (dispatch) => ({
	onEdit: () => {
		dispatch(stop());
		dispatch(edit());
	},
	onSave: () => {
		dispatch(save());
		dispatch(start());
	},
	onCancel: () => {
		dispatch(cancel());
	},
	onFormValueChange: (key, value) => {
		dispatch(updateForm(key, value));
	}
});

const Setting = connect(mapStateToProps, mapDispatchToProps)(SettingPre);

export default Setting;
