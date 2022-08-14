import React, { Component} from 'react';
import web3 from '../../ethereum/web3';
import instance from '../../ethereum/ideaFactoryInstance';
import Layout from '../../components/Layout';
import ContributeForm from '../../components/ContributeForm';
import Idea from '../../ethereum/idea';
import { Card, Grid, Button } from 'semantic-ui-react';
import { Link } from '../../routes';


class viewIdea extends Component {

    renderCards() {
        const { manager, balance, ideaDescription, minimumContribution, requestsCount, contributorsCount } = this.props;


        const items = [
            {
                header: ideaDescription,
                description:'Idea Statement',
                color:'red'
            },
            {
                header: manager,
                meta: 'Address of Manager',
                description:'Manager created this Idea and only Manager can create the payment requests',
                style: { overflowWrap: 'break-word'},
                color:'green'
            },
            {
                header: web3.utils.fromWei( minimumContribution, 'ether'),
                meta: 'Minimum Contribution ( ether )',
                description:'Minimum wei required to contribute into the idea',
                color:'yellow'
            },
            {
                header: requestsCount,
                meta: 'Number of payment requests',
                description:'A payment request tries to withdraw money from the contract. A payment request must be approved by approvers',
                color:'violet'
            },
            {
                header: contributorsCount,
                meta: 'Contributors',
                description:'Number of people who have contributed to this idea',
                color:'teal'
            },
            {
                header: web3.utils.fromWei( balance, 'ether'),
                meta: 'Idea Balance ( ether )',
                description:'The balance is how much money this idea has left to spend',
                color:'blue'
            }
        ];
        return <Card.Group items={items} />;

    }

    render() {
        return (
            <Layout>
                <h3> Idea Details </h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width = {10}>
                            {this.renderCards()}
                        </Grid.Column>

                        <Grid.Column width = {5}>
                            <ContributeForm  address={this.props.address}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                             <Link route={`/ideas/requests/${this.props.address}`}>
                                <a>
                                    <Button primary> View Requests </Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Layout>
        )
    }
}

export async function getStaticPaths() {
    const ideas = await instance.methods.getDeployedIdeas().call();

    const paths = ideas.map((addressId) => {
        return {
            params: {viewIdea: addressId},
        };
    });

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const fetchIdea  = params.viewIdea;
    const idea = Idea(fetchIdea);
    const summary = await idea.methods.getSummary().call();

    return {
        props: {
         address:             fetchIdea,
         minimumContribution: summary[0],
         balance:             summary[1],
         requestsCount:       summary[2],
         contributorsCount:   summary[3],
         manager:             summary[4],
         ideaDescription:     summary[5]
        },
        revalidate: 2
    };
}


export default viewIdea;