import React, { Component } from 'react';
import { upVoteArticle } from '../api'

class UpVote extends Component {

    state = { hasVoted: false }

    handleClick = () => {
        const { article_id } = this.props
        upVoteArticle(article_id)
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default UpVote;