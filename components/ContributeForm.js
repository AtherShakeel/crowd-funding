import React , { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Idea from '../ethereum/idea';
import { Router } from '../routes';

class ContributeForm extends Component {
    state = {contributedAmt: '', loading: false, errorMessage: ''}

    onSubmit = async(event) => {
        event.preventDefault();    // used preventDeault() to not let the form submit by itself

        const idea = Idea(this.props.address);

        this.setState({loading: true, errorMessage: ''});

        try{
            const accounts = await web3.eth.getAccounts();
            await idea.methods.contribute().send ({
                    from: accounts[0],
                    value: web3.utils.toWei(this.state.contributedAmt, 'ether')
            });
            Router.replaceRoute(`/ideas/${this.props.address}`);
        } catch(err)  {
            this.setState({errorMessage: err.message});
        }
        this.setState({loading: false, contributedAmt: ''});
    };

    render () {
        return (

            <Form onSubmit= {this.onSubmit} error={!! this.state.errorMessage}>
                <Form.Field>
                    <label> Amount to Contribute </label>
                    <Input
                        label = 'ether'
                        labelPosition = 'right'
                        value = {this.state.contributedAmt}
                        onChange = {event => this.setState( {contributedAmt: event.target.value} )}
                        />

                </Form.Field>
                <Message error header='Oops' content={this.state.errorMessage} />
                <Button loading={this.state.loading} primary> Contribute  </Button>
            </Form>

        );

    }

}

export default ContributeForm;