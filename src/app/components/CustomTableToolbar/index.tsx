import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
import closeFill from '@iconify/icons-eva/close-fill';
// import filterIcon from '../../../assets/images/filterIcon.svg';
import filterIcon from '../../../assets/images/filter.svg';
// material
import { styled } from '@mui/material/styles';
import {
    Box,
    Toolbar,
    Tooltip,
    IconButton,
    Typography,
    FilledInput,
    InputAdornment,
    TextField,
    Button
} from '@mui/material';
import './Toolbar.scss';
//import AddIcon from '@mui/icons-material/Add';
// import AddIcon from '../../../assets/images/AddIcon.svg';
// import CustomRadioGroup from '../CustomRadioGroup';
// import DropDown from '../Dropdown';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between'
    // padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(FilledInput)(({ theme }) => ({
    width: 300,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter
    }),
    borderRadius: 50,
    height: 40,
    // position: 'absolute',
    // right: '1vw',
    // '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
    '& fieldset': {
        borderWidth: '1px !important'
        // borderColor: `${theme.palette.grey[500_32]} !important`
    },
    [theme.breakpoints.down('xs')]: {
        right: '18vw',
        width: '250px'
    },
    [theme.breakpoints.down('sm')]: {
        right: '18vw',
        width: '250px'
    },
    [theme.breakpoints.up('md')]: {
        right: '13vw '
    },
    [theme.breakpoints.up('lg')]: {
        right: '0vw'
    }
}));

interface Props {
    numSelected: number;
    filterName: any;
    onFilterName: any;
    drawerOpen?: any;
    displayInput: boolean;
    text: any;
    customButton?: boolean;
    ButtonText?: any;
    filterButton?: boolean;
    resetInput?: any;
    approveButton?: boolean;
    isApproved?: boolean;
    assignmentDrawer?: any;
    radios?: boolean;
    onRadioChange?: any;
    radioValue?: any;
    radioFields?: any;
    dropdown?: boolean;
    dropdownItems?: any;
    dropdownValue?: any;
    onDropdownChange?: Function;
    countNoShow?: boolean;
    clip?: boolean;
    smallSearch?: boolean;
}

