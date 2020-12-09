import MaterialTable from 'material-table'
import MarkunreadMailboxTwoToneIcon from '@material-ui/icons/MarkunreadMailboxTwoTone';
import MenuOpenTwoToneIcon from '@material-ui/icons/MenuOpenTwoTone';
import RateReviewTwoToneIcon from '@material-ui/icons/RateReviewTwoTone';
import FolderOpenTwoToneIcon from '@material-ui/icons/FolderOpenTwoTone'; import React from 'react';
import OpenInNewTwoToneIcon from '@material-ui/icons/OpenInNewTwoTone';
import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone';

import Article from './Article';
import Comments from './Comments';

const ArticlesTable = (props) => {
    const { handleClick } = props
    return (
        <div className='article_table'>
            <MaterialTable
                title='List of Articles, sort by any column'
                columns={props.columns}
                data={props.data}
                options={{
                    // paging: false,
                    filtering: true,
                    actionsColumnIndex: -1
                }}
                actions={[
                    rowData => ({
                        icon: ThumbUpTwoToneIcon,
                        tooltip: 'Vote for this article!',
                        onClick: (event, rowData) => handleClick(rowData.article_id),
                        disabled: rowData.hasBeenUpvoted === true
                    })
                ]}
                detailPanel={[
                    {
                        icon: MarkunreadMailboxTwoToneIcon,
                        openIcon: MenuOpenTwoToneIcon,
                        tooltip: 'Open Article',
                        render: rowData => {
                            return <Article article_id={rowData.article_id} />
                        }
                    },
                    {
                        icon: RateReviewTwoToneIcon,
                        openIcon: FolderOpenTwoToneIcon,
                        tooltip: 'Open Comments',
                        render: rowData => {
                            return <Comments article_id={rowData.article_id} />
                        }
                    },
                    {
                        icon: OpenInNewTwoToneIcon,
                        openIcon: MenuBookTwoToneIcon,
                        tooltip: 'Open Article & Comments',
                        render: rowData => {
                            return (
                                <div>
                                    <Article article_id={rowData.article_id} />
                                    return <Comments article_id={rowData.article_id} />
                                </div>
                            )
                        }
                    },
                ]}
            />
        </div>
    );
};

export default ArticlesTable;