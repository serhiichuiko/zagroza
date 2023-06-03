import React, { useState } from 'react';
import axios from 'axios';

import { OPTIONS_TWO } from '../../constants/index'

import Dropdown from '../../ui/Dropdown'
import CustomOptionComponent from '../../components/CustomOptionComponent'
import CustomSelectedOptionComponent from '../../components/CustomSelectedOptionComponent'

const  OurUsers = () =>  {

    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelectOption = (option) => {
    setSelectedOption(option);
    };

    const searchOptions = async (query) => {
        try {
            const response = await axios.get(`https://api.example.com/search`, {
            params: {
                query: query
            }
            });

            const data = response.data;

            return data.options;

        } catch (error) {

            console.error(error);
            throw new Error('Failed to fetch options');
        }
    };

    const renderCustomOption = (option) => {
        return <CustomOptionComponent label={option.label} value={option.value} />;
    };

    return (
        <Dropdown
            options={OPTIONS_TWO}
            onSelect={handleSelectOption}
            selectedOption={selectedOption || 'Select an option'}
            renderOption={renderCustomOption}
            renderSelectedOption={(selectedOption, isOpen) => (
                <CustomSelectedOptionComponent
                  label={selectedOption ? selectedOption.label : 'Select an option'}
                  value={selectedOption ? selectedOption.value : ''}
                  isOpen={isOpen}
                />
            )}
        />
    );
}

export default OurUsers;
