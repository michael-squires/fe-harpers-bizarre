import MaterialTable from 'material-table'
import React from 'react';
import Article from './Article';

const ArticlesTable = (props) => {
    return (
        <div className='article_table'>
            <MaterialTable
                title='Select any article to view'
                columns={props.columns}
                data={props.data}
                options={{
                    paging: false,
                    filtering: true,
                }}
                detailPanel={[
                    {
                        icon: 'menu',
                        openIcon: 'menu',
                        tooltip: 'Show Article',
                        render: rowData => {
                            return <Article article_id={rowData.article_id} />
                        }
                    }
                ]}
                onRowClick={(event, rowData, togglePanel) => togglePanel()}
            />
            />
        </div>
    );
};

export default ArticlesTable;