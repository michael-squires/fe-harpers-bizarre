import MaterialTable from 'material-table'

import React from 'react';

const CommentsTable = (props) => {
    const { handleClick } = props
    return (
        <div>
            <MaterialTable
                title='Comments'
                columns={props.columns}
                data={props.data}
                options={{
                    headerStyle: { backgroundColor: '#656A90', color: 'white' },
                    filtering: true
                }}
            />
        </div>
    );
};

export default CommentsTable;