const UserListToolbar = (props: Props) => {
    const {
        numSelected,
        filterName,
        onFilterName,
        drawerOpen,
        displayInput,
        text,
        customButton,
        ButtonText,
        filterButton,
        resetInput,
        approveButton,
        isApproved,
        assignmentDrawer,
        radios,
        radioValue,
        onRadioChange,
        radioFields,
        dropdown = false,
        dropdownItems,
        dropdownValue,
        onDropdownChange = () => {},
        countNoShow,
        clip,
        smallSearch
    } = props;
    const deleteAllRows = () => {
        alert('deleted ' + numSelected + ' rows');
    };

    const handleModal = () => {
        alert('modal open');
    };

    return (
        <RootStyle
            sx={{
                ...(numSelected > 0 && {
                    color: 'primary.main',
                    bgcolor: 'primary.lighter'
                })
            }}
            className="tableToolbar"
        >
            {text ? (
                <div
                    className={
                        displayInput
                            ? 'typeAndCount'
                            : !displayInput && filterButton
                            ? 'typeAndCount'
                            : 'typeAndCount countOnly'
                    }
                    style={{ marginRight: displayInput ? '30px' : 'unset' }}
                >
                    <h6 style={{ marginBottom: '0px' }}>{text.title}</h6>
                    <p style={{ marginBottom: '0px', fontSize: '12px' }}>{text.subTitle}</p>
                </div>
            ) : null}

            {radios ? (
                <div style={{ marginRight: '10px' }} className="toolbarRadio">
                    {/* <CustomRadioGroup value={radioValue} fields={radioFields} onChange={onRadioChange} /> */}
                </div>
            ) : null}
            {/* {numSelected > 0 ? (
                <Typography component="div" variant="subtitle1" style={{ marginLeft: '3px' }}>
                    {numSelected} selected
                </Typography>
            ) : null} */}
            {dropdown ? (
                <div style={{ marginRight: '50px' }} className="toolbardropdown">
                    {/* <DropDown
                        onChange={(event) => onDropdownChange(event.target.value)}
                        // className="inputDiv"
                        name="dropdownTimePeriod"
                        items={dropdownItems}
                        placeHolder="Select time period"
                        value={dropdownValue}
                    /> */}
                </div>
            ) : null}
            {displayInput ? (
                <SearchStyle
                    // className="searchBox"
                    className={
                        customButton && !filterButton
                            ? 'searchBox' + ' buttonSearchBox'
                            : customButton && filterButton
                            ? 'searchBox' + ' bothButtons'
                            : radios
                            ? 'searchBox radioSearch'
                            : clip
                            ? 'searchBox clip'
                            : smallSearch
                            ? 'searchBox smallSearch'
                            : 'searchBox'
                    }
                    value={filterName}
                    onChange={onFilterName}
                    placeholder="Search"
                    startAdornment={
                        <div>
                            <InputAdornment position="start" variant="outlined" className="searchBoxIcon">
                                <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
                            </InputAdornment>
                            {filterName?.length > 0 ? (
                                <InputAdornment position="end" className="searchBoxIconCancel" onClick={resetInput}>
                                    <Box component={Icon} icon={closeFill} sx={{ color: 'text.disabled' }} />
                                </InputAdornment>
                            ) : null}
                        </div>
                    }
                />
            ) : null}
            {numSelected > 0 && !countNoShow && (
                <Typography component="div" variant="subtitle1" style={{ fontSize: '15px', marginLeft: '5px' }}>
                    {numSelected} Selected
                </Typography>
            )}
            {displayInput ? (
                <div>
                    {customButton && !filterButton && !approveButton ? (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                size="small"
                                className="addButton"
                                style={{
                                    background: 'linear-gradient(270deg, #0f249d 0%, #0f1785 100%)',
                                    borderRadius: '20px'
                                }}
                                onClick={assignmentDrawer}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <div>
                                        {/* <img className="addIcon" src={AddIcon} alt="addIcon" /> */}
                                    </div>
                                    <span>{ButtonText}</span>
                                </div>
                            </Button>
                        </div>
                    ) : !customButton && filterButton && !approveButton ? (
                        <div className="filter" onClick={drawerOpen} style={{ display: 'flex', marginLeft: '10px' }}>
                            {/* <img src={filterIcon} /> */}
                            <span>Filter</span>
                        </div>
                    ) : customButton && filterButton && !approveButton ? (
                        <div className="filterButtonAndAddMembers">
                            <div className="filter" onClick={drawerOpen}>
                                {/* <img src={filterIcon} /> */}
                                <span>Filter</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    className="addButton"
                                    style={{
                                        background: 'linear-gradient(270deg, #0f249d 0%, #0f1785 100%)',
                                        borderRadius: '20px'
                                    }}
                                    onClick={assignmentDrawer}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <div>
                                            {/* <img className="addIcon" src={AddIcon} alt="addIcon" /> */}
                                        </div>
                                        <span>{ButtonText}</span>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    ) : !customButton && filterButton && approveButton ? (
                        <div className="filterButtonAndAddMembers reverseRow">
                            <div className="filter" onClick={drawerOpen}>
                                {/* <img src={filterIcon} /> */}
                                <span>Filter</span>
                            </div>
                            {!isApproved ? (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        className={numSelected > 0 ? 'addButton' : 'addButton noShadow'}
                                        style={
                                            numSelected > 0
                                                ? {
                                                      background: 'linear-gradient(270deg, #0f249d 0%, #0f1785 100%)',
                                                      borderRadius: '20px',
                                                      transition: 'all 0.3s linear'
                                                  }
                                                : {
                                                      background: '#B1CCDA',
                                                      borderRadius: '20px',
                                                      color: 'white',
                                                      transition: 'background 0.1s linear'
                                                  }
                                        }
                                        onClick={assignmentDrawer}
                                        disabled={numSelected > 0 ? false : true}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-around'
                                            }}
                                        >
                                            {/* <div>
                                            <img className="addIcon" src={AddIcon} alt="addIcon" />
                                        </div> */}
                                            <span style={{ marginRight: '10px', marginLeft: '10px' }}>
                                                {ButtonText}
                                            </span>
                                        </div>
                                    </Button>
                                </div>
                            ) : null}
                        </div>
                    ) : // (
                    //   <div
                    //     className="filter"
                    //     onClick={drawerOpen}
                    //     style={{ display: "flex" }}
                    //   >
                    //     <img src={filterIcon} />
                    //     <span>Filter</span>
                    //   </div>
                    // )
                    null}
                </div>
            ) : (
                filterButton && (
                    <div className="filter" onClick={drawerOpen} style={{ display: 'flex' }}>
                        {/* <img src={filterIcon} /> */}
                        <span>Filter</span>
                    </div>
                )
            )}
        </RootStyle>
    );
};

export default UserListToolbar;
