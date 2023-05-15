---
to: <%= absPath %>/<%= component_name %>.jsx
---
import style from './<%= component_name %>.module.css';
import PropTypes from 'prop-types';

export const <%= component_name %> = () => {
  console.log(style);
  return (
    <div></div>
  );
};
