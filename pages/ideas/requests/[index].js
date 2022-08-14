import React, { Component } from 'react';
import Layout from '../../../components/Layout'
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Idea from '../../../ethereum/idea';
//import web3 from '../../../ethereum/web3';
import instance from '../../../ethereum/ideaFactoryInstance';
import RequestRow from '../../../components/RequestRow';


class RequestIndex extends Component {

    renderRows() {
        let requests = this.props.requests;
            requests = JSON.parse(requests);      // converting string back into object to be able to use mop()
        return requests.map((request, index) => {
            return (
                <RequestRow
                    id={index}
                    key={index}
                    request={request}
                    address={this.props.address}
                    contributersCount={this.props.contributersCount}
                 />
            );
        } );
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return(
            <Layout>
                <h3> Show Requests </h3>
                <Link route={`/ideas/${this.props.address}`}>
                    <a>Back</a>
                </Link>
                <Link route={`/ideas/requests/add/${this.props.address}`}>
                    <a>
                        <Button primary floated='right' style={{ marginBottom: 15 }}> Add Request </Button>
                    </a>
                </Link>
                <Table>
                    <Body>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Body>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div> Found {this.props.requestCount} requests. </div>
            </Layout>
        );
    }
}

export async function getStaticPaths() {
    const ideas = await instance.methods.getDeployedIdeas().call();

    const paths = ideas.map((addressId) => {
        return {
            params: {index: addressId},
        };
    });

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {

    const address  = params.index;
    const idea = Idea(address);
    const requestCount= await idea.methods.getRequestcount().call();
    const contributersCount = await idea.methods.contributersCount().call();

    let requests = await Promise.all(
        Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
            return idea.methods.requests(index).call();  // index will here iterate from 0 all the way upto requestCount
        })
    )

        requests = JSON.stringify(requests) ;   // had to JSON.stringify because requests returned were for more thn 1 address and it was not
                                                //able to serialize due to that..so converted into string ...will convert back into object just before using it in the map() in renderRows() above.

    return{ props: {
                address,
                requestCount,
                requests,
                contributersCount
            },
            revalidate: 2
        };
}

export default RequestIndex;