import React from 'react';
import MaterialTable from 'material-table'
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone';
import ThumbDownTwoToneIcon from '@material-ui/icons/ThumbDownAltTwoTone';

const { useState } = React;

const CommentsTable = (props) => {
    const { submitNewComment } = props
    const [columns] = useState([
        ...props.columns
    ]);

    const [data, setData] = useState([
        ...props.data,
    ])

    const { handleClick } = props

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
                    onClick: (event, rowData) => handleClick(rowData.comment_id, 1),
                    disabled: rowData.hasHadVote === true
                }),
                rowData => ({
                    icon: ThumbDownTwoToneIcon,
                    tooltip: 'downVote this comment!',
                    onClick: (event, rowData) => {
                        handleClick(rowData.comment_id, -1)
                        setData([rowData, ...data])
                    },
                    disabled: rowData.hasHadVote === true
                }),
            ]}
            editable={{
                isDeletable: rowData => rowData.author === 'grumpy19',
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            submitNewComment(newData)
                            console.log(newData)
                            setData([newData, ...data]);
                            resolve();
                        }, 1000)
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setData([...dataDelete]);
                            resolve()
                        }, 1000)
                    }),
            }}
        />
    );
};

export default CommentsTable;
