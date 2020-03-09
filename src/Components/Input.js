import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.input`
  border: 0;
  border-radius: 4px;
  border: 1px solid #e6e6e6;
  background-color: ${props => props.theme.bgColor};
  height: 43px;
  font-size: 14px;
  padding: 0px 10px;
`;

const Input = ({ placeholder, required = true, value, onChange, type }) => (
  <Container
    placeholder={placeholder}
    required={required}
    value={value}
    onChange={onChange}
    type={type}
  />
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string
};

export default Input;
