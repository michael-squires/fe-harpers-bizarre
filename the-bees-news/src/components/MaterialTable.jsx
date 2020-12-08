import MaterialTable from 'material-table'
import MarkunreadMailboxTwoToneIcon from '@material-ui/icons/MarkunreadMailboxTwoTone';
import MenuOpenTwoToneIcon from '@material-ui/icons/MenuOpenTwoTone';
import RateReviewTwoToneIcon from '@material-ui/icons/RateReviewTwoTone';
import FolderOpenTwoToneIcon from '@material-ui/icons/FolderOpenTwoTone'; import React from 'react';
import OpenInNewTwoToneIcon from '@material-ui/icons/OpenInNewTwoTone';
import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';

import Article from './Article';

const ArticlesTable = (props) => {
    return (
        <div className='article_table'>
            <MaterialTable color='primary'
                title='Select any article to view'
                columns={props.columns}
                data={props.data}
                options={{
                    paging: false,
                    filtering: false,
                }}
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
                            return <h1>{rowData.article_id} COMMENTS HERE!</h1>
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
                                    <h1>{rowData.article_id} COMMENTS HERE!</h1>)
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