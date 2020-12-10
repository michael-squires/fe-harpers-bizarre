import MaterialTable from 'material-table'
import MenuOpenTwoToneIcon from '@material-ui/icons/MenuOpenTwoTone';
import RateReviewTwoToneIcon from '@material-ui/icons/RateReviewTwoTone';
import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone';
import ThumbDownTwoToneIcon from '@material-ui/icons/ThumbDownAltTwoTone';

import Article from './Article';
import Comments from './Comments';

const ArticlesTable = (props) => {
    const { handleClick } = props
    return (
        <div className='article_table'>
            <MaterialTable
                title='sort by any column ↕'
                columns={props.columns}
                data={props.data}
                options={{
                    headerStyle: { fontWeight: "bold", fontSize: 'larger' },
                    filtering: true,
                    actionsColumnIndex: -1
                }}
                actions={[
                    rowData => ({
                        icon: ThumbUpTwoToneIcon,
                        tooltip: 'upVote this article!',
                        onClick: (event, rowData) => handleClick(rowData.article_id, 1),
                        disabled: rowData.hasHadVote === true
                    }),
                    rowData => ({
                        icon: ThumbDownTwoToneIcon,
                        tooltip: 'downVote this article!',
                        onClick: (event, rowData) => handleClick(rowData.article_id, -1),
                        disabled: rowData.hasHadVote === true
                    }),
                ]}
                detailPanel={[
                    {
                        icon: MenuBookTwoToneIcon,
                        openIcon: MenuOpenTwoToneIcon,
                        tooltip: 'Read Article',
                        render: rowData => {
                            return <Article article_id={rowData.article_id} />
                        }
                    },
                    {
                        icon: RateReviewTwoToneIcon,
                        openIcon: MenuOpenTwoToneIcon,
                        tooltip: 'Open Comments',
                        render: rowData => {
                            return <Comments article_id={rowData.article_id} />
                        }
                    },
                    {
                        tooltip: 'Open Article & Comments',
                        render: rowData => {
                            return (
                                <div>
                                    <Article article_id={rowData.article_id} />
                                    <Comments article_id={rowData.article_id} />
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