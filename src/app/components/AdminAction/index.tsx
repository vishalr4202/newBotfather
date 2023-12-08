import { Card } from '@mui/material';
type Props = { title: string,click?:any };
const AdminAction = (props: Props) => {
    const { title,click } = props;
    return (
        <Card
            style={{
                // border: '1px solid #2B2D42',
                borderRadius: '6px',
                // backgroundColor: '#1D1E2C',
                backgroundColor:'rgba(78, 181, 141, 0.67)',
                padding: '10px',
                // boxShadow: 'none',
                margin: '10px',
                cursor:'pointer'
            }}
        onClick={click}
        >
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div style={{ flex: '30%' }}>
                    <p
                        style={{
                            fontSize: '13px',
                            // color: '#9CC2FF',
                            color:'white',
                            marginBottom: '0px',
                            fontFamily: 'Montserrat',
                            fontWeight: '600',
                        }}
                    >
                        {title}
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default AdminAction;
