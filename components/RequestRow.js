import React , { Component } from 'react';
import { Table , Button, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Idea from '../ethereum/idea';

class RequestRow extends Component {


    onApprove = async () => {
        const idea = Idea(this.props.address);

        const accounts = await web3.eth.getAccounts();
        await idea.methods.approveRequest(this.props.id).send({from: accounts[0]});
    };

    onFinalize = async () => {
        const idea = Idea(this.props.address);

        const accounts = await web3.eth.getAccounts();
        await idea.methods.finalizeRequest(this.props.id).send({from: accounts[0]});
    };

    render () {
        const { Row, Cell } = Table;
        const { id, request, contributersCount } = this.props;
        const readyToFinalize = request.approvalCount > contributersCount / 2;

        return (
            <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{contributersCount}</Cell>
                <Cell >
                    <Button disabled={request.complete} color='green' onClick={this.onApprove}>
                        Approve
                    </Button>
                </Cell>
                <Cell>     
                    <Button disabled={request.complete || !readyToFinalize} color='teal'  onClick={this.onFinalize}>
                        Finalize
                    </Button>
                </Cell>
            </Row>
        );
    }
}

export default RequestRow;