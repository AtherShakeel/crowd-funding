import React, { Component } from 'react';
import Layout from '../../../../components/Layout';
import Idea from '../../../../ethereum/idea';
import instance from '../../../../ethereum/ideaFactoryInstance';
import web3 from '../../../../ethereum/web3';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { Link, Router } from '../../../../routes';


class AddRequest extends Component {
    state = { description: '', value: '', recipient: '', loading: false, errorMessage: '' };


    onSubmit = async(event) => {
        event.preventDefault();  // used preventDeault() to not let the form submit  by itself

        const idea = Idea(this.props.address);
        const { description, value, recipient } = this.state;

        this.setState({loading: true, errorMessage: ''});

        try{
            if (this.state.description != '') {
                const accounts = await web3.eth.getAccounts();
                await idea.methods.createRequest( description, web3.utils.toWei(value, 'ether'),  recipient )
                .send({ from: accounts[0]});
                Router.pushRoute(`/ideas/requests/${this.props.address}`);
            }
            else 
                this.setState({ errorMessage: "Please provide the payment description" });

        } catch(err) {
            this.setState({errorMessage: err.message});
        }

        this.setState({ loading: false, description: '', value: '', recipient: '' });
    };


    render() {
        return(
            <Layout>
                <Link route={`/ideas/requests/${this.props.address}`}>
                    <a>Back</a>
                </Link>
                <h2> Create payment request </h2>
                <Form onSubmit={this.onSubmit} error={!! this.state.errorMessage}>
                    <Form.Field>
                        <label> Description </label>
                        <Input
                            value={this.state.description}
                            onChange={ event => this.setState({ description: event.target.value }) }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label> Amount in Ether </label>
                        <Input
                            value={this.state.value}
                            onChange={ event => this.setState({ value: event.target.value }) }
                        />
                    </Form.Field>
                    <Form.Field>
                        <label> Recipient Address </label>
                        <Input
                            value={this.state.recipient}
                            onChange={ event => this.setState({ recipient: event.target.value}) }
                        />
                    </Form.Field>
                    <Message error header='Oops!' content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}> Create </Button>
                </Form>
                <h5> ** Only the manager can create a payment request </h5>
            </Layout>
        );
    }

}

export async function getStaticPaths() {
    const ideas = await instance.methods.getDeployedIdeas().call();

    const paths = ideas.map((addressId) => {
        return {
            params: {add: addressId},
        };
    });

    return {
        paths,
        fallback: false
    }
}

export async function  getStaticProps({params}) {
    const address  = params.add;

    return {
        props: { address },
        revalidate: 2
    }
}


export default AddRequest;

