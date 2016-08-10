import React, { Component, PropTypes } from 'react';
import FormList from 'form-builder/components/FormList';
import CreateFormModal from 'form-builder/components/CreateFormModal';
import Error from 'common/Error';
import FormBuilderHeader from './FormBuilderHeader';



export default class FormBuilder extends Component {

  constructor() {
    super();
    this.state = { showModal: false };
    this.setState = this.setState.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({ error: props.error });
  }

  openFormModal() {
    this.setState({ showModal: true });
  }

  closeFormModal() {
    this.setState({ showModal: false });
  }

  createForm(formName) {
    const form = {
      name: formName,
      version: '1.0',
      published: false,
    };

    this.props.saveForm(form);
  }

  closeErrorMessage() {
    this.setState({ error: undefined });
  }

  render() {
    return (
      <div>
        <Error closeErrorMessage={() => this.closeErrorMessage()} error={this.state.error} />
        <FormBuilderHeader />
        <div className="breadcrumb-wrap">
          <div className="breadcrumb">
            <div class="fl">
              <ul>
                <li>My Forms</li>
              </ul>
            </div>
            <button onClick={() => this.openFormModal()} className="btn--highlight fr" accesskey="n">Create a Form</button>
          </div>
        </div>
          <CreateFormModal
            closeModal={() => this.closeFormModal()}
            createForm={(formName) => this.createForm(formName)}
            showModal={this.state.showModal}
          />
      <div className="container-content-wrap">
          <div className="container-content">
             <FormList data={this.props.data} />
          </div>
      </div>
      </div>
    );
  }
}

FormBuilder.propTypes = {
  data: PropTypes.array.isRequired,
  error: PropTypes.object,
  saveForm: PropTypes.func.isRequired,
};
