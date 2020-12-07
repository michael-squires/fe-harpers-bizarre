import React, { Component } from 'react';
import { getTopics } from '../api';
import { Link } from '@reach/router';

class Nav extends Component {

    state = {
        topics: [],
    }
    componentDidMount() {
        getTopics().then(topics => {
            this.setState({ topics })
        })
    }

    render() {
        const { topics } = this.state;
        return (
            <nav>
                {topics.map(topic => (
                    <Link
                        className='nav-links'
                        key={topic.slug}
                        to={`/topics/${topic.slug}`}>
                        {topic.slug}
                    </Link>
                ))}
            </nav>
        );
    }
}

export default Nav;