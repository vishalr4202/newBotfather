import React, { useState } from 'react';
// material
import { visuallyHidden } from '@mui/utils';
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './index.scss';
import UpArrowIcon from '../../../../assets/upArrow.svg';
import DownArrowIcon from '../../../../assets/downArrow.svg';

interface Props {
    orderBy: any;
    order: any;
    onRequestSort: any;
    onSelectAllClick: any;
    rowCount: number;
    headLabel: any;
    numSelected: any;
    selectable: boolean;
    isSelectAll?: boolean;
}

const UserListHead = (props: Props) => {
    const {
        order,
        orderBy,
        rowCount,
        headLabel,
        numSelected,
        onRequestSort,
        onSelectAllClick,
        selectable,
        isSelectAll = true
    } = props;
    const [selectedColumn, setSelectedColumn] = useState<string>('');
    // const upSort = (val: any) => {
    //     alert(val + ' up');
    // };
    // const downSort = (val: any) => {
    //     alert(val + ' down');
    // };
    // const createSortHandler = (property: any) => (event: any) => {
    //     onRequestSort(event, property);
    // };
    const Icon = (val: any) => {
        return (
            <span
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'Center',
                    alignItems: 'Center',
                    marginLeft: '5px'
                }}
            >
                {' '}
                {/* <img
                    src={DownArrowIcon}
                    style={{ fontSize: '15px', marginBottom: '-4px', fontWeight: '900' }}
                    onClick={() => onRequestSort(val, 'up')}
                /> */}
                <KeyboardArrowUpIcon onClick={() => onRequestSort(val, 'up')} style={{ fontSize: '15px', marginBottom: '0px', fontWeight: '900' }}/>
                <KeyboardArrowDownIcon onClick={() => onRequestSort(val, 'down')} style={{ fontSize: '15px', marginTop: '-7px', fontWeight: '900' }}/>
                {/* <img
                    src={UpArrowIcon}
                    style={{ fontSize: '15px', marginTop: '-7px', fontWeight: '900' }}
                    onClick={() => onRequestSort(val, 'down')}
                /> */}
            </span>
        );
    };

    return (
        <TableHead className="tableColumn">
            <TableRow>
                {selectable ? (
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            disabled={!isSelectAll}
                        />
                    </TableCell>
                ) : // (
                //     <TableCell padding="checkbox"></TableCell>
                // )
                null}
                {headLabel.map((headCell: any, idx: number) => {
                    const cellKey = idx + 1;
                    return (
                        <TableCell
                            key={cellKey}
                            align={headCell.alignRight ? 'right' : 'left'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            {headCell.id === 'Action' ? (
                                headCell.label
                            ) : (
                                <TableSortLabel
                                    // hideSortIcon={headCell.id == 'Action' ? false : true}
                                    hideSortIcon={false}
                                    IconComponent={() => Icon(headCell.id)}
                                    active={orderBy === headCell.id}
                                    // active={true}
                                    // direction={orderBy === headCell.id ? order : 'asc'}
                                    // onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                    {/* {orderBy === headCell.id ? (
                                    <Box sx={{ ...visuallyHidden }}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null} */}
                                </TableSortLabel>
                            )}
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
};

export default UserListHead;
