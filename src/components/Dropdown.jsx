import React, { useState } from "react";

import styles from "../styles/Dropdown.module.css";

const Dropdown = ({ options, onOpen, newField, IconElement }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.dropdownContainer}>
      <span
        className={styles.dropdownButton}
        onClick={() => {
          setIsOpen(!isOpen);
          onOpen();
        }}
      >
        {React.cloneElement(IconElement)}
      </span>
      {isOpen && (
        <div className={styles.popover}>
          <ul className={styles.dropdownOptions}>
            {options?.map((option) => (
              <li
                key={option.id}
                className={
                  !option[newField]
                    ? styles.dropdownOptionNew
                    : styles.dropdownOption
                }
              >
                {option.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
