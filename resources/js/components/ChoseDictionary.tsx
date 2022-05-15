import React, { useState, useEffect } from 'react';
const ChoseDictionaryComponent = (props: any) => {
    const [chosen_id_dictionary, setChosenId] = useState(props.chosen_id_dictionary)
    const renderlistDictionary = (list_dictionary: any) => {
        return list_dictionary.map((elem: any) => {
            return <li key={"dict_" + elem.id} className={chosen_id_dictionary == elem.id ? "list-group-item list-group-item-action cutsor-pointer active rounded-1" : "list-group-item list-group-item-action cutsor-pointer"} onClick={() => { setChosenId(elem.id); props.choseDictionary(elem.id) }}>
                <a href="#" className={chosen_id_dictionary == elem.id ? "link-light rounded-1" : "link-dark"} key={"dict_INp_" + elem.id} >{elem.name} </a>
            </li>
        })
    }
    return (
        <div className=" col-3 d-flex ">
            <ul className='d-flex flex-column list-group h-75 overflow-auto'>
                <a href="#" className="list-group-item list-group-item-action disabled">Словари</a>
                {renderlistDictionary(props.list_dictionary)}
            </ul>
        </div>
    );
};

export default ChoseDictionaryComponent;