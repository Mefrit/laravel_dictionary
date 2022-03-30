import React, { useState, useEffect } from 'react';

const ChoseDictionaryComponent = (props: any) => {
    console.log("mount22222", props)
    useEffect(() => {
        // Обновляем название докуммента, используя API браузера
        console.log("mount", props)
    }, []);
    const renderlistDictionary = (list_dictionary: any) => {
        return list_dictionary.map((elem: any) => {
            return <li key={"dict_" + elem.id} onClick={() => { props.choseDictionary(elem.id) }
            }>{<input type="button" key={"dict_INp_" + elem.id} value={elem.name} className="btn btn-secondary rounded-1" />}</li>
        })
    }
    return (
        // justify-content-around
        <div className=" col-5 d-flex ">
            <ul>{renderlistDictionary(props.list_dictionary)}</ul>
        </div>

    );
};

export default ChoseDictionaryComponent;