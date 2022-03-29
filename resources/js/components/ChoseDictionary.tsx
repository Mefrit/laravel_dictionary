import React, { useState, useEffect } from 'react';

const ChoseDictionaryComponent = (props: any) => {

    useEffect(() => {
        // Обновляем название докуммента, используя API браузера
        console.log("mount")
    }, []);
    const renderlistDictionary = (list_dictionary: any) => {
        return list_dictionary.map((elem: any) => {
            return <li>{elem}</li>
        })
    }
    return (
        // justify-content-around
        <div className=" col-5 d-flex ">
            {/* <ul>{renderlistDictionary(props.list_dictionary)}</ul> */}
            <input type="button" value={"Выбрать словарь"} className="btn btn-secondary rounded-1" />

        </div>

    );
};

export default ChoseDictionaryComponent;