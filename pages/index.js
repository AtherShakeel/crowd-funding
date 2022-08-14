import React, {Component} from 'react';
import { Card, Button } from 'semantic-ui-react';
import instance from '../ethereum/ideaFactoryInstance';
import Layout from '../components/Layout';
import { Link } from '../routes';

class IdeaIndex extends Component {

    renderIdeas () {
        const items = this.props.ideas.map( address => {    //* passing each address from the ideas array to the map()
            return{                                         //* () will return the array of objects with properties like header etc
                header: address,
                description: (
                    <Link route = { `/ideas/${address}` } >
                        <a> View Ideas </a>
                    </Link>
                ),
                fluid: true,
                color:'green'
            };
        });
        return <Card.Group items={items} />; //* renderIdeas() will here return the Card.Group component having the array of objects (items)
    }

    render() {
        return (
            <Layout>
             <div>
                 <h2>Opened Ideas</h2>
                 <Link route = '/ideas/new' >
                    <a>
                        <Button
                            floated='right'
                            content='Create new Idea'
                            icon='add circle'
                            primary    //* shorthand for primary={true}
                        />
                    </a>
                </Link>
                {this.renderIdeas()}
             </div>
            </Layout>
        )
    };


}

export async function getStaticProps() {
    // Runs only in the server
    const ideas = await instance.methods.getDeployedIdeas().call();
    return{ props:{
                ideas},
            revalidate: 2
         };

    // Runs only in the client
}

export default IdeaIndex;