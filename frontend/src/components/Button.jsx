import React from "react";

// ...rest je isto sto i ...props
// ...props oznacava da uzimamo sve atribute koje nam parent prosledjuje preko komponente
const Button = ({ buttonText, ...rest }) => {
  return (
    <button data-mdb-ripple="true" data-mdb-ripple-color="light" {...rest}>
      {buttonText}
    </button>
  );
};

export default Button;
