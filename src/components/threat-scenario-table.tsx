import React from 'react'
import Link from 'next/link'
import { Popconfirm, Table } from 'antd'
import { ThreatScenario } from '../Interfaces/Interfaces'
import { $fetchIndex, $page, $pageSize } from '../store'
import { connect } from 'react-redux'

const handleDelete = (id: number) => alert('not yet implemented')

interface ThreatScenarioTablePropTypes {
    data: ThreatScenario[]
}

interface State {
    data: null | ThreatScenario[],
    count: number
}

const initialState: State = {
    data: null,
    count: 0,
}

const withStore = connect(
    (state) => ({
        data: state.data,
        meta: state.meta,
    }),
    (dispatch) => ({
        dispatch,
    }),
)

const Connector = (C) => withStore(C)

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        render: (value: string, record: ThreatScenario) =>
            <Link href='/threat-scenario/[id]' as={`/threat-scenario/${record.id}`}>
                <a>{record.title}</a>
            </Link>,
    },
    {
        title: 'Description',
        dataIndex: 'description',
    },
    {
        title: 'Related asset',
        dataIndex: 'related_asset',
    },
    {
        title: 'Classification',
        dataIndex: 'classification_name',
    },
    {
        title: 'Impact',
        dataIndex: 'impact',
    },
    {
        title: 'Likelihood',
        dataIndex: 'likelihood',
    },
    {
        title: 'Risk level',
        dataIndex: 'risk_level',
    },
    {
        title: 'Action',
        dataIndex: 'operation',
        render: (text, record) =>
            <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record.key)}>
                <a>Delete</a>
            </Popconfirm>,
    },
]

// @todo convert to functional component
const ThreatScenarioTable = (props) => {

    const f = $fetchIndex()
    props.dispatch($fetchIndex())

    // PAGINATION OPTIONS
    const paginationOptions = {
        showSizeChanger: true,
        showQuickJumper: true,
        onShowSizeChange: (_, pageSize) => {
            props.dispatch($pageSize(pageSize))
            props.dispatch($fetchIndex())
        },
        onChange: (page) => {
            this.props.dispatch($page(page))
            this.props.dispatch($fetchIndex())
        },
        pageSizeOptions: props.meta.pageSizeOptions,
        total: props.meta.total,
        showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
    }
    const pagination = {
        ...paginationOptions,
        total: props.meta.total,
        current: props.meta.page,
        pageSize: props.meta.pageSize,
    }

    return (
        <Table
            size={'middle'}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={props.data}
            columns={columns}
            rowKey='id'
            pagination={pagination}
        />
    )
}

export default Connector(ThreatScenarioTable)