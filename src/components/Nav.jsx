import React, { Component } from 'react';
import { getTopics } from '../api';
import { Link } from '@reach/router';
import Button from '@material-ui/core/Button';
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
                <Link
                    className='nav-links'
                    to={'/'}>
                    <Button variant="contained" color='primary'>
                        <p>All topics</p>
                    </Button>
                </Link>
                {topics.map(topic => (
                    <Link
                        className='nav-links'
                        key={topic.slug}
                        to={`/topics/${topic.slug}`}>
                        <Button variant="contained" color='primary'>
                            <p>{topic.slug}</p>
                        </Button>
                    </Link>
                ))}
            </nav>
        );
    }
}

export default Nav;

// <Link to="/dashboard">
//      <Button style={myStyle}>
//         <p>Click Me!</p>
//      </Button>
//  </Link>