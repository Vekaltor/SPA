import { PropsWrapper } from "../types/types";

const Wrapper = (props: PropsWrapper) => {
  const { className, children } = props;
  return <div className={className}>{children}</div>;
};

export default Wrapper;
