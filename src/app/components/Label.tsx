import { alpha, styled } from '@mui/material/styles';

type LabelType = {
    children?: any;
    color:
        | 'default'
        | 'primary'
        | 'synced'
        | 'info'
        | 'success'
        | 'warning'
        | 'error'
        | 'rejected'
        | 'critical'
        | 'major'
        | 'minor'
        | 'maintenance'
        | 'general'
        | 'failure';
    variant: 'filled' | 'outlined' | 'ghost';
};

type RootStyleType = {
    ownerState: {
        color: LabelType['color'];
        variant: LabelType['variant'];
    };
};

const RootStyle = styled('span')((props: RootStyleType) => {
    const { color, variant } = props.ownerState;

    const styleGhost = (colorVal: string) => {
        if (colorVal === 'error') {
            return {
                color: '#d32f2f',
                backgroundColor: alpha('#f44336', 0.16)
            };
        } else if (colorVal === 'critical') {
            return {
                border: '1px solid #FD8440',
                color: 'rgba(253, 132, 64, 0.8)',
                backgroundColor: 'rgba(253, 132, 64, 0.08)'
            };
        } else if (colorVal === 'major') {
            return {
                border: '1px solid #F6C66A',
                color: ' rgba(246, 198, 106, 0.8)',
                backgroundColor: ' rgba(246, 198, 106, 0.08)'
            };
        } else if (colorVal === 'minor') {
            return {
                border: '1px solid #98A2FF',
                color: 'rgba(152, 162, 255, 0.8)',
                backgroundColor: 'rgba(152, 162, 255, 0.08)'
            };
        } else if (colorVal === 'failure') {
            return {
                border: '1px solid #FB5862',
                color: 'rgba(251, 88, 98, 0.8)',
                backgroundColor: 'rgba(251, 88, 98, 0.08)'
            };
        } else if (colorVal === 'maintenance') {
            return {
                border: '1px solid #44D6F6',
                color: 'rgba(68, 214, 246, 0.8)',
                backgroundColor: 'rgba(68, 214, 246, 0.08)'
            };
        } else if (colorVal === 'general') {
            return {
                border: '1px solid #32D074',
                color: 'rgba(50, 208, 116, 0.8)',
                backgroundColor: 'rgba(50, 208, 116, 0.08)'
            };
        } else if (colorVal === 'success') {
            return {
                color: '#388e3c',
                backgroundColor: alpha('#4caf50', 0.16)
            };
        } else if (colorVal === 'warning') {
            //for Approval pending status in requests
            return {
                color: '#EB7725',
                backgroundColor: '#FFE9DA'
            };
        } else if (colorVal === 'synced') {
            return {
                color: '#00B5D0',
                backgroundColor: '#C1F7FF'
            };
        } else if (colorVal === 'rejected') {
            return {
                color: '#D0021B',
                backgroundColor: '#FFE6E9'
            };
        }
    };

    const styleVariant = (colorVal: string) => {
        if (colorVal === 'error') {
            return {
                color: '#d32f2f',
                backgroundColor: alpha('#f44336', 0.16)
            };
        } else if (colorVal === 'critical') {
            return {
                border: '1px solid #FD8440',
                color: 'rgba(253, 132, 64, 0.8)',
                backgroundColor: 'rgba(253, 132, 64, 0.08)'
            };
        } else if (colorVal === 'major') {
            return {
                border: '1px solid #F6C66A',
                color: ' rgba(246, 198, 106, 0.8)',
                backgroundColor: ' rgba(246, 198, 106, 0.08)'
            };
        } else if (colorVal === 'minor') {
            return {
                border: '1px solid #98A2FF',
                color: 'rgba(152, 162, 255, 0.8)',
                backgroundColor: 'rgba(152, 162, 255, 0.08)'
            };
        } else if (colorVal === 'failure') {
            return {
                border: '1px solid #FB5862',
                color: 'rgba(251, 88, 98, 0.8)',
                backgroundColor: 'rgba(251, 88, 98, 0.08)'
            };
        } else if (colorVal === 'maintenance') {
            return {
                border: '1px solid #44D6F6',
                color: 'rgba(68, 214, 246, 0.8)',
                backgroundColor: 'rgba(68, 214, 246, 0.08)'
            };
        } else if (colorVal === 'general') {
            return {
                border: '1px solid #32D074',
                color: 'rgba(50, 208, 116, 0.8)',
                backgroundColor: 'rgba(50, 208, 116, 0.08)'
            };
        } else if (colorVal === 'success') {
            return {
                color: '#388e3c',
                backgroundColor: 'rgba(69 116 71 / 16%)',
                border: '1px solid #388e3c'
            };
        } else if (colorVal === 'warning') {
            //for Approval pending status in requests
            return {
                color: '#EB7725',
                backgroundColor: '#FFE9DA'
            };
        } else if (colorVal === 'synced') {
            return {
                color: '#00B5D0',
                backgroundColor: '#C1F7FF'
            };
        } else if (colorVal === 'rejected') {
            return {
                color: '#D0021B',
                border: '1px solid #D0021B',
                // backgroundColor: '#FFE6E9'
                backgroundColor: 'rgba(208 2 27 / 16%)'
            };
        }
    };

    return {
        height: 22,
        minWidth: 22,
        lineHeight: 0,
        borderRadius: 8,
        cursor: 'default',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        justifyContent: 'center',
        padding: '0px 8px',
        color: '#424242',
        fontSize: '0.75rem',
        fontFamily: 'Montserrat',
        backgroundColor: '#e0e0e0',
        fontWeight: 700,

        ...(color !== 'default' && variant === 'ghost'
            ? {
                  ...(variant === 'ghost' && { ...styleGhost(color) })
              }
            : color !== 'default' && variant === 'outlined'
            ? {
                  ...(variant === 'outlined' && { ...styleVariant(color) })
              }
            : null)
        //   ...(variant === 'ghost' && {
        //       color: 'rgba(0, 0, 0, 0.54)',
        //       backgroundColor: '#9e9e9e'
        //   })
        //   })
    };
});

export default function Label(props: LabelType) {
    const { color, variant, children, ...other } = props;
    return (
        <RootStyle ownerState={{ color, variant }} {...other}>
            {children}
        </RootStyle>
    );
}
