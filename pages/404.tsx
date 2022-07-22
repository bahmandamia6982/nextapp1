import React from 'react';


type Props = {
  code?: number
}

const Error404  :React.FC<Props> = (props)=> {
  return <div>Page Not Found : 404 - {props.code}</div>;
};

Error404.defaultProps = {
  code: 360
}

export default Error404;
