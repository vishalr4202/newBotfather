import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { acgSelector } from '../../store/selector';

const useGetState = () => {
    const acgStateSelector = createStructuredSelector({
        acgSlice: acgSelector()
    });
    const { acgSlice: state } = useSelector(acgStateSelector);
    return state;
};
export default useGetState;
