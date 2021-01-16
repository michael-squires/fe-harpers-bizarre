import React from 'react';
import MaterialTable from 'material-table'
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone';
import ThumbDownTwoToneIcon from '@material-ui/icons/ThumbDownAltTwoTone';

const { useState } = React;

const CommentsTable = (props) => {
    const { columns, submitNewComment, handleClick, handleDelete } = props

    const [data, setData] = useState([
        ...props.data,
    ])

    return (
        <MaterialTable
            title='Comments'
            columns={columns}
            data={data}
            options={{
                headerStyle: { fontWeight: 'bold', borderTop: '#656A90 solid 0.3rem', color: '#656A90' },
                filtering: true,
                paging: true,
                addRowPosition: 'first',
                actionsColumnIndex: -1
            }}
            actions={[
                rowData => ({
                    icon: ThumbUpTwoToneIcon,
                    tooltip: 'upVote this comment!',
                    onClick: (event, rowData) => {
                        const index = rowData.tableData.id;
                        const newData = [...data]
                        newData[index].votes++
                        newData[index].hasHadVote = true
                        setData([...newData])
                        handleClick(rowData.comment_id, index, 1)
                    },
                    disabled: rowData.hasHadVote === true ||
                        rowData.author === 'grumpy19'
                }),
                rowData => ({
                    icon: ThumbDownTwoToneIcon,
                    tooltip: 'downVote this comment!',
                    onClick: (event, rowData) => {
                        const index = rowData.tableData.id;
                        const newData = [...data]
                        newData[index].votes--
                        newData[index].hasHadVote = true
                        setData([...newData])
                        handleClick(rowData.comment_id, index, -1)
                    },
                    disabled: rowData.hasHadVote === true ||
                        rowData.author === 'grumpy19'
                }),
            ]}
            editable={{
                isDeletable: rowData => rowData.author === 'grumpy19',
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        submitNewComment(newData).then(newComment => {
                            setData([newComment, ...data]);
                            resolve();
                        })
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve, reject) => {
                        const dataDelete = [...data];
                        const index = oldData.tableData.id;
                        const deleted = dataDelete.splice(index, 1);
                        setData([...dataDelete]);
                        console.log(deleted)
                        const [{ comment_id }] = deleted
                        handleDelete(comment_id)
                        resolve()
                    }),
            }}
        />
    );
};

export default CommentsTable;
