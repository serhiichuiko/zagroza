import React, { useState } from 'react';

import { OPTIONS } from '../../constants/index'

import Dropdown from '../../ui/Dropdown'

const  OurProducts = () =>  {

    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    return (
        <Dropdown options={OPTIONS} onSelect={handleSelectOption} selectedOption={selectedOption} />
    );
}

export default OurProducts;
