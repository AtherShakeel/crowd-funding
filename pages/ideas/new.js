import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import ideaFactoryInstance from '../../ethereum/ideaFactoryInstance';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class IdeaNew extends Component {
    state = { ideaDescription: '' ,minimumContribution: '' , errorMessage: '' , loading: false };

    onSubmit = async (event) => {
        event.preventDefault();      // used preventDeault() to not let the form submit  by itself

        this.setState({ loading: true , errorMessage: '' });

        try {
            if (this.state.ideaDescription != '') {
                const accounts = await web3.eth.getAccounts();
                const toEth = web3.utils.toWei(this.state.minimumContribution, 'ether');
                await ideaFactoryInstance.methods.createIdea(this.state.ideaDescription, toEth)
                    .send({ from: accounts[0]});
                Router.pushRoute('/');
            }
            else 
                this.setState({ errorMessage: "Please provide the idea description" });          
        } catch(err) {
            this.setState({ errorMessage: err.message , ideaDescription: this.state.ideaDescription});
        }
        this.setState({ loading: false});

    };

    render() {
        return (
            <Layout>
                <h3>Create New Idea</h3>

                <Form onSubmit = {this.onSubmit} error={!! this.state.errorMessage} >
                    <Form.Field>
                        <label> What's your Idea ?? ( a short and crisp description for your idea  )</label>
                        <Input
                            value={this.state.ideaDescription}
                            onChange={ event=> this.setState( {ideaDescription: event.target.value} )}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label> Minimum Contribution </label>
                        <Input
                            label='ether'
                            labelPosition='right'
                            value={this.state.minimumContribution}
                            onChange={ event=> this.setState( {minimumContribution: event.target.value} )}
                        />
                    </Form.Field>
                    <Message error header='Oops !' content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary> Create! </Button>
                </Form>
            </Layout>
        )
    }
}

export default IdeaNew;