import React, { Component } from 'react';
import { connect } from 'react-redux'
import { stop, edit, updateForm, save, start } from './actions'

class SettingPre extends Component {
	handleChange(key, event) {
		this.props.onFormValueChange(key, event.target.value);
	}
	render() {
		const buttonLabel = this.props.isEditing ? 'Save' : 'Edit';
		const buttonAction = this.props.isEditing ? this.props.onSave : this.props.onEdit;
		return (
			<div>
				<button onClick={buttonAction} > {buttonLabel} </button>
				<div>
					Work Time:
          <input type="number" readOnly={!this.props.isEditing} value={this.props.workTime} onChange={this.handleChange.bind(this, 'workTime')}/>
					min
				</div>
				<div>
					Break Time:
          <input type="number" readOnly={!this.props.isEditing} value={this.props.breakTime} onChange={this.handleChange.bind(this, 'breakTime')} onClick={this.props.onClick}/>
					min
				</div>
			</div>
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
	onFormValueChange: (key, value) => {
		dispatch(updateForm(key, value));
	}
});

const Setting = connect(mapStateToProps, mapDispatchToProps)(SettingPre);

export default Setting;
