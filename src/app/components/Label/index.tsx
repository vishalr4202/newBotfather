import './index.scss';

type ComponentProps = {
    label: string;
    className?: string;
};

const Label = (props: ComponentProps) => {
    const { label, className } = props;

    return (
        <div>
            <label className={`${className ? className : ''} label-style`}>{label}</label>
        </div>
    );
};

export default Label;